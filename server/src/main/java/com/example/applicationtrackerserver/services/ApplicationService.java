package com.example.applicationtrackerserver.services;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByUser(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByUser(user);
    }

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public Application updateApplication(Application updatedApplication) throws RuntimeException {
        Optional<Application> existingApplication = applicationRepository.findById(updatedApplication.getId());
        if (existingApplication.isPresent()) {
            Application application = existingApplication.get();
            application.setApplicationUrl(updatedApplication.getApplicationUrl());
            application.setCompanyName(updatedApplication.getCompanyName());
            application.setJobTitle(updatedApplication.getJobTitle());
            application.setJobDescription(updatedApplication.getJobDescription());
            application.setSource(updatedApplication.getSource());
            application.setJobType(updatedApplication.getJobType());
            application.setRemark(updatedApplication.getRemark());
            application.setCoverLetter(updatedApplication.getCoverLetter());
            application.setUser(updatedApplication.getUser());
            application.setStatus(updatedApplication.getStatus());
            application.setCreatedOn(updatedApplication.getCreatedOn());
            application.setLastUpdated(updatedApplication.getLastUpdated());
            return applicationRepository.save(application);
        }
        throw new RuntimeException("Application not found");
    }
}