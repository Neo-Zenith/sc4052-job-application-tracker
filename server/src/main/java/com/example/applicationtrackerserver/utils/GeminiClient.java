package com.example.applicationtrackerserver.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import java.net.URI;
import java.net.URISyntaxException;

@Component
public class GeminiClient {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    private String geminiApiKey;

    public GeminiClient() {
        try {
            Dotenv dotenv = Dotenv.load();
            geminiApiKey = dotenv.get("GEMINI_API_KEY");
        } catch (Exception e) {
            System.out.println("Failed to load environment variables: " + e.getMessage());
            geminiApiKey = System.getenv("GEMINI_API_KEY");
        }
    }

    public String tailorResume(String resume, String jobDescription) throws RuntimeException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create request body
            String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"Tailor this resume according to this job description\n Resume is\n"
                    + resume + "\nJob Description is\n" + jobDescription + "\n\"}]}]}";

            // Create request entity
            RequestEntity<String> requestEntity = new RequestEntity<>(requestBody, headers, HttpMethod.POST,
                    new URI(GEMINI_API_URL + geminiApiKey));

            // Make POST request
            System.out.println("Making request to Gemini...");
            ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);

            // Handle response
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("failed to make request to Gemini");
            }

            System.out.println("Got response!");
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
                    System.out.println(result);
                    break;
                }
                break;
            }

            return result;
        } catch (URISyntaxException e) {
            System.out.println("Invalid URI: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (HttpClientErrorException e) {
            System.out.println("Error making request: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (Exception e) {
            System.out.println("Failed to tailor resume: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}