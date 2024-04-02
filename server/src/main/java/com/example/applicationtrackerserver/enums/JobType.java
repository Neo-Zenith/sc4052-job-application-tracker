package com.example.applicationtrackerserver.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum JobType {
    FULL_TIME("Full-Time"),
    PART_TIME("Part-Time"),
    CONTRACT("Contract"),
    INTERNSHIP("Internship");

    private final String type;

    JobType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static JobType fromString(String type) {
        for (JobType jobType : JobType.values()) {
            // Replace underscore with hyphen for serialization
            if (jobType.getType().equalsIgnoreCase(type.replace("_", "-"))) {
                return jobType;
            }
        }
        return null;
    }
}
