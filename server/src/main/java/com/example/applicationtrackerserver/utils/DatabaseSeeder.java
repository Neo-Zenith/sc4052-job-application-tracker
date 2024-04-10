package com.example.applicationtrackerserver.utils;

import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.applicationtrackerserver.models.*;
import com.example.applicationtrackerserver.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.core.type.TypeReference;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private static final String DATA_FILE = "data/applications.json";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        boolean isEmpty = userRepository.count() == 0 &&
                applicationRepository.count() == 0;
        if (!isEmpty) {
            logger.info("Database already seeded. Exiting...");
            return;
        }

        logger.info("Seeding database...");

        // Create users
        User user1 = new User("kaiseong", "kaiseong@test.com", passwordEncoder.encode("kaiseong123"));
        User user2 = new User("NeoZenith", "juin.lee@outlook.com", passwordEncoder.encode("NeoZenith123"));
        user1 = userRepository.save(user1);
        user2 = userRepository.save(user2);

        // Load applications from JSON file
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        TypeReference<List<Application>> typeReference = new TypeReference<List<Application>>() {
        };
        InputStream inputStream = new ClassPathResource(DATA_FILE).getInputStream();
        List<Application> applications = mapper.readValue(inputStream, typeReference);

        for (Application application : applications) {
            application.setUser(user1);
            logger.info("Saving application: " + application);
        }
        // Save applications to database
        applicationRepository.saveAll(applications);

        List<Application> user2Applications = mapper.readValue(mapper.writeValueAsString(applications), typeReference);
        for (Application application : user2Applications) {
            application.setId(null);
            application.setUser(user2);
            logger.info("Saving application: " + application);
        }

        // Save user2 applications to database
        applicationRepository.saveAll(user2Applications);

        logger.info("Completed seeding database!");
    }
}