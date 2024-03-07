package com.example.applicationtrackerserver.services;

import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.models.User;
import com.example.applicationtrackerserver.models.UserInfoDetails;
import com.example.applicationtrackerserver.repository.UserRepository;

@Service
public class UserInfoDetailsService implements UserDetailsService {
    private static final Logger logger = Logger.getLogger(UserInfoDetailsService.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserInfoDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = userRepository.findByUsername(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }
}
