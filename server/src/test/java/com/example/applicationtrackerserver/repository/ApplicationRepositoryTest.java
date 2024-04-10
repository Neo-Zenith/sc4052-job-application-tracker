package com.example.applicationtrackerserver.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.applicationtrackerserver.enums.*;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository.DateCount;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class ApplicationRepositoryTest {
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private ApplicationRepository applicationRepository;

        @Test
        public void testFindAll() {
                // Arrange
                User user = new User(1L, "John Doe", "johndoe@test.com", "12345", "USER");
                user = userRepository.save(user);

                Application application1 = new Application(1L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                Application application2 = new Application(2L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
                                "Cover Letter", user,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                applicationRepository.saveAll(List.of(application1, application2));

                // Act
                List<Application> applications = applicationRepository.findAll();

                // Assert
                assertEquals(2, applications.size());
        }

        @Test
        public void testFindByUser() {
                // Arrange
                User user1 = new User(1L, "Smith Doe", "smithdoe@test.com", "12345", "USER");
                user1 = userRepository.save(user1);

                Application application1 = new Application(1L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user1,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());

                User user2 = new User(2L, "John Doe", "johndoe@test.com", "12345", "USER");
                user2 = userRepository.save(user2);
                Application application2 = new Application(2L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
                                "Cover Letter", user2,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                applicationRepository.saveAll(List.of(application1, application2));

                // Act
                List<Application> applicationsTest = applicationRepository.findAll();
                System.out.println("\ntestFindByUser");
                System.out.println(applicationsTest);

                // Act
                List<Application> applications = applicationRepository.findByUser(user1);

                // Assert
                assertEquals(1, applications.size());
                for (Application application : applications) {
                        assertEquals(user1, application.getUser());
                }
        }

        @Test
        public void testFindByStatus() {
                // Arrange
                User user = new User(1L, "Smith Doe", "smithdoe@test.com", "12345", "USER");
                user = userRepository.save(user);
                Application application1 = new Application(1L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                Application application2 = new Application(2L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
                                "Cover Letter", user,
                                ApplicationStatus.INTERVIEW, LocalDateTime.now(), LocalDateTime.now());
                Application application3 = new Application(3L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Civil Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user,
                                ApplicationStatus.INTERVIEW, LocalDateTime.now(), LocalDateTime.now());
                applicationRepository.saveAll(List.of(application1, application2,
                                application3));

                // Act
                List<Application> applications = applicationRepository.findByStatus(ApplicationStatus.INTERVIEW);

                // Assert
                assertEquals(2, applications.size());
                for (Application application : applications) {
                        assertEquals(ApplicationStatus.INTERVIEW, application.getStatus());
                }
        }

        @Test
        public void testFindBYUserAndStatus() {
                // Arrange
                User user1 = new User(1L, "Smith Doe", "smithdoe@test.com", "12345", "USER");
                user1 = userRepository.save(user1);
                Application application1 = new Application(1L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user1,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                Application application2 = new Application(2L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
                                "Cover Letter", user1,
                                ApplicationStatus.INTERVIEW, LocalDateTime.now(), LocalDateTime.now());
                Application application3 = new Application(3L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Civil Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user1,
                                ApplicationStatus.OFFERED, LocalDateTime.now(), LocalDateTime.now());

                User user2 = new User(2L, "John Doe", "john doe@test.com", "12345", "USER");
                user2 = userRepository.save(user2);
                Application application4 = new Application(4L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
                                "Remark", "Cover Letter", user2,
                                ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
                Application application5 = new Application(5L, "https://example.com",
                                "Example Inc.", "https://example.com",
                                "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
                                "Cover Letter", user2,
                                ApplicationStatus.INTERVIEW, LocalDateTime.now(), LocalDateTime.now());
                applicationRepository.saveAll(List.of(application1, application2,
                                application3, application4, application5));

                // Act
                List<Application> applications = applicationRepository.findByUserAndStatus(user2,
                                ApplicationStatus.INTERVIEW);

                // Assert
                assertEquals(1, applications.size());
                for (Application application : applications) {
                        assertEquals(ApplicationStatus.INTERVIEW, application.getStatus());
                        assertEquals(user2, application.getUser());
                }
        }

        // H2 does not support DATE() in SQL
        // @Test
        // public void testCountByCreatedOnBetween() {
        // // Arrange
        // User user = new User(1L, "John Doe", "johndoe@test.com", "12345", "USER");
        // user = userRepository.save(user);
        // Application application1 = new Application(1L, "https://example.com",
        // "Example Inc.", "https://example.com",
        // "Software Engineer", "Job Description", "LinkedIn", JobType.FULL_TIME,
        // "Remark", "Cover Letter", user,
        // ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
        // Application application2 = new Application(2L, "https://example.com",
        // "Example Inc.", "https://example.com",
        // "Lab Engineer", "Job Description", "NodeFlair", JobType.FULL_TIME, "Remark",
        // "Cover Letter", user,
        // ApplicationStatus.APPLIED, LocalDateTime.now(), LocalDateTime.now());
        // applicationRepository.saveAll(List.of(application1, application2));

        // // Act
        // List<DateCount> dateCounts =
        // applicationRepository.countByCreatedOnBetween(user,
        // LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1));

        // // Assert
        // assertEquals(1, dateCounts.size());
        // assertEquals(2, dateCounts.get(0).getCount());
        // }
}
