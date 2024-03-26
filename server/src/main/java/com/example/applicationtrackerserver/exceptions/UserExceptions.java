package com.example.applicationtrackerserver.exceptions;

public class UserExceptions {
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }
}
