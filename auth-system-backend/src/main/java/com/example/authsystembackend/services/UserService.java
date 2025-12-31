package com.example.authsystembackend.services;

import com.example.authsystembackend.dto.FeedbackRequestDTO;
import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.entity.*;
import com.example.authsystembackend.repository.ActivityLogRepo;
import com.example.authsystembackend.repository.PromoCodeDetailsRepo;
import com.example.authsystembackend.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final PromoCodeDetailsRepo promoCodeDetailsRepo;
    private final ActivityLogRepo activityLogRepo;
    private final EmailService emailService;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, PromoCodeDetailsRepo promoCodeDetailsRepo, ActivityLogRepo activityLogRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.promoCodeDetailsRepo = promoCodeDetailsRepo;
        this.activityLogRepo = activityLogRepo;
        this.emailService = emailService;
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
            user.getAuthInfo().setPreviousLogin(user.getAuthInfo().getCurrentLogin());
            user.getAuthInfo().setCurrentLogin(new Timestamp(System.currentTimeMillis()));
            user.getAuthInfo().setNoOfLogins(user.getAuthInfo().getNoOfLogins() + 1);

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
                .activity1Status(false)
                .activity2Status(false)
                .activity3Status(false)
                .activity4Status(false)
                .activity5Status(false)
                .build();

        AuthInfo authInfo = AuthInfo.builder()
                .previousLogin(new Timestamp(System.currentTimeMillis()))
                .currentLogin(new Timestamp(System.currentTimeMillis()))
                .noOfLogins(1)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .noOfPasswordChanges(0)
                .noOfProfileUpdates(0)
                .provider(AuthInfo.Provider.GOOGLE)
                .user(newUser)
                .build();
        newUser.setAuthInfo(authInfo);

        return getUser(newUser);
    }

    private User getUser(User user) {
        ActivityLog activityLog = ActivityLog.builder()
                .recordedAt(new Timestamp(System.currentTimeMillis()))
                .type(ActivityLog.ActivityType.LOGIN)
                .severity(ActivityLog.ActivitySeverity.MODERATE)
                .description("Log-in Using Google OAuth")
                .user(user)
                .build();
        if(user.getActivityLogs() == null) user.setActivityLogs(new ArrayList<>());
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
    public ResponseEntity<?> changePassword(String email, String newPassword, String oldPassword) {
        User user = getUserByEmail(email);
        if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect old password");
        }
        if(passwordEncoder.matches(newPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("New password cannot be same as old password");
        }
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
        user.getAuthInfo().setNoOfPasswordChanges(user.getAuthInfo().getNoOfPasswordChanges() + 1);
        if(user.getAuthInfo().getNoOfPasswordChanges() == 1) {
            user.setActivity2Status(true);
            user.setPoints(user.getPoints() + 150);
            ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 2);
            user.getActivityLogs().add(activityLog1);
        }
        userRepo.save(user);
        return ResponseEntity.ok().body(user.getAuthInfo().getNoOfPasswordChanges());
    }

    @Transactional
    public ResponseEntity<?> editProfile(String email, UserDTO userDTO) {
        //check for invalid userName
        if(userDTO.getUserName().isBlank()) {
            return ResponseEntity.badRequest().body("Invalid username");
        }
        User user = getUserByEmail(email);
        if(user.getUserName().equals(userDTO.getUserName())) {
            return ResponseEntity.badRequest().body("Username cannot be same as old username");
        }
        // LOG The activity
        ActivityLog activityLog = ActivityLog.builder()
                .user(user)
                .type(ActivityLog.ActivityType.PROFILE_UPDATE)
                .severity(ActivityLog.ActivitySeverity.MODERATE)
                .description("Profile Updated")
                .recordedAt(new Timestamp(System.currentTimeMillis()))
                .build();
        user.setUserName(userDTO.getUserName());
        user.getActivityLogs().add(activityLog);
        user.getAuthInfo().setNoOfProfileUpdates(user.getAuthInfo().getNoOfProfileUpdates() + 1);
        if(user.getAuthInfo().getNoOfProfileUpdates() == 1) {
            user.setActivity4Status(true);
            user.setPoints(user.getPoints() + 100);
            ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 4);
            user.getActivityLogs().add(activityLog1);
        }
        userRepo.save(user);
        return ResponseEntity.ok().body(user.getAuthInfo().getNoOfProfileUpdates());
    }

    public ResponseEntity<?> resetAccount(String email) {
        User user = getUserByEmail(email);
        // clear all the feilds except username and password
        User newUser = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getUserName())
                .password(user.getPassword())
                .role(Role.NOVICE)
                .isEmailVerified(true)
                .points(0)
                .activity1Status(false)
                .activity2Status(false)
                .activity3Status(false)
                .activity4Status(false)
                .activity5Status(false)
                .activityLogs(new ArrayList<>())
                .build();

        user.getAuthInfo().setNoOfLogins(0);
        user.getAuthInfo().setNoOfPasswordChanges(0);
        user.getAuthInfo().setNoOfProfileUpdates(0);

        userRepo.save(newUser);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> deleteAccount(String email) {
        User user = getUserByEmail(email);
        userRepo.delete(user);
        return ResponseEntity.ok().build();
    }

    private PromoCodeDetails getByPromoCode(String promoCode) {
                return promoCodeDetailsRepo.findByPromoCode(promoCode).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Promo Code not found"));
    }

    public ResponseEntity<?> checkPromo(String promoCode, String role) {
        if (promoCode == null || promoCode.isBlank()) {
            return ResponseEntity.badRequest().body("Promo code is required");
        }
        Role requestedRole = parseRole(role);

        PromoCodeDetails promoCodeDetails = getByPromoCode(promoCode.trim());

        Role promoRole = promoCodeDetails.getRole();
        if (promoRole == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Promo code role is not configured");
        }

        if (promoRole == requestedRole) {
            return ResponseEntity.ok(promoCodeDetails.getDiscount());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Promo Code is not valid for this role");
    }

    private Role parseRole(String role) {
        if (role == null || role.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role is required");
        }
        try {
            return Role.valueOf(role.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
        }
    }

    @Transactional
    public ResponseEntity<?> changePlan(String email, String promoCode, String role) {
        User user = getUserByEmail(email);
        if(user.getRole() == Role.valueOf(role.toUpperCase())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are already on this plan");
        }

        // Check if user current role is already higher than the requested role
        if(user.getRole().compareTo(Role.valueOf(role.toUpperCase())) >= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot downgrade your plan");
        }

        int discount = 0;
        //check if promo code is given or not
        if(!(promoCode == null) && !promoCode.isBlank() ) {
            PromoCodeDetails promoCodeDetails = getByPromoCode(promoCode);
            if(!promoCodeDetails.getRole().toString().equals(role)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Promo Code");
            }
            discount = promoCodeDetails.getDiscount();
        }

        int cost = getPriceForRole(role) - discount;
        if(user.getPoints() < cost) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient points");
        }
        user.setRole(Role.valueOf(role.toUpperCase()));
        user.setPoints(user.getPoints() - cost);
        //log the activity
        ActivityLog activityLog = ActivityLog.builder()
                .user(user)
                .type(ActivityLog.ActivityType.ROLE_CHANGE)
                .severity(ActivityLog.ActivitySeverity.BASIC)
                .description("Changed plan to " + role.toUpperCase())
                .recordedAt(new Timestamp(System.currentTimeMillis()))
                .build();
        user.getActivityLogs().add(activityLog);

        if(user.getRole() == Role.INTERMEDIATE && !user.isActivity1Status()) {
            user.setActivity1Status(true);
            user.setPoints(user.getPoints() + 50);
            ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 1);
            user.getActivityLogs().add(activityLog1);
        }
        userRepo.save(user);
        return ResponseEntity.ok().body(user.getPoints());
    }

    private int getPriceForRole(String role) {
        switch(Role.valueOf(role.toUpperCase())) {
            case NOVICE -> {
                return 0;
            }
            case INTERMEDIATE -> {
                return 100;
            }
            case PRO -> {
                return 200;
            }
            case LEGEND -> {
                return 500;
            }
        }
        return Integer.MAX_VALUE;
    }

    public Page<ActivityLog> getActivityLogOfDate(String email, String date, Pageable p) {
        //check if date is valid
        if(date == null || date.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date is required");
        }

        User user = getUserByEmail(email);
        if((user.getRole() == Role.PRO || user.getRole() == Role.LEGEND) && !user.isActivity3Status()) {
            user.setActivity3Status(true);
            user.setPoints(user.getPoints() + 400);
            ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 3);
            user.getActivityLogs().add(activityLog1);
            userRepo.save(user);
        }

        java.sql.Date sqlDate = java.sql.Date.valueOf(date);

        Date startDay = new Date(sqlDate.getTime());
        Date endDay = new Date(sqlDate.getTime() + 24 * 60 * 60 * 1000);

        return activityLogRepo.findByUserIdAndRecordedAtBetween(user.getId(), startDay, endDay, p);

    }

    public ResponseEntity<String> skipActivity2(String email) {
        User user = getUserByEmail(email);
        if(user.getAuthInfo().getProvider().equals(AuthInfo.Provider.LOCAL)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only OAuth users can skip activity 2");
        }

        if(user.isActivity2Status()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have already completed activity 2");
        }

        user.setActivity2Status(true);
        user.setPoints(user.getPoints() + 150);
        ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 2);
        user.getActivityLogs().add(activityLog1);
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<String> completeActivity5(String email) {
        User user = getUserByEmail(email);
        if(!user.isActivity4Status()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please complete activity 4 first");
        }
        if(user.isActivity5Status()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have already completed activity 5");
        }

        user.setActivity5Status(true);
        user.setPoints(user.getPoints() + 500);
        ActivityLog activityLog1 = ActivityLog.createActivityCompletionLog(user, 5);
        user.getActivityLogs().add(activityLog1);
        userRepo.save(user);
        //send accomplishment email
        emailService.sendAccomplishmentEmail(user.getEmail(), user.getUserName());
        return ResponseEntity.ok().body("Congratulations! You have completed all activities. An accomplishment email has been sent to your registered email address.");
    }

    public ResponseEntity<String> saveFeedback(String email, FeedbackRequestDTO feedbackReq) {
        if(!feedbackReq.isValidInput()) {
            return ResponseEntity.badRequest().body("feedback is either blank or contains invalid characters or rating");
        }
        if(!feedbackReq.isValidLength()) {
            return ResponseEntity.badRequest().body("feedback is too long");
        }

        User user = getUserByEmail(email);

        if(user.getPoints() < 250) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You need at-least 250 points to submit feedback. You have " + user.getPoints() + " points.");
        }
        UserFeedback feedback = UserFeedback.builder()
                .feedback(feedbackReq.getFeedback())
                .rating(feedbackReq.getRating())
                .user(user)
                .build();

        user.getUserFeedbacks().add(feedback);
        user.setPoints(user.getPoints() - 250);
        userRepo.save(user);

        return ResponseEntity.ok().body("Thank you for your valuable feedback!");
    }
}
