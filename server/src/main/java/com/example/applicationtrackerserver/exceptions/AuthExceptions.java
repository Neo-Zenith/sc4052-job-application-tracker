package com.example.applicationtrackerserver.exceptions;

public class AuthExceptions {
    public static class UsernameExistsException extends Exception {
        public UsernameExistsException(String message) {
            super(message);
        }
    }

    public static class EmailExistsException extends Exception {
        public EmailExistsException(String message) {
            super(message);
        }
    }
}