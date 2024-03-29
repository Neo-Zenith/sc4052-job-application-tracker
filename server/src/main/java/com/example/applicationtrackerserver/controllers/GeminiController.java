package com.example.applicationtrackerserver.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.FileExceptions.UnsupportedFileTypeException;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.services.FileParserService;
import com.example.applicationtrackerserver.services.GeminiService;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController()
@RequestMapping("api/v1/gemini")
public class GeminiController {
    private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private FileParserService fileParserService;

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(IOException ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UnsupportedFileTypeException.class)
    public ResponseEntity<Object> handleUnsupportedFileTypeException(UnsupportedFileTypeException ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> reviewResume(
            @RequestParam(value = "file", required = true) MultipartFile file,
            @RequestParam(value = "applicationId", required = true) Long applicationId)
            throws IOException, UnsupportedFileTypeException, ApplicationNotFoundException, Exception {
        Map<String, Object> response = new HashMap<String, Object>();

        if (file.isEmpty()) {
            response.put("message", "File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        logger.info("Received file: " + file.getOriginalFilename());
        logger.info("Received filetype: " + file.getContentType());

        // Determine the file type and parse accordingly
        String content = "";
        content = fileParserService.parseFile(file);
        logger.debug("File content: " + content);

        String[] result = geminiService.reviewResume(content, applicationId);
        response.put("message", "Resume tailored successfully");
        response.put("result", result);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/cover-letter", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> generateCoverLetter(
            @RequestParam(value = "applicationId", required = true) Long applicationId)
            throws ApplicationNotFoundException, Exception {
        Map<String, Object> response = new HashMap<String, Object>();
        String result = geminiService.generateCoverLetter(applicationId);
        response.put("message", "Cover letter generated successfully");
        response.put("result", result);
        return ResponseEntity.ok(response);
    }

}