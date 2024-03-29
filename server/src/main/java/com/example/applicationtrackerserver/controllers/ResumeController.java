package com.example.applicationtrackerserver.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.ResumeService;

import org.springframework.http.ResponseEntity;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("api/v1/resumes")
public class ResumeController {
    private static final Logger logger = LoggerFactory.getLogger(ResumeController.class);

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(IOException ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", "Error occured: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(FileNotFoundException ex) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> uploadResume(@RequestParam(value = "file", required = true) MultipartFile file)
            throws IOException {
        Map<String, Object> response = new HashMap<String, Object>();

        logger.info("Received file: " + file.getOriginalFilename());
        logger.info("File type: " + file.getContentType());

        if (!file.getContentType().equals("application/pdf")) {
            response.put("message:", "Unsupported file type");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Long userId = jwtTokenService.extractUserId();
        logger.info("User ID extracted from token: " + userId);

        String resumeId = resumeService.saveResume(file, userId);
        response.put("resumeId:", resumeId);
        response.put("message:", "Resume uploaded successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/{resumeId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Object> getResume(@PathVariable String resumeId) throws IOException, FileNotFoundException {
        Long userId = jwtTokenService.extractUserId();
        logger.info("User ID extracted from token: " + userId);

        // Retrieve the resume using the resumeId
        byte[] resume = resumeService.readResume(resumeId, userId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "resume.pdf");
        return new ResponseEntity<>(resume, headers, HttpStatus.OK);
    }
}