package com.example.applicationtrackerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.utils.GeminiClient;

@Service
public class GeminiService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private GeminiClient geminiClient;

    public String[] reviewResume(String resume, Long jobApplicationId) throws Exception, ApplicationNotFoundException {
        // Fetch the job application from the database
        Application jobApplication = applicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new ApplicationNotFoundException(
                        "Job application with ID " + jobApplicationId + " not found"));

        // Make a request to Gemini to tailor the resume
        return geminiClient.reviewResume(resume, jobApplication).split("--");
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