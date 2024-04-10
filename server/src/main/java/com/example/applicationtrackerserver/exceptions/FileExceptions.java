package com.example.applicationtrackerserver.exceptions;

public class FileExceptions {
    public static class UnsupportedFileTypeException extends Exception {
        public UnsupportedFileTypeException(String message) {
            super(message);
        }
    }
}
