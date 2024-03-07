package com.example.applicationtrackerserver.exceptions;

public class AuthExceptions {
    public static class UsernameExistsException extends RuntimeException {
        public UsernameExistsException(String message) {
            super(message);
        }
    }

    public static class EmailExistsException extends RuntimeException {
        public EmailExistsException(String message) {
            super(message);
        }
    }
}