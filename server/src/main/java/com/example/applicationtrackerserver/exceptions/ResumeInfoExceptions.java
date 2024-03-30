package com.example.applicationtrackerserver.exceptions;

public class ResumeInfoExceptions {
    public static class ResumeInfoNotFoundException extends Exception {
        public ResumeInfoNotFoundException(String message) {
            super(message);
        }
    }
}
