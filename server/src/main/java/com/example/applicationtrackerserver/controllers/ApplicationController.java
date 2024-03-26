package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.utils.CreateApplicationRequest;
import com.example.applicationtrackerserver.services.ApplicationService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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

    @GetMapping
    public List<Application> getAllApplications(
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "status", required = false) String status) {
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
        int count = applicationService.getCountOfApplicationsLast7Days();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", count);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("id") Long id) {
        Optional<Application> application = applicationService.getApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Object> createApplication(@RequestBody Application request) {
        Map<String, Object> response = new HashMap<String, Object>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String token = (String) authentication.getCredentials();
        logger.info("Token extracted from authentication: " + token);

        Long userId = jwtTokenService.extractUserId(token);
        logger.info("User ID extracted from token: " + userId);

        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            response.put("message", "Error occured - Unable to fetch user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        logger.info("User fetched from database!");

        ModelMapper modelMapper = new ModelMapper();
        Application application = modelMapper.map(request, Application.class);
        logger.info("Mapped request to application!");

        application.setUser(user.get());
        application.setCreatedOn(LocalDateTime.now());
        application.setLastUpdated(LocalDateTime.now());
        logger.info("Filled in missing attributes!");

        Application newApplication = applicationService.createApplication(application);
        response.put("message", "Application created successfully.");
        response.put("application", newApplication);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable("id") Long id,
            @RequestBody Application application) {
        application.setLastUpdated(LocalDateTime.now());
        try {
            Application updatedApplication = applicationService.updateApplication(application);
            return ResponseEntity.ok(updatedApplication);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }
}
