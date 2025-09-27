package com.example.authsystembackend.controller;

import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.jwt.JwtService;
import com.example.authsystembackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class VerificationController {

    private final JwtService jwtService;
    private final UserRepo userRepo;
    @Value( "${frontend.url}")
    private String frontEndUrl;

    public VerificationController(JwtService jwtService, UserRepo userRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        String email = jwtService.extractEmail(token);
        User user = userRepo.findByEmail(email).orElse(null);

        if(user == null || user.getVerificationCode() == null || !user.getVerificationCode().equals(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid token");
        }

        user.setEmailVerified(true);
        user.setVerificationCode(null);
        userRepo.save(user);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(frontEndUrl + "/login?verified=true"))
                .build();
    }
}
