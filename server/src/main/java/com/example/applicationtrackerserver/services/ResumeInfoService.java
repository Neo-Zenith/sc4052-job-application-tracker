package com.example.applicationtrackerserver.services;

import com.example.applicationtrackerserver.exceptions.ResumeInfoExceptions.ResumeInfoNotFoundException;
import com.example.applicationtrackerserver.models.ResumeInfo;
import com.example.applicationtrackerserver.repository.ResumeInfoRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResumeInfoService {
    private static final Logger logger = LoggerFactory.getLogger(ResumeInfoService.class);

    @Autowired
    private ResumeInfoRepository resumeInfoRepository;

    public ResumeInfo createResumeInfo(ResumeInfo ResumeInfo) {
        return resumeInfoRepository.save(ResumeInfo);
    }

    public List<ResumeInfo> getAllResumeInfos() {
        return resumeInfoRepository.findAll();
    }

    public ResumeInfo getResumeInfoById(Long id) throws ResumeInfoNotFoundException {
        return resumeInfoRepository.findById(id)
                .orElseThrow(() -> new ResumeInfoNotFoundException("ResumeInfo with ID " + id + " not found"));
    }

    public List<ResumeInfo> getResumeInfoByUserId(Long userId) {
        return resumeInfoRepository.findByUserId(userId);
    }

    public List<ResumeInfo> getResumeInfoByApplicationId(Long applicationId) {
        return resumeInfoRepository.findByApplicationId(applicationId);
    }

    public ResumeInfo updateResumeInfo(ResumeInfo updatedResumeInfo) throws ResumeInfoNotFoundException {
        if (!resumeInfoRepository.existsById(updatedResumeInfo.getId())) {
            throw new ResumeInfoNotFoundException("ResumeInfo with ID " + updatedResumeInfo.getId() + " not found");
        }
        return resumeInfoRepository.save(updatedResumeInfo);
    }

    public void deleteResumeInfo(Long id) {
        resumeInfoRepository.deleteById(id);
    }
}
