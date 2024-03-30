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
public class ResumeFileService {
    private static final String STORAGE_DIR = "resumes";

    public String getFileType(MultipartFile file) {
        String[] parts = file.getOriginalFilename().split("\\.");
        return parts[parts.length - 1];
    }

    public String getFileName(MultipartFile file) {
        String[] parts = file.getOriginalFilename().split("\\.");
        return parts[0];
    }

    public String saveResume(MultipartFile file, Long userId, String fileType) throws IOException {
        // Define the path where you want to store the resumes
        Path storageDirectory = Paths.get(STORAGE_DIR);

        // If the directory doesn't exist, create it
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        // Create a Path object for the user's directory
        Path userDirectory = storageDirectory.resolve(userId.toString());

        // If the user's directory doesn't exist, create it
        if (!Files.exists(userDirectory)) {
            Files.createDirectories(userDirectory);
        }

        String resumeId = UUID.randomUUID().toString();
        String filePath = resumeId + "." + fileType;

        // Create a Path object for the new resume file
        Path resumeFile = userDirectory.resolve(filePath);

        // Copy the resume file to the server's local file system
        Files.copy(file.getInputStream(), resumeFile);

        return resumeId;
    }

    public byte[] readResume(Long userId, String resumeUUID, String fileType)
            throws IOException, FileNotFoundException {
        // Create a Path object for the user's directory
        Path userDirectory = Paths.get(STORAGE_DIR).resolve(userId.toString());

        // Create a Path object for the resume file
        String filePath = resumeUUID + "." + fileType;
        Path resumeFile = userDirectory.resolve(filePath);

        // Check if the resume file exists
        if (!Files.exists(resumeFile)) {
            throw new FileNotFoundException("Resume with path " + filePath + " not found");
        }

        // Read the resume file as a byte arrays
        byte[] resumeBytes = Files.readAllBytes(resumeFile);

        return resumeBytes;
    }
}
