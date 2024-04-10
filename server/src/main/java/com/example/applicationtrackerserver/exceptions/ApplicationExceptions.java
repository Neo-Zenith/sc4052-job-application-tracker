package com.example.applicationtrackerserver.exceptions;

public class ApplicationExceptions {
    public static class ApplicationNotFoundException extends Exception {
        public ApplicationNotFoundException(String message) {
            super(message);
        }
    }
}
