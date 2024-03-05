package com.example.applicationtrackerserver.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.models.User;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(User user) {
        // Check if a user with the same username / email already exists
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with this username already exists");
        } else if (userService.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        userService.createUser(user);
    }

    public boolean authenticate(User user) {
        // Find the user in the database
        Optional<User> optionalUser = userService.findByUsername(user.getUsername());

        // Check if the user exists and the password is correct
        return optionalUser.isPresent()
                && passwordEncoder.matches(user.getPassword(), optionalUser.get().getPassword());
    }
}