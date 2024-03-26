package com.example.applicationtrackerserver.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String applicationUrl;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = true)
    private String companyUrl;

    @Column(nullable = false)
    private String jobTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String jobDescription;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String jobType;

    @Column(nullable = true)
    private String remark;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String coverLetter;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdOn;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    public Application(String applicationUrl, String companyName, String companyUrl, String jobTitle,
            String jobDescription, String source, String jobType, String remark, String coverLetter,
            String status) {
        this.applicationUrl = applicationUrl;
        this.companyName = companyName;
        this.companyUrl = companyUrl;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.source = source;
        this.jobType = jobType;
        this.remark = remark;
        this.coverLetter = coverLetter;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", jobTitle='" + jobTitle + '\'' +
                ", companyName='" + companyName + '\'' +
                ", source='" + source + '\'' +
                ", jobType='" + jobType + '\'' +
                ", user=" + user +
                ", status='" + status + '\'' +
                ", createdOn=" + createdOn +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}