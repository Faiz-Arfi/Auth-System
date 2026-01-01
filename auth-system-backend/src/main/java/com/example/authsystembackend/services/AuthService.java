package com.example.authsystembackend.services;

import com.example.authsystembackend.dto.LoginRequestDTO;
import com.example.authsystembackend.dto.LoginResponseDTO;
import com.example.authsystembackend.dto.RegisterRequestDTO;
import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.entity.ActivityLog;
import com.example.authsystembackend.entity.AuthInfo;
import com.example.authsystembackend.entity.Role;
import com.example.authsystembackend.entity.AppUser;
import com.example.authsystembackend.jwt.JwtService;
import com.example.authsystembackend.repository.UserRepo;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
public class AuthService {

    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    @Value("${email.verification.validity-time}")
    private String verificationCodeValidityTime;

    @Value("${jwt.access-token-validity-time}")
    private String accessTokenValidityTime;

    public AuthService(UserRepo userRepo, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailService) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public UserDTO signup(RegisterRequestDTO registerRequestDTO) {
        AppUser user = userRepo.findByEmail(registerRequestDTO.getEmail()).orElse(null);
        if (user != null) {
            if (user.isEmailVerified()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
            }
        }
        if(!registerRequestDTO.getPassword().equals(registerRequestDTO.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password didn't match");
        }
        else if(!registerRequestDTO.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must contain at least one lowercase letter, one uppercase letter, and one number");
        }
        else if(registerRequestDTO.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
        else if(!registerRequestDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email format");
        }
        else if(registerRequestDTO.getUserName().length() < 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must be at least 3 characters");
        }
        else if(registerRequestDTO.getUserName().length() > 15) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must be at most 15 characters");
        }

        if (user == null) {
            user = new AppUser();
            user.setEmail(registerRequestDTO.getEmail());
        }
        AuthInfo authInfo = new AuthInfo();
        authInfo.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        authInfo.setNoOfPasswordChanges(0);
        authInfo.setNoOfProfileUpdates(0);
        authInfo.setProvider(AuthInfo.Provider.LOCAL);
        authInfo.setUser(user);
        authInfo.setCurrentLogin(new java.sql.Timestamp(System.currentTimeMillis()));
        authInfo.setPreviousLogin(new java.sql.Timestamp(System.currentTimeMillis()));
        authInfo.setNoOfLogins(0);

        user.setAuthInfo(authInfo);
        user.setUserName(registerRequestDTO.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        user.setEmailVerified(false);
        user.setRole(Role.NOVICE);
        user.setPoints(0);
        user.setActivity1Status(false);
        user.setActivity2Status(false);
        user.setActivity3Status(false);
        user.setActivity4Status(false);
        user.setActivity5Status(false);
        user.setActivityLogs(new ArrayList<>());

        ActivityLog activityLog = ActivityLog.builder()
                        .type(ActivityLog.ActivityType.PROFILE_UPDATE)
                        .severity(ActivityLog.ActivitySeverity.BASIC)
                        .description("Account Created")
                        .recordedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                        .user(user)
                        .build();
        user.getActivityLogs().add(activityLog);

        AppUser savedUser = userRepo.save(user);
        savedUser.setVerificationCode(jwtService.generateToken(savedUser, Long.parseLong(verificationCodeValidityTime)));
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationCode());
        return new UserDTO().toDTO(userRepo.save(savedUser));
    }

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        if (loginRequestDTO.getEmail() == null || loginRequestDTO.getPassword() == null || loginRequestDTO.getEmail().isBlank() || loginRequestDTO.getPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }

        try {
            AppUser user = userRepo.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password"));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );

            if(!user.isEmailVerified()) {
                //check if verification code is expired
                String oldVerificationCode = user.getVerificationCode();
                if(oldVerificationCode != null && !oldVerificationCode.isBlank()) {
                    try {
                        if(jwtService.isTokenValid(oldVerificationCode, user)) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email verification link has already been sent. Please check your spam folder if it is not there.");
                        }
                    } catch (ExpiredJwtException e) {
                        user.setVerificationCode(jwtService.generateToken(user, Long.parseLong(verificationCodeValidityTime)));
                        userRepo.save(user);
                        emailService.sendVerificationEmail(user.getEmail(), user.getVerificationCode());
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not verified. Please check your email for verification link.");
                    }
                }
                user.setVerificationCode(jwtService.generateToken(user, Long.parseLong(verificationCodeValidityTime)));
                userRepo.save(user);
                emailService.sendVerificationEmail(user.getEmail(), user.getVerificationCode());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not verified. Please check your email for verification link.");
            }

            if (authentication.isAuthenticated()) {
                user.getAuthInfo().setNoOfLogins(user.getAuthInfo().getNoOfLogins() + 1);
                user.getAuthInfo().setPreviousLogin(user.getAuthInfo().getCurrentLogin());
                user.getAuthInfo().setCurrentLogin(new java.sql.Timestamp(System.currentTimeMillis()));
                //Log in activity
                ActivityLog activityLog = ActivityLog.builder()
                        .type(ActivityLog.ActivityType.LOGIN)
                        .severity(ActivityLog.ActivitySeverity.MODERATE)
                        .description("User logged in")
                        .recordedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                        .user(user)
                        .build();
                user.getActivityLogs().add(activityLog);

                userRepo.save(user);
                //generate accessToken
                return LoginResponseDTO.builder()
                        .accessToken(jwtService.generateToken(user, Long.parseLong(accessTokenValidityTime)))
                        .user(new UserDTO().toDTO(user))
                        .build();
            }

            return null;
        } catch (ResponseStatusException e) {
            throw e;
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while logging in");
        }
    }

    public ResponseEntity<String> logout() {

        ResponseCookie responseCookie = ResponseCookie.from("JWT", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();


        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body("Logout successful");
    }

    public String forgetPassword(String email) {
        AppUser user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if(user.getResetPasswordCode() != null && !user.getResetPasswordCode().isBlank()) {
            try {
                if(jwtService.isTokenValid(user.getResetPasswordCode(), user)) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A password reset link has already been sent to your email. Please check your spam folder if it is not there.");
                }
            } catch (ExpiredJwtException e) {
                user.setResetPasswordCode(jwtService.generateToken(user, Long.parseLong(verificationCodeValidityTime)));
                emailService.sendPasswordResetMail(user.getEmail(), user.getResetPasswordCode());
                userRepo.save(user);
                return "If that email exists in our system, you will receive a link.";
            }
        }
        user.setResetPasswordCode(jwtService.generateToken(user, Long.parseLong(verificationCodeValidityTime)));
        emailService.sendPasswordResetMail(user.getEmail(), user.getResetPasswordCode());
        userRepo.save(user);
        return "If that email exists in our system, you will receive a link.";
    }

    public String updatePassword(String token, String newPassword) {
        String email = jwtService.extractEmail(token);
        AppUser user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!user.getResetPasswordCode().equals(token)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid token");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordCode(null);
        //log the activity
        ActivityLog resetActivity = ActivityLog.builder()
                .description("Password reset via email verification")
                .recordedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .severity(ActivityLog.ActivitySeverity.ATTENTION_REQUIRED)
                .type(ActivityLog.ActivityType.PASSWORD_CHANGE)
                .user(user)
                .build();
        user.getActivityLogs().add(resetActivity);
        userRepo.save(user);
        return "Password updated successfully.";
    }

    public ResponseEntity<String> setAuthCookie(String token) {
        // Verify token is valid before setting cookie
        try {
            String email = jwtService.extractEmail(token);
            AppUser user = userRepo.findByEmail(email).orElse(null);

            if (!jwtService.isTokenValid(token, user)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            ResponseCookie responseCookie = ResponseCookie.from("JWT", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("None")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                    .body("Cookie set successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}
