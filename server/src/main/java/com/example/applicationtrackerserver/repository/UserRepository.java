package com.example.applicationtrackerserver.repository;

import org.springframework.stereotype.Repository;

import com.example.applicationtrackerserver.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
