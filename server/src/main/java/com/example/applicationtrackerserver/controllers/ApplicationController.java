package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.enums.ApplicationStatus;
import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.services.ApplicationService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/v1/applications")
public class ApplicationController {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @ExceptionHandler({ UserNotFoundException.class, ApplicationNotFoundException.class })
    public ResponseEntity<Object> handleResourceNotFoundException(Exception ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", "Resource not found - " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public List<Application> getAllApplications(
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "status", required = false) String status) throws UserNotFoundException {
        if (userId != null && status != null) {
            return applicationService.getApplicationsByUserIdAndStatus(userId, status);
        } else if (userId != null) {
            return applicationService.getApplicationsByUserId(userId);
        } else if (status != null) {
            return applicationService.getApplicationsByStatus(status);
        }
        return applicationService.getAllApplications();
    }

    @GetMapping(value = "/count/last7days")
    public ResponseEntity<Object> getCountOfApplicationsLast7Days() {
        List<ApplicationRepository.DateCount> count = applicationService.getCountOfApplicationsLast7Days();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", count);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("id") Long id)
            throws ApplicationNotFoundException {
        Application application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    @PostMapping
    public ResponseEntity<Object> createApplication(@RequestBody Application application) throws UserNotFoundException {
        Map<String, Object> response = new HashMap<String, Object>();

        Long userId = jwtTokenService.extractUserId();
        logger.info("User ID extracted from token: " + userId);

        User user = userService.getUserById(userId);
        logger.info("User fetched from database!");

        application.setUser(user);
        application.setCreatedOn(LocalDateTime.now());
        if (application.getStatus() == ApplicationStatus.APPLIED) {
            application.setAppliedOn(LocalDateTime.now());
        }
        application.setLastUpdated(LocalDateTime.now());
        logger.info("Filled in missing attributes!");

        Application newApplication = applicationService.createApplication(application);
        response.put("message", "Application created successfully.");
        response.put("application", newApplication);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable("id") Long id,
            @RequestBody Application application) throws ApplicationNotFoundException {
        application.setLastUpdated(LocalDateTime.now());
        Application updatedApplication = applicationService.updateApplication(application);
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
