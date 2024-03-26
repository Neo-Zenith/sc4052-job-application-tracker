package com.example.applicationtrackerserver.enums;

public enum ApplicationStatus {
    APPLIED("Applied"),
    IN_PROGRESS("In Progress"),
    REJECTED("Rejected"),
    COMPLETED("Completed");

    private final String status;

    ApplicationStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public static ApplicationStatus fromString(String status) {
        for (ApplicationStatus applicationStatus : ApplicationStatus.values()) {
            if (applicationStatus.getStatus().equalsIgnoreCase(status)) {
                return applicationStatus;
            }
        }
        return null;
    }
}
