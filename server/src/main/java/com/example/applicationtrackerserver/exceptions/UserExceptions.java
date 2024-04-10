package com.example.applicationtrackerserver.exceptions;

public class UserExceptions {
    public static class UserNotFoundException extends Exception {
        public UserNotFoundException(String message) {
            super(message);
        }
    }
}
