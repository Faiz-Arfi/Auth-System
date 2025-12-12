package com.example.authsystembackend.services;

import com.example.authsystembackend.entity.Role;
import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User processOAuthPostLogin(String email, String name, String pictureUrl) {
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setProfilePicture(pictureUrl);
            user.setNoOfLogins(user.getNoOfLogins() + 1);
            return userRepo.save(user);
        }
        User newUser = User.builder()
                .email(email)
                .userName(name)
                .profilePicture(pictureUrl)
                .role(Role.NOVICE)
                .isEmailVerified(true)
                .password(passwordEncoder.encode(generateRandomPassword()))
                .points(0)
                .createdAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .activity1Status(false)
                .activity2Status(false)
                .activity3Status(false)
                .activity4Status(false)
                .activity5Status(false)
                .noOfLogins(1)
                .build();
        return userRepo.save(newUser);
    }

    private CharSequence generateRandomPassword() {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < 8; i++) {
            sb.append((char)(Math.random()*26 + 'a'));
        }
        return sb;
    }

    @Transactional
    public ResponseEntity<?> changePassword(String email, String newPassword) {
        User user = getUserByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }
}
