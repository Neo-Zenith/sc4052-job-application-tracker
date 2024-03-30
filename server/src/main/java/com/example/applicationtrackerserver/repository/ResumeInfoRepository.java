package com.example.applicationtrackerserver.repository;

import org.springframework.stereotype.Repository;

import com.example.applicationtrackerserver.models.ResumeInfo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ResumeInfoRepository extends JpaRepository<ResumeInfo, Long> {
    List<ResumeInfo> findByUserId(Long userId);

    List<ResumeInfo> findByApplicationId(Long applicationId);

}
