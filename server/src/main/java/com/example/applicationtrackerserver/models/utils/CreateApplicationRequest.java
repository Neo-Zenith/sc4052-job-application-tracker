package com.example.applicationtrackerserver.models.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateApplicationRequest {
    private String applicationUrl;
    private String companyName;
    private String companyUrl;
    private String jobTitle;
    private String jobDescription;
    private String jobType;
    private String source;
    private String remark;
    private String coverLetter;
    private String status;

    @Override
    public String toString() {
        return String.format(
                "CreateApplicationRequest[companyName='%s', companyUrl='%s', jobTitle='%s', jobType='%s', source='%s', status='%s']",
                companyName, companyUrl, jobTitle, jobType, source, status);
    }
}
