package com.example.applicationtrackerserver.models.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResumeRequest {
    private Long resumeInfoId;
    private Long applicationId;
    private String jobDescription;
}