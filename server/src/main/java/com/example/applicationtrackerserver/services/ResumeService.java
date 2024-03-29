package com.example.applicationtrackerserver.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ResumeService {
    private static final String STORAGE_DIR = "resumes";
    private static final String SUPPORTED_FILE_EXTENSION = ".pdf";

    public String saveResume(MultipartFile file, Long userId) throws IOException {
        // Define the path where you want to store the resumes
        Path storageDirectory = Paths.get(STORAGE_DIR);

        // If the directory doesn't exist, create it
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        // Generate a unique resumeId
        String resumeId = UUID.randomUUID().toString();

        // Create a Path object for the user's directory
        Path userDirectory = storageDirectory.resolve(userId.toString());

        // If the user's directory doesn't exist, create it
        if (!Files.exists(userDirectory)) {
            Files.createDirectories(userDirectory);
        }

        // Create a Path object for the new resume file
        Path resumeFile = userDirectory.resolve(resumeId + SUPPORTED_FILE_EXTENSION);

        // Copy the resume file to the server's local file system
        Files.copy(file.getInputStream(), resumeFile);

        return resumeId;
    }

    public byte[] readResume(String resumeId, Long userId) throws IOException, FileNotFoundException {
        // Create a Path object for the user's directory
        Path userDirectory = Paths.get(STORAGE_DIR).resolve(userId.toString());

        // Create a Path object for the resume file
        Path resumeFile = userDirectory.resolve(resumeId + SUPPORTED_FILE_EXTENSION);

        // Check if the resume file exists
        if (!Files.exists(resumeFile)) {
            throw new FileNotFoundException("Resume with ID " + resumeId + " not found");
        }

        // Read the resume file as a byte arrays
        byte[] resumeBytes = Files.readAllBytes(resumeFile);

        return resumeBytes;
    }
}
