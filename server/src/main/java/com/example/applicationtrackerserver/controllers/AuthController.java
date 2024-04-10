package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.AuthExceptions.*;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.utils.LoginRequest;
import com.example.applicationtrackerserver.models.utils.UserInfoDetails;
import com.example.applicationtrackerserver.services.AuthService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserInfoDetailsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserInfoDetailsService userInfoDetailsService;

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex) {
        logger.warn("User authentication failed! " + ex.getMessage());
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("token", null);
        response.put("message", "Invalid credentials - " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({ UsernameExistsException.class, EmailExistsException.class })
    public ResponseEntity<Object> handleAlreadyExistException(Exception ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @AllArgsConstructor
    @Data
    public class AuthResponse {
        private String message;
    }

    @Operation(summary = "Sign up a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Username or email already exists")
    })
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody User user)
            throws UsernameExistsException, EmailExistsException {
        authService.signUp(user);
        AuthResponse response = new AuthResponse("User registered successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @AllArgsConstructor
    @Data
    public class LoginResponse {
        private String message;
        private String token;
    }

    @Operation(summary = "Log in a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class)) }),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) throws AuthenticationException {
        logger.info("Login request received for user: " + request.getUsername());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        if (!authentication.isAuthenticated()) {
            logger.info("User authentication failed: " + request.getUsername());
            LoginResponse response = new LoginResponse("Invalid credentials", null);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        logger.info("User authenticated successfully: " + request.getUsername());
        UserInfoDetails userInfoDetails = userInfoDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtTokenService.generateToken(userInfoDetails);
        LoginResponse response = new LoginResponse("User authenticated successfully", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Log out a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logged out successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class)) })
    })
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletRequest request) {
        // Clear the authentication token
        SecurityContextHolder.clearContext();
        AuthResponse response = new AuthResponse("Logged out successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}