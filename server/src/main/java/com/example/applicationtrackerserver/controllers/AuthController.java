package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.AuthExceptions;
import com.example.applicationtrackerserver.models.AuthRequest;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.UserInfoDetails;
import com.example.applicationtrackerserver.services.AuthService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserInfoDetailsService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.logging.Logger;

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
@RequestMapping("/api/v1/auth")
public class AuthController {
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserInfoDetailsService userInfoDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        try {
            authService.signUp(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (AuthExceptions.UsernameExistsException | AuthExceptions.EmailExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred during user registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        logger.info("Login request received for user: " + request.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            if (authentication.isAuthenticated()) {
                logger.info("User authenticated successfully: " + request.getUsername());
                UserInfoDetails userInfoDetails = userInfoDetailsService.loadUserByUsername(request.getUsername());
                String token = jwtTokenService.generateToken(userInfoDetails);
                return ResponseEntity.status(HttpStatus.OK).body("{\"token\": \"" + token + "\"}");
            }
            logger.info("User authentication failed: " + request.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (AuthenticationException e) {
            logger.warning("User authentication failed: " + request.getUsername() + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // Clear the authentication token
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
}