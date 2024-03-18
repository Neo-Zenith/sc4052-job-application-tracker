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

    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", applicationUrl='" + applicationUrl + '\'' +
                ", companyName='" + companyName + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", jobDescription='" + jobDescription + '\'' +
                ", source='" + source + '\'' +
                ", jobType='" + jobType + '\'' +
                ", remark='" + remark + '\'' +
                ", coverLetter='" + coverLetter + '\'' +
                ", user=" + user +
                ", status='" + status + '\'' +
                ", createdOn=" + createdOn +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}