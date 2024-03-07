package com.example.applicationtrackerserver.repository;

import org.springframework.stereotype.Repository;

import com.example.applicationtrackerserver.models.Application;
import com.example.applicationtrackerserver.models.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);
}
