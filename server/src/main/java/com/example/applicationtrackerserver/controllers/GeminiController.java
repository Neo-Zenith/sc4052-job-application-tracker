package com.example.applicationtrackerserver.controllers;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;
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

@RestController()
@RequestMapping("api/v1/gemini")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping(value = "/resume", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> tailorResume(@RequestParam("file") MultipartFile file,
            @RequestParam("applicationId") Long applicationId) {
        Map<String, String> response = new HashMap<String, String>();
        if (file.isEmpty()) {
            response.put("message", "File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Process the file and application id here
        String content = null;
        // try {
        // content = new String(file.getBytes(), StandardCharsets.UTF_8);
        // System.out.println("File name: " + file.getOriginalFilename());
        // System.out.println("File content: " + content);
        // } catch (IOException e) {
        // response.put("message", "Error reading file");
        // return
        // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        // }

        try (PDDocument document = PDDocument.load(file.getBytes())) {
            if (!document.isEncrypted()) {
                PDFTextStripperByArea stripper = new PDFTextStripperByArea();
                stripper.setSortByPosition(true);
                PDFTextStripper tStripper = new PDFTextStripper();
                content = tStripper.getText(document);
                System.out.println("File name: " + file.getOriginalFilename());
                System.out.println("File content: " + content);
            }
        } catch (IOException e) {
            response.put("message", "Error reading file");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        try {
            String result = geminiService.tailorResume(content, applicationId);
            response.put("message", "Resume tailored successfully");
            response.put("result", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error tailoring resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
