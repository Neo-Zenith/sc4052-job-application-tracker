package com.example.applicationtrackerserver.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.FileExceptions.UnsupportedFileTypeException;
import com.example.applicationtrackerserver.models.ResumeInfo;
import com.example.applicationtrackerserver.models.utils.ErrorResponse;
import com.example.applicationtrackerserver.models.utils.ResumeFeedback;
import com.example.applicationtrackerserver.models.utils.ReviewResumeRequest;
import com.example.applicationtrackerserver.services.FileParserService;
import com.example.applicationtrackerserver.services.GeminiService;
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

    @Autowired
    private ResumeFileService resumeFileService;

    @Autowired
    private ResumeInfoService resumeInfoService;

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

    @AllArgsConstructor
    @Data
    public class ReviewResumeResponse {
        private String message;
        private ResumeFeedback data;
    }

    @Operation(summary = "Review a resume")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume reviewed successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ReviewResumeResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    })
    @PostMapping("/resume")
    public ResponseEntity<Object> reviewResume(
            @Parameter(description = "Request body containing resume details") @RequestBody ReviewResumeRequest request)
            throws IOException, UnsupportedFileTypeException, ApplicationNotFoundException, Exception {
        if (request.getResumeInfoId() == null) {
            ErrorResponse response = new ErrorResponse("resumeInfoId must be supplied");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getApplicationId() == null && request.getJobDescription() == null) {
            ErrorResponse response = new ErrorResponse("Either applicationId or jobDescription must be supplied");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else if (request.getApplicationId() != null && request.getJobDescription() != null) {
            logger.info("Using applicationId " + request.getApplicationId() + " instead of supplied job description");
            request.setJobDescription(null);
        }

        String content = "";
        ResumeInfo resumeInfo = null;

        resumeInfo = resumeInfoService.getResumeInfoById(request.getResumeInfoId());

        resumeInfo.setApplicationId(request.getApplicationId());
        resumeInfo.setJobDescription(request.getJobDescription());

        byte[] resumeBytes = resumeFileService.readResume(resumeInfo.getUserId(), resumeInfo.getResumeUUID(),
                resumeInfo.getFileType());
        content = fileParserService.parseFile(resumeBytes, resumeInfo.getFileType());

        ResumeFeedback result = geminiService.reviewResume(content, request.getApplicationId(),
                request.getJobDescription());

        // Update resume info
        logger.info("Updating resume info...");
        resumeInfo.setFeedback(result.getFeedback());
        resumeInfo.setScore(result.getScore());
        resumeInfoService.updateResumeInfo(resumeInfo);

        ReviewResumeResponse response = new ReviewResumeResponse("Resume reviewed successfully", result);
        return ResponseEntity.ok(response);
    }

    @AllArgsConstructor
    @Data
    public class GenerateCoverLetterResponse {
        private String message;
        private String data;
    }

    @Operation(summary = "Generate a cover letter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cover letter generated successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)) }),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    @PostMapping(value = "/cover-letter", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GenerateCoverLetterResponse> generateCoverLetter(
            @Parameter(description = "ID of the application for which to generate the cover letter") @RequestParam(value = "applicationId", required = true) Long applicationId)
            throws ApplicationNotFoundException, Exception {
        String result = geminiService.generateCoverLetter(applicationId);
        GenerateCoverLetterResponse response = new GenerateCoverLetterResponse("Cover letter generated successfully",
                result);
        return ResponseEntity.ok(response);
    }
}