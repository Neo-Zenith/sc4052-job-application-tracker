package com.example.applicationtrackerserver.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateApplicationRequest {
    private String applicationUrl;
    private String companyName;
    private String jobTitle;
    private String jobDescription;
    private String source;
    private String type;
    private String remark;
    private String coverLetter;
    private String status;
}
