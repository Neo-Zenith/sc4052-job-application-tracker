package com.example.applicationtrackerserver.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TestUtils {

    @Value("${JWT_SECRET}")
    private String JWT_SECRET;

    public String generateTestJwtToken(Long userid, String username) {
        String jws = Jwts.builder()
                .claim("userId", userid)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();

        return "Bearer " + jws;
    }
}