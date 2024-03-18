package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.AuthExceptions;
import com.example.applicationtrackerserver.models.AuthRequest;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.UserInfoDetails;
import com.example.applicationtrackerserver.services.AuthService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.UserInfoDetailsService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
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
    public ResponseEntity<Map> signUp(@RequestBody User user) {
        Map<String, String> response = new HashMap<String, String>();
        try {
            authService.signUp(user);
            response.put("status", "User registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (AuthExceptions.UsernameExistsException | AuthExceptions.EmailExistsException e) {
            response.put("status", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(response);
        } catch (Exception e) {
            response.put("status", "Error occurred during user registration: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map> login(@RequestBody AuthRequest request) {
        logger.info("Login request received for user: " + request.getUsername());
        Map<String, String> response = new HashMap<String, String>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            if (authentication.isAuthenticated()) {
                logger.info("User authenticated successfully: " + request.getUsername());
                UserInfoDetails userInfoDetails = userInfoDetailsService.loadUserByUsername(request.getUsername());
                String token = jwtTokenService.generateToken(userInfoDetails);
                response.put("token", token);
                response.put("status", "User authenticated successfully");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
            logger.info("User authentication failed: " + request.getUsername());

            response.put("token", null);
            response.put("status", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (AuthenticationException e) {
            logger.warning("User authentication failed: " + request.getUsername() + " - " + e.getMessage());
            response.put("token", null);
            response.put("status", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<Map> logout(HttpServletRequest request) {
        // Clear the authentication token
        SecurityContextHolder.clearContext();
        Map<String, String> response = new HashMap<String, String>();
        response.put("status", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}