package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.services.AuthService;
import com.example.applicationtrackerserver.services.JwtTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtTokenService jwtTokenService;

    public AuthController(AuthService authService, JwtTokenService jwtTokenService) {
        this.authService = authService;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        try {
            authService.signUp(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            // Handle the exception here
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred during user registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        if (authService.authenticate(user)) {
            String token = jwtTokenService.generateToken(user.getUsername());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Perform logout logic here
        return ResponseEntity.ok("Logged out successfully");
    }
}