package com.example.applicationtrackerserver.controllers;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.applicationtrackerserver.services.GeminiService;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;

@RestController()
@RequestMapping("api/v1/gemini")
public class GeminiController {
    private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);

    @Autowired
    private GeminiService geminiService;

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> tailorResume(
            @RequestParam(value = "file", required = true) MultipartFile file,
            @RequestParam(value = "applicationId", required = true) Long applicationId) {
        Map<String, Object> response = new HashMap<String, Object>();

        if (file.isEmpty()) {
            response.put("message", "File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        logger.info("Received file: " + file.getOriginalFilename());
        logger.info("Received filetype: " + file.getContentType());

        // Determine the file type and parse accordingly
        String content = null;
        String fileType = file.getContentType();
        switch (fileType) {
            case "application/pdf":
                try (PDDocument document = PDDocument.load(file.getBytes())) {
                    if (!document.isEncrypted()) {
                        PDFTextStripperByArea stripper = new PDFTextStripperByArea();
                        stripper.setSortByPosition(true);
                        PDFTextStripper tStripper = new PDFTextStripper();
                        content = tStripper.getText(document);
                    }
                } catch (IOException e) {
                    response.put("message", "Error reading PDF file");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
                break;
            case "text/plain":
                try {
                    content = new String(file.getBytes(), StandardCharsets.UTF_8);
                } catch (IOException e) {
                    response.put("message", "Error reading file");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
                break;
            default:
                response.put("message", "Unsupported file type");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        logger.debug("File content: " + content);

        try {
            String result = geminiService.tailorResume(content, applicationId);
            response.put("message", "Resume tailored successfully");
            response.put("result", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error tailoring resume - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/cover-letter", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> generateCoverLetter(
            @RequestParam(value = "applicationId", required = true) Long applicationId) {
        Map<String, Object> response = new HashMap<String, Object>();
        String result = geminiService.generateCoverLetter(applicationId);
        response.put("message", "Cover letter generated successfully");
        response.put("result", result);
        return ResponseEntity.ok(response);
    }

}