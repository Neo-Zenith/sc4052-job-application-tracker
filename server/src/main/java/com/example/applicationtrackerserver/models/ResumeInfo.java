package com.example.applicationtrackerserver.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resume_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String resumeUUID;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = true)
    private int score;

    @Column(nullable = false)
    private LocalDateTime createdOn;

    @Column(nullable = true)
    private Long applicationId;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String jobDescription;

    public ResumeInfo(Long userId, String resumeUUID, String fileName, String fileType) {
        this.userId = userId;
        this.resumeUUID = resumeUUID;
        this.fileName = fileName;
        this.fileType = fileType;
        this.createdOn = LocalDateTime.now();
    }

    public ResumeInfo(Long userId, String resumeUUID, String fileName, String fileType, Long applicationId,
            String jobDescription) {
        this.userId = userId;
        this.resumeUUID = resumeUUID;
        this.fileName = fileName;
        this.fileType = fileType;
        this.applicationId = applicationId;
        this.jobDescription = jobDescription;
        this.createdOn = LocalDateTime.now();
    }
}
