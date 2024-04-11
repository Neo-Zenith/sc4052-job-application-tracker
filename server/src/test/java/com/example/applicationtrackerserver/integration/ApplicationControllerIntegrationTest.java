package com.example.applicationtrackerserver.integration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.example.applicationtrackerserver.utils.TestUtils;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;

/* 
 * Data for integration test is loaded from DatabaseSeeder
 */
@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestUtils testUtils;

    @Test
    @WithMockUser
    public void testGetApplicationById() throws Exception {
        // Arrange
        long applicationId = 1L;

        // Act
        ResultActions result = mockMvc.perform(get("/api/v1/applications/{id}", applicationId));

        // Assert
        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(applicationId))
                .andExpect(jsonPath("$.jobTitle").value("Cloud Engineer"))
                .andExpect(jsonPath("$.status").value("APPLIED"));
    }

    @Test
    public void testCreateApplication() throws Exception {
        // Arrange
        String applicationJson = "{ \"jobTitle\": \"Software Engineer\", \"companyName\": \"Google\", \"status\": \"APPLIED\", \"applicationUrl\": \"https://careers.google.com/jobs\", \"jobDescription\": \"Google is hiring a Software Engineer\", \"source\": \"LinkedIn\", \"jobType\": \"FULL_TIME\", \"remark\": \"\", \"coverLetter\": \"\" }";

        // Act
        String jwtToken = testUtils.generateTestJwtToken(1L, "kaiseong");
        ResultActions result = mockMvc.perform(post("/api/v1/applications")
                .header("Authorization", jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(applicationJson));

        // Assert
        result.andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Application created successfully."))
                .andExpect(jsonPath("$.data.jobTitle").value("Software Engineer"))
                .andExpect(jsonPath("$.data.companyName").value("Google"));
    }

    @Test
    public void testDeleteApplication() throws Exception {
        // Arrange
        Long applicationId = 2L;

        // Act
        String jwtToken = testUtils.generateTestJwtToken(1L, "kaiseong");
        ResultActions result = mockMvc.perform(delete("/api/v1/applications/{id}", applicationId)
                .header("Authorization", jwtToken));

        // Assert
        result.andExpect(status().isNoContent());
    }
}
