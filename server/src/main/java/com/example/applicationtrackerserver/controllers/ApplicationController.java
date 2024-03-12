package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.CreateApplicationRequest;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.services.ApplicationService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("api/v1/applications")
public class ApplicationController {
    private static final Logger logger = Logger.getLogger(ApplicationController.class.getName());

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("id") Long id) {
        Optional<Application> application = applicationService.getApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createApplication(@RequestBody CreateApplicationRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String token = (String) authentication.getCredentials();
        logger.info("Token extracted from authentication: " + token);

        Long userId = jwtTokenService.extractUserId(token);
        logger.info("User ID extracted from token: " + userId);

        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured - Unable to fetch user");
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
        return ResponseEntity.ok(newApplication);
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
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok("Application deleted successfully");
    }
}
