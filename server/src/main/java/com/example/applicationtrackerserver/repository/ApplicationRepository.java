package com.example.applicationtrackerserver.repository;

import org.springframework.stereotype.Repository;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);

    List<Application> findByStatus(String status);

    List<Application> findByUserAndStatus(User user, String status);

    int countByCreatedOnBetween(LocalDateTime startDate, LocalDateTime endDate);
}
