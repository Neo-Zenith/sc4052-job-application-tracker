package com.example.applicationtrackerserver.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.applicationtrackerserver.exceptions.ResumeInfoExceptions.ResumeInfoNotFoundException;
import com.example.applicationtrackerserver.models.ResumeInfo;
import com.example.applicationtrackerserver.services.JwtTokenService;
import com.example.applicationtrackerserver.services.ResumeFileService;
import com.example.applicationtrackerserver.services.ResumeInfoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.http.ResponseEntity;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("api/v1/resumes")
public class ResumeInfoController {
        private static final Logger logger = LoggerFactory.getLogger(ResumeInfoController.class);

        @Autowired
        private ResumeFileService resumeFileService;

        @Autowired
        private JwtTokenService jwtTokenService;

        @Autowired
        private ResumeInfoService resumeInfoService;

        @Operation(summary = "Handle IOException")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "500", description = "Internal Server Error")
        })
        @ExceptionHandler(IOException.class)
        public ResponseEntity<Object> handleIOException(IOException ex) {
                Map<String, Object> response = new HashMap<String, Object>();
                response.put("message", "Error occured: " + ex.getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        @Operation(summary = "Handle FileNotFoundException and ResumeInfoNotFoundException")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "404", description = "Not Found")
        })
        @ExceptionHandler({ FileNotFoundException.class, ResumeInfoNotFoundException.class })
        public ResponseEntity<Object> handleNotFoundException(Exception ex) {
                Map<String, Object> response = new HashMap<String, Object>();
                response.put("message", "Resource not found - " + ex.getMessage());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        @Operation(summary = "Get a resume info by ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = ResumeInfo.class)) }),
                        @ApiResponse(responseCode = "404", description = "Resume info not found")
        })
        @GetMapping("/{id}")
        public ResponseEntity<ResumeInfo> getResumeInfoById(
                        @Parameter(description = "ID of the resume info") @PathVariable("id") Long id)
                        throws ResumeInfoNotFoundException {
                ResumeInfo resumeInfo = resumeInfoService.getResumeInfoById(id);
                return ResponseEntity.ok(resumeInfo);
        }

        @Operation(summary = "Get resume information")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = ResumeInfo.class)) })
        })
        @GetMapping
        public List<ResumeInfo> getResumeInfos(
                        @Parameter(description = "User ID") @RequestParam(value = "userId", required = false) Long userId,
                        @Parameter(description = "Application ID") @RequestParam(value = "applicationId", required = false) Long applicationId) {
                if (userId != null)
                        return resumeInfoService.getResumeInfoByUserId(userId);
                if (applicationId != null)
                        return resumeInfoService.getResumeInfoByApplicationId(applicationId);
                return resumeInfoService.getAllResumeInfos();
        }

        @Data
        @AllArgsConstructor
        public class UploadResumeResponse {
                private String message;
                private ResumeInfo data;
        }

        @Operation(summary = "Upload a resume")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Resume uploaded successfully", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = UploadResumeResponse.class)) }),
                        @ApiResponse(responseCode = "500", description = "Internal Server Error")
        })
        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<UploadResumeResponse> uploadResume(
                        @Parameter(description = "File to upload", required = true) @RequestParam(value = "file", required = true) MultipartFile file)
                        throws IOException {
                String fileName = resumeFileService.getFileName(file);
                logger.info("Received file: " + fileName);

                String fileType = resumeFileService.getFileType(file);
                logger.info("File type: " + fileType);

                Long userId = jwtTokenService.extractUserId();
                logger.info("User ID extracted from token: " + userId);

                String resumeId = resumeFileService.saveResume(file, userId, fileType);

                ResumeInfo resumeInfo = resumeInfoService
                                .createResumeInfo(new ResumeInfo(userId, resumeId, fileName, fileType));
                UploadResumeResponse response = new UploadResumeResponse("Resume uploaded successfully", resumeInfo);
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @Operation(summary = "Get a resume file")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                                        @Content(mediaType = "application/pdf")
                        }),
                        @ApiResponse(responseCode = "404", description = "Resume file not found")
        })
        @GetMapping(value = "/file/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
        public ResponseEntity<Object> getResumeFile(
                        @Parameter(description = "ID of the resume file to return") @PathVariable Long id)
                        throws IOException, FileNotFoundException, ResumeInfoNotFoundException {
                Long userId = jwtTokenService.extractUserId();
                logger.info("User ID extracted from token: " + userId);

                ResumeInfo resumeInfo = resumeInfoService.getResumeInfoById(id);

                // Retrieve the resume using the resumeUUID
                byte[] resume = resumeFileService.readResume(userId, resumeInfo.getResumeUUID(),
                                resumeInfo.getFileType());

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "resume.pdf");
                return new ResponseEntity<>(resume, headers, HttpStatus.OK);
        }

        @Operation(summary = "Update resume information")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Resume info updated successfully"),
                        @ApiResponse(responseCode = "404", description = "Resume info not found")
        })
        @PutMapping("/{id}")
        public ResponseEntity<Object> updateResumeInfo(
                        @Parameter(description = "ID of the resume info to update") @PathVariable("id") Long id,
                        @RequestBody ResumeInfo resumeInfo)
                        throws ResumeInfoNotFoundException {
                Map<String, Object> response = new HashMap<String, Object>();
                ResumeInfo updatedResumeInfo = resumeInfoService.updateResumeInfo(resumeInfo);
                response.put("message", "Resume info updated successfully");
                response.put("data", updatedResumeInfo);
                return ResponseEntity.ok(response);
        }

        @Operation(summary = "Delete resume information")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Resume info deleted successfully"),
                        @ApiResponse(responseCode = "404", description = "Resume info not found")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Object> deleteResumeInfo(@PathVariable("id") Long id) {
                resumeInfoService.deleteResumeInfo(id);
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
}