package com.example.applicationtrackerserver.services;

import com.example.applicationtrackerserver.enums.ApplicationStatus;
import com.example.applicationtrackerserver.exceptions.ApplicationExceptions.ApplicationNotFoundException;
import com.example.applicationtrackerserver.exceptions.UserExceptions.UserNotFoundException;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserService userService;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByUserId(long userId) throws UserNotFoundException {
        User user = userService.getUserById(userId);
        return applicationRepository.findByUser(user);
    }

    public Application getApplicationById(Long id) throws ApplicationNotFoundException {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application wtih ID " + id + " not found"));
    }

    public List<Application> getApplicationsByStatus(ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    public List<Application> getApplicationsByUserIdAndStatus(long userId, ApplicationStatus status)
            throws UserNotFoundException {
        User user = userService.getUserById(userId);
        return applicationRepository.findByUserAndStatus(user, status);
    }

    public List<ApplicationRepository.DateCount> getCountOfApplicationsLast7Days(long userId)
            throws UserNotFoundException {
        User user = userService.getUserById(userId);

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime sevenDaysAgo = currentDateTime.minusDays(7);

        // Initialize a map with all dates of the last 7 days set to 0
        Map<LocalDate, Long> dateCounts = IntStream.range(0, 7)
                .mapToObj(i -> currentDateTime.minusDays(i).toLocalDate())
                .collect(Collectors.toMap(Function.identity(), date -> 0L));

        // Get the counts from the database and update the map
        List<ApplicationRepository.DateCount> dbCounts = applicationRepository.countByCreatedOnBetween(user,
                sevenDaysAgo,
                currentDateTime);
        for (ApplicationRepository.DateCount dbCount : dbCounts) {
            dateCounts.put(dbCount.getDate(), dbCount.getCount());
        }

        // Convert the map to a list of DateCount objects
        List<ApplicationRepository.DateCount> result = new ArrayList<>();
        for (Map.Entry<LocalDate, Long> entry : dateCounts.entrySet()) {
            result.add(new ApplicationRepository.DateCount() {
                @Override
                public LocalDate getDate() {
                    return entry.getKey();
                }

                @Override
                public long getCount() {
                    return entry.getValue();
                }
            });
        }

        return result;
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public Application updateApplication(Application updatedApplication) throws ApplicationNotFoundException {
        if (!applicationRepository.existsById(updatedApplication.getId())) {
            throw new ApplicationNotFoundException("Application wtih ID " + updatedApplication.getId() + " not found");
        }
        return applicationRepository.save(updatedApplication);
    }
}