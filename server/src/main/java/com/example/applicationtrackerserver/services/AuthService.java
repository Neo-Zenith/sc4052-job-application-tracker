package com.example.applicationtrackerserver.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.exceptions.AuthExceptions.*;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.User;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void signUp(User user) throws UsernameExistsException, EmailExistsException {
        // Check if a user with the same username / email already exists
        if (userService.existsByUsername(user.getUsername())) {
            throw new UsernameExistsException("User with this username already exists");
        } else if (userService.existsByEmail(user.getEmail())) {
            throw new EmailExistsException("User with this email already exists");
        }

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        userService.createUser(user);
    }

    public boolean authenticate(User user) throws UserNotFoundException {
        // Find the user in the database
        User fetchedUser = userService.findByUsername(user.getUsername());

        // Check if the user exists and the password is correct
        return passwordEncoder.matches(user.getPassword(), fetchedUser.getPassword());
    }
}