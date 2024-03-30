package com.example.applicationtrackerserver.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.example.applicationtrackerserver.models.Application;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import java.net.URI;

@Component
public class GeminiClient {
    private static final Logger logger = LoggerFactory.getLogger(GeminiClient.class);

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    private String geminiApiKey;

    public GeminiClient() {
        try {
            Dotenv dotenv = Dotenv.load();
            geminiApiKey = dotenv.get("GEMINI_API_KEY");
        } catch (Exception e) {
            logger.info("Failed to load environment variables: " + e.getMessage());
            geminiApiKey = System.getenv("GEMINI_API_KEY");
        }
    }

    public String reviewResume(String resume, String jobDescription)
            throws Exception, HttpClientErrorException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = """
                    Instruction:\n
                    Imagine you are a career guidance coach.\n
                    Review your client's resume and give specific feedbacks for improvement in
                    bullet points based on the job description for the job application.\n
                    Finally, rate the resume out of 100.\n

                    Constraint:\n
                    Use -- for the bullet point and avoid markdown headings.\n
                    Do not include any feedback related to the fonts and formatting of the resume.\n
                    Do not use markdown in the output.\n
                    Output the rating with format of 'Rating=?/100'\n

                    Context:\n
                    Job Description:\n
                    %s\n
                    Resume:\n
                    %s\n

                    Example output:\n
                    ```
                    -- Improve your active voice\n
                    -- Use action words\s
                    -- Rating=40/100\n
                    ```
                        """;

            String finalPrompt = String.format(prompt, jobDescription, resume);
            logger.debug(finalPrompt);

            // Create request body
            String requestBody = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", finalPrompt);

            // Create request entity
            RequestEntity<String> requestEntity = new RequestEntity<>(requestBody, headers, HttpMethod.POST,
                    new URI(GEMINI_API_URL + geminiApiKey));

            // Make POST request
            logger.info("Making request to Gemini...");
            ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);

            // Handle response
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new HttpClientErrorException(response.getStatusCode(), response.getBody());
            }

            logger.info("Got response from Gemini!");
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidates = jsonObject.getJSONArray("candidates");

            String result = "";
            for (int i = 0; i < candidates.length();) {
                JSONObject candidate = candidates.getJSONObject(i);
                JSONObject content = candidate.getJSONObject("content");
                JSONArray parts = content.getJSONArray("parts");

                for (int j = 0; j < parts.length();) {
                    JSONObject part = parts.getJSONObject(j);
                    result = part.getString("text");
                    logger.info(result);
                    return result;
                }
                break;
            }
            throw new Exception("No results from Gemini");
        } catch (HttpClientErrorException e) {
            logger.info("Error making request: " + e.getStatusCode() + " - " + e.getMessage());
            throw new HttpClientErrorException(e.getStatusCode(), e.getMessage());
        } catch (Exception e) {
            logger.info("Failed to tailor resume: " + e.getMessage());
            throw new Exception("Failed to tailor resume: " + e.getMessage());
        }
    }

    public String reviewResume(String resume, Application jobApplication)
            throws Exception, HttpClientErrorException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = """
                        Instruction:\n
                        Imagine you are a career guidance coach.\n
                        Your client is applying for a job as a %s at %s.\n
                        Review your client's resume and give specific feedbacks for improvement in
                        bullet points based on the job description for the job application.\n
                        Finally, rate the resume out of 100.\n

                        Constraint:\n
                        Use -- for the bullet point and avoid markdown headings.\n
                        Do not include any feedback related to the fonts and formatting of the resume.\n
                        Do not use markdown in the output.\n
                        Output the rating with format of 'Rating=?/100'\n

                        Context:\n
                        Job Description:\n
                        %s\n
                        Resume:\n
                        %s\n

                        Example output:\n
                        ```
                        -- Improve your active voice\n
                        -- Use action words\s
                        -- Rating=40/100\n
                        ```
                    """;

            String finalPrompt = String.format(prompt, jobApplication.getJobTitle(), jobApplication.getCompanyName(),
                    jobApplication.getJobDescription(), resume);
            logger.debug(finalPrompt);

            // Create request body
            String requestBody = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", finalPrompt);

            // Create request entity
            RequestEntity<String> requestEntity = new RequestEntity<>(requestBody, headers, HttpMethod.POST,
                    new URI(GEMINI_API_URL + geminiApiKey));

            // Make POST request
            logger.info("Making request to Gemini...");
            ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);

            // Handle response
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new HttpClientErrorException(response.getStatusCode(), response.getBody());
            }

            logger.info("Got response from Gemini!");
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidates = jsonObject.getJSONArray("candidates");

            String result = "";
            for (int i = 0; i < candidates.length();) {
                JSONObject candidate = candidates.getJSONObject(i);
                JSONObject content = candidate.getJSONObject("content");
                JSONArray parts = content.getJSONArray("parts");

                for (int j = 0; j < parts.length();) {
                    JSONObject part = parts.getJSONObject(j);
                    result = part.getString("text");
                    logger.info(result);
                    return result;
                }
                break;
            }
            throw new Exception("No results from Gemini");
        } catch (HttpClientErrorException e) {
            logger.info("Error making request: " + e.getStatusCode() + " - " + e.getMessage());
            throw new HttpClientErrorException(e.getStatusCode(), e.getMessage());
        } catch (Exception e) {
            logger.info("Failed to tailor resume: " + e.getMessage());
            throw new Exception("Failed to tailor resume: " + e.getMessage());
        }
    }

    public String generateCoverLetter(Application jobApplication) throws Exception, HttpClientErrorException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = """
                        ### Instruction ###\n
                        Imagine you are a career guidance coach.\n
                        Your client is applying for a job as a %s at %s.\n
                        Help your client to craft a concise cover letter in 3-4 sentences based on the job description for the job application.\n

                        ### Context ###\n
                        Job Description:\n
                        %s\n

                        ### Output Format ###\n
                        Dear Hiring Manager,\n
                        ... (Your cover letter here)\n
                    """;

            String finalPrompt = String.format(prompt, jobApplication.getJobTitle(), jobApplication.getCompanyName(),
                    jobApplication.getJobDescription());
            logger.debug(finalPrompt);

            // Create request body
            String requestBody = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", finalPrompt);

            // Create request entity
            RequestEntity<String> requestEntity = new RequestEntity<>(requestBody, headers, HttpMethod.POST,
                    new URI(GEMINI_API_URL + geminiApiKey));

            // Make POST request
            logger.info("Making request to Gemini...");
            ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);

            // Handle response
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new HttpClientErrorException(response.getStatusCode(), response.getBody());
            }

            logger.info("Got response from Gemini!");
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidates = jsonObject.getJSONArray("candidates");

            String result = "";
            for (int i = 0; i < candidates.length();) {
                JSONObject candidate = candidates.getJSONObject(i);
                JSONObject content = candidate.getJSONObject("content");
                JSONArray parts = content.getJSONArray("parts");
                for (int j = 0; j < parts.length();) {
                    JSONObject part = parts.getJSONObject(j);
                    result = part.getString("text");
                    logger.debug(result);
                    return result;
                }
            }
            throw new Exception("No results from Gemini");
        } catch (HttpClientErrorException e) {
            logger.info("Error making request: " + e.getStatusCode() + " - " + e.getMessage());
            throw new HttpClientErrorException(e.getStatusCode(), e.getMessage());
        } catch (Exception e) {
            logger.info("Failed to generate cover letter: " + e.getMessage());
            throw new Exception("Failed to generate cover letter: " + e.getMessage());
        }
    }
}