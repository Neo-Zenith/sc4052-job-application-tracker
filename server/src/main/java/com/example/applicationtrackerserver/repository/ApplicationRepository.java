package com.example.applicationtrackerserver.repository;

import org.springframework.stereotype.Repository;

import com.example.applicationtrackerserver.enums.ApplicationStatus;
import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);

    List<Application> findByStatus(ApplicationStatus status);

    List<Application> findByUserAndStatus(User user, ApplicationStatus status);

    public interface DateCount {
        LocalDate getDate();

        long getCount();
    }

    @Query("""
                SELECT DATE(a.createdOn) as date, COUNT(a) as count
                FROM Application a
                WHERE a.createdOn BETWEEN :startDate AND :endDate
                AND a.user = :user
                GROUP BY DATE(a.createdOn)
            """)
    List<DateCount> countByCreatedOnBetween(@Param("user") User user, @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
}
