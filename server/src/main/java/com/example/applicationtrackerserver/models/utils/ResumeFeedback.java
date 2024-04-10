package com.example.applicationtrackerserver.models.utils;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeFeedback {
    public String feedback;
    public int score;

    public ResumeFeedback(ArrayList<String> feedback, String score) {
        this.feedback = String.join("<>", feedback);
        this.score = parseScore(score);
    }

    public int parseScore(String scoreString) {
        try {
            String[] parts = scoreString.split("=");
            String scorePart = parts[1].split("/")[0];
            return Integer.parseInt(scorePart);
        } catch (Exception e) {
            System.out.println("Error parsing score");
        }

        try {
            String[] parts = scoreString.split(":");
            String scorePart = parts[1].split("/")[0];
            return Integer.parseInt(scorePart);
        } catch (Exception e) {
            System.out.println("Error parsing score");
            return 0;
        }
    }
}
