package com.example.applicationtrackerserver.services;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserService userService;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByUserId(long userId) throws UserNotFoundException {
        User user = userService.getUserById(userId);
        return applicationRepository.findByUser(user);
    }

    public Application getApplicationById(Long id) throws ApplicationNotFoundException {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application wtih ID " + id + " not found"));
    }

    public List<Application> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status);
    }

    public List<Application> getApplicationsByUserIdAndStatus(long userId, String status) throws UserNotFoundException {
        User user = userService.getUserById(userId);
        return applicationRepository.findByUserAndStatus(user, status);
    }

    public List<ApplicationRepository.DateCount> getCountOfApplicationsLast7Days() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime sevenDaysAgo = currentDateTime.minusDays(7);
        return applicationRepository.countByCreatedOnBetween(sevenDaysAgo, currentDateTime);
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public Application updateApplication(Application updatedApplication) throws ApplicationNotFoundException {
        if (!applicationRepository.existsById(updatedApplication.getId())) {
            throw new ApplicationNotFoundException("Application wtih ID " + updatedApplication.getId() + " not found");
        }
        return applicationRepository.save(updatedApplication);
    }
}