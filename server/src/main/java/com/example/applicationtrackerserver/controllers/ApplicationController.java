package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository;
import com.example.applicationtrackerserver.services.ApplicationService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.Data;

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

    @Operation(summary = "Get applications by user ID and/or status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Application.class)) })
    })
    @GetMapping
    public List<Application> getApplications(
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

    @AllArgsConstructor
    @Data
    public class GetCountOfApplicationsLast7DaysResponse {
        private List<ApplicationRepository.DateCount> data;
    }

    @Operation(summary = "Get count of applications in the last 7 days")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = GetCountOfApplicationsLast7DaysResponse.class)) })
    })
    @GetMapping(value = "/count/last7days")
    public ResponseEntity<GetCountOfApplicationsLast7DaysResponse> getCountOfApplicationsLast7Days()
            throws UserNotFoundException {
        long userId = jwtTokenService.extractUserId();
        List<ApplicationRepository.DateCount> count = applicationService.getCountOfApplicationsLast7Days(userId);
        GetCountOfApplicationsLast7DaysResponse response = new GetCountOfApplicationsLast7DaysResponse(count);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get an application by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Application.class)) }),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("id") Long id)
            throws ApplicationNotFoundException {
        Application application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    @AllArgsConstructor
    @Data
    public class CreateApplicationResponse {
        private String message;
        private Application data;
    }

    @Operation(summary = "Create a new application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Application created successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = CreateApplicationResponse.class)) })
    })
    @PostMapping
    public ResponseEntity<CreateApplicationResponse> createApplication(@RequestBody Application application)
            throws UserNotFoundException {
        Long userId = jwtTokenService.extractUserId();
        logger.info("User ID extracted from token: " + userId);

        User user = userService.getUserById(userId);
        logger.info("User fetched from database!");

        application.setUser(user);
        application.setCreatedOn(LocalDateTime.now());
        application.setLastUpdated(LocalDateTime.now());
        logger.info("Filled in missing attributes!");

        Application newApplication = applicationService.createApplication(application);
        CreateApplicationResponse response = new CreateApplicationResponse("Application created successfully.",
                newApplication);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Update an application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Application updated successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Application.class)) }),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable("id") Long id,
            @RequestBody Application application) throws ApplicationNotFoundException {
        application.setLastUpdated(LocalDateTime.now());
        Application updatedApplication = applicationService.updateApplication(application);
        return ResponseEntity.ok(updatedApplication);
    }

    @Operation(summary = "Delete an application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Application deleted successfully")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
