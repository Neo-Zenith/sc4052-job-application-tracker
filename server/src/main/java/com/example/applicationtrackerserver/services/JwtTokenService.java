package com.example.applicationtrackerserver.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.applicationtrackerserver.models.UserInfoDetails;

import java.util.Date;
import java.util.function.Function;
import java.util.logging.Logger;

@Service
public class JwtTokenService {
    private static final Logger logger = Logger.getLogger(JwtTokenService.class.getName());

    private static final String SECRET = "SC4052_CLOUD_COMPUTING";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public String generateToken(UserInfoDetails userInfoDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        logger.info(
                "Generating token for user: " + userInfoDetails.getUsername() + " with ID: " + userInfoDetails.getId());

        return Jwts.builder()
                .claim("userId", userInfoDetails.getId())
                .setSubject(userInfoDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Long extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", Long.class));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
