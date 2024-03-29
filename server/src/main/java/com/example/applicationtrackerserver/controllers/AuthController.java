package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.AuthExceptions.*;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.utils.AuthRequest;
import com.example.applicationtrackerserver.models.utils.UserInfoDetails;
import com.example.applicationtrackerserver.services.AuthService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserInfoDetailsService;

import jakarta.servlet.http.HttpServletRequest;

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

    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@RequestBody User user) throws UsernameExistsException, EmailExistsException {
        Map<String, Object> response = new HashMap<String, Object>();
        authService.signUp(user);
        response.put("message", "User registered successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthRequest request) throws AuthenticationException {
        logger.info("Login request received for user: " + request.getUsername());
        Map<String, Object> response = new HashMap<String, Object>();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        if (!authentication.isAuthenticated()) {
            logger.info("User authentication failed: " + request.getUsername());
            response.put("token", null);
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        logger.info("User authenticated successfully: " + request.getUsername());
        UserInfoDetails userInfoDetails = userInfoDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtTokenService.generateToken(userInfoDetails);
        response.put("token", token);
        response.put("message", "User authenticated successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        // Clear the authentication token
        SecurityContextHolder.clearContext();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", "Logged out successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}