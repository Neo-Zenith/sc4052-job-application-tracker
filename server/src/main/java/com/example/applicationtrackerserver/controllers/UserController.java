package com.example.applicationtrackerserver.controllers;

import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
        private static final Logger logger = LoggerFactory.getLogger(UserController.class);

        @Autowired
        private UserService userService;

        @Autowired
        private BCryptPasswordEncoder passwordEncoder;

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex) {
                Map<String, Object> response = new HashMap<String, Object>();
                response.put("message", "Resource not found - " + ex.getMessage());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        @Operation(summary = "Get all users")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) })
        })
        @GetMapping
        public List<User> getAllUsers() {
                return userService.getAllUsers();
        }

        @Operation(summary = "Get a user by ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) }),
                        @ApiResponse(responseCode = "404", description = "User not found")
        })
        @GetMapping("/{id}")
        public ResponseEntity<User> getUserById(
                        @Parameter(description = "ID of the user") @PathVariable("id") Long id)
                        throws UserNotFoundException {
                User user = userService.getUserById(id);
                return ResponseEntity.ok(user);
        }

        @Operation(summary = "Create a new user")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "User created successfully", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) })
        })
        @PostMapping
        public ResponseEntity<User> createUser(
                        @Parameter(description = "User to create") @RequestBody User user) {
                String hashedPassword = passwordEncoder.encode(user.getPassword());
                user.setPassword(hashedPassword);
                User newUser = userService.createUser(user);
                return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }

        @AllArgsConstructor
        @Data
        public class UpdateUserResponse {
                private String message;
                private User data;
        }

        @Operation(summary = "Update a user")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "User updated successfully", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = UpdateUserResponse.class)) }),
                        @ApiResponse(responseCode = "404", description = "User not found")
        })
        @PutMapping("/{id}")
        public ResponseEntity<UpdateUserResponse> updateUser(
                        @Parameter(description = "ID of the user to update") @PathVariable("id") Long id,
                        @Parameter(description = "User to update") @RequestBody User user)
                        throws UserNotFoundException {
                User updatedUser = userService.updateUser(user);
                UpdateUserResponse response = new UpdateUserResponse("User updated successfully", updatedUser);
                return ResponseEntity.ok(response);
        }

        @Operation(summary = "Delete a user")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "User deleted successfully")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Object> deleteUser(
                        @Parameter(description = "ID of the user to delete") @PathVariable("id") Long id) {
                userService.deleteUser(id);
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
}
