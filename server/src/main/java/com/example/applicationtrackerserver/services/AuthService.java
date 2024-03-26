package com.example.applicationtrackerserver.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.exceptions.AuthExceptions;
import com.example.applicationtrackerserver.models.User;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void signUp(User user) {
        // Check if a user with the same username / email already exists
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            throw new AuthExceptions.UsernameExistsException("User with this username already exists");
        } else if (userService.findByEmail(user.getEmail()).isPresent()) {
            throw new AuthExceptions.EmailExistsException("User with this email already exists");
        }

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        userService.createUser(user);
    }

    public boolean authenticate(User user) {
        // Find the user in the database
        Optional<User> fetchedUser = userService.findByUsername(user.getUsername());

        // Check if the user exists and the password is correct
        return fetchedUser.isPresent()
                && passwordEncoder.matches(user.getPassword(), fetchedUser.get().getPassword());
    }
}