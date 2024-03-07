package com.example.applicationtrackerserver.services;

import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService {
    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(User updatedUser) throws RuntimeException {
        Optional<User> existingUser = userRepository.findById(updatedUser.getId());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setUsername(user.getUsername());
            user.setEmail(user.getEmail());
            user.setPassword(user.getPassword());
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
