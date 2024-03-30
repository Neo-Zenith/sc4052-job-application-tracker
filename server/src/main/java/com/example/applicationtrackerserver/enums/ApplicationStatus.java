package com.example.applicationtrackerserver.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ApplicationStatus {
    APPLIED("Applied"),
    ASSESSMENT("Assessment"),
    INTERVIEW("Interview"),
    REJECTED("Rejected"),
    OFFERED("Offered"),
    GHOSTED("Ghosted");

    private final String status;

    ApplicationStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static ApplicationStatus fromString(String type) {
        for (ApplicationStatus applicationStatus : ApplicationStatus.values()) {
            if (applicationStatus.getStatus().equalsIgnoreCase(type)) {
                return applicationStatus;
            }
        }
        return null;
    }
}
