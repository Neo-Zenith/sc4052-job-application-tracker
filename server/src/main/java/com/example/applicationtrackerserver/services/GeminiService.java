package com.example.applicationtrackerserver.services;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.utils.ResumeFeedback;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.utils.GeminiClient;

@Service
public class GeminiService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private GeminiClient geminiClient;

    public ResumeFeedback reviewResume(String resume, Long jobApplicationId, String jobDescription)
            throws Exception, ApplicationNotFoundException {
        String[] result;
        if (jobApplicationId != null) {
            // Fetch the job application from the database
            Application jobApplication = applicationRepository.findById(jobApplicationId)
                    .orElseThrow(() -> new ApplicationNotFoundException(
                            "Job application with ID " + jobApplicationId + " not found"));
            result = geminiClient.reviewResume(resume, jobApplication).split("--");
        } else {
            result = geminiClient.reviewResume(resume, jobDescription).split("--");
        }

        ArrayList<String> resultList = new ArrayList<>(Arrays.asList(result));
        resultList.remove(0);

        System.out.println(resultList);

        String score = resultList.remove(resultList.size() - 1);

        System.out.println("Score:" + score);

        // Make a request to Gemini to tailor the resume
        return new ResumeFeedback(resultList, score);
    }

    public String generateCoverLetter(Long jobApplicationId) throws Exception, ApplicationNotFoundException {
        // Fetch the job application from the database
        Application jobApplication = applicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new ApplicationNotFoundException(
                        "Job application with ID " + jobApplicationId + " not found"));

        // Make a request to Gemini to craft the cover letter
        return geminiClient.generateCoverLetter(jobApplication);
    }

}