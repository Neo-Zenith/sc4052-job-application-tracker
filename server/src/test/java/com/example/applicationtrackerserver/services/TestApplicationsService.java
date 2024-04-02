package com.example.applicationtrackerserver.services;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.applicationtrackerserver.config.TestConfig;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.repository.ApplicationRepository;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestConfig.class, ApplicationService.class })
public class TestApplicationsService {

    @Autowired
    private ApplicationService applicationService;

    // Dependency for the ApplicationService
    @MockBean
    private UserService userService;

    @MockBean
    private ApplicationRepository applicationRepository;

    @Before
    public void setUp() {
        Application application = new Application();
        application.setId(1L);
        application.setJobTitle("Test Job Title");
        application.setApplicationUrl("http://test.com");
        application.setCompanyName("Test Company");

        List<Application> applications = new ArrayList<>();
        applications.add(application);

        Mockito.when(applicationRepository.findAll())
                .thenReturn(applications);
    }

    @Test
    public void whenGetAllApplications_thenReturnsList() {
        List<Application> result = applicationService.getAllApplications();

        Assert.assertEquals(1, result.size());
        Assert.assertEquals("Test Job Title", result.get(0).getJobTitle());
    }
}