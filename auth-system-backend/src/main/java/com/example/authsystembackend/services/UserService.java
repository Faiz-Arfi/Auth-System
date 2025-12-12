package com.example.authsystembackend.services;

import com.example.authsystembackend.entity.ActivityLog;
import com.example.authsystembackend.entity.Role;
import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
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

    @Transactional
    public User processOAuthPostLogin(String email, String name, String pictureUrl) {
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setProfilePicture(pictureUrl);
            user.setNoOfLogins(user.getNoOfLogins() + 1);

            //Log the activity
            return getUser(user);
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

        return getUser(newUser);
    }

    private User getUser(User user) {
        ActivityLog activityLog = ActivityLog.builder()
                .recordedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .type(ActivityLog.ActivityType.LOGIN)
                .severity(ActivityLog.ActivitySeverity.MODERATE)
                .description("Log-in Using Google OAuth")
                .user(user)
                .build();
        if(user.getActivityLogs() == null) user.setActivityLogs(new java.util.ArrayList<>());
        user.getActivityLogs().add(activityLog);

        return userRepo.save(user);
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

        //Log the activity
        ActivityLog activityLog = ActivityLog.builder()
                        .user(user)
                                .type(ActivityLog.ActivityType.PASSWORD_CHANGE)
                                        .severity(ActivityLog.ActivitySeverity.ATTENTION_REQUIRED)
                                                .description("Password Changed")
                                                        .recordedAt(new Timestamp(System.currentTimeMillis()))
                                                                .build();
        user.getActivityLogs().add(activityLog);
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }
}
