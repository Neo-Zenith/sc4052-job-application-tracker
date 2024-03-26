package com.example.applicationtrackerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.utils.GeminiClient;

@Service
public class GeminiService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private GeminiClient geminiClient;

    public String tailorResume(String resume, Long jobApplicationId) throws RuntimeException {
        // Fetch the job application from the database
        Application jobApplication = applicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new RuntimeException("Job application not found"));

        // Make a request to Gemini to tailor the resume
        try {
            return geminiClient.tailorResume(resume, jobApplication.getJobDescription());
        } catch (Exception e) {
            throw new RuntimeException("Error tailoring resume: " + e.getMessage());
        }
    }

    public String generateCoverLetter(Long jobApplicationId) {
        // Fetch the job application from the database
        Application jobApplication = applicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new RuntimeException("Job application not found"));

        // Make a request to Gemini to craft the cover letter
        try {
            return geminiClient.generateCoverLetter(jobApplication.getJobDescription());
        } catch (Exception e) {
            throw new RuntimeException("Error tailoring resume: " + e.getMessage());
        }
    }
}