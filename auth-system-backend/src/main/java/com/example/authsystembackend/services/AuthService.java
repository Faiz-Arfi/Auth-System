package com.example.authsystembackend.services;

import com.example.authsystembackend.dto.LoginRequestDTO;
import com.example.authsystembackend.dto.LoginResponseDTO;
import com.example.authsystembackend.dto.RegisterRequestDTO;
import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.entity.ActivityLog;
import com.example.authsystembackend.entity.Role;
import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.jwt.JwtService;
import com.example.authsystembackend.repository.UserRepo;
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
        User user = userRepo.findByEmail(registerRequestDTO.getEmail()).orElse(null);
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
            user = new User();
            user.setEmail(registerRequestDTO.getEmail());
        }
        user.setUserName(registerRequestDTO.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        user.setEmailVerified(false);
        user.setRole(Role.NOVICE);
        user.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        user.setNoOfLogins(0);
        user.setPoints(0);
        user.setPreviousLogin(new java.sql.Timestamp(System.currentTimeMillis()));
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

        User savedUser = userRepo.save(user);
        savedUser.setVerificationCode(jwtService.generateToken(savedUser, Long.parseLong(verificationCodeValidityTime)));
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationCode());
        return new UserDTO().toDTO(userRepo.save(savedUser));
    }

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        if (loginRequestDTO.getEmail() == null || loginRequestDTO.getPassword() == null || loginRequestDTO.getEmail().isBlank() || loginRequestDTO.getPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }

        try {
            User user = userRepo.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password"));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );

            if(!user.isEmailVerified()) {
                user.setVerificationCode(jwtService.generateToken(user, Long.parseLong(verificationCodeValidityTime)));
                userRepo.save(user);
                emailService.sendVerificationEmail(user.getEmail(), user.getVerificationCode());
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Please verify your email");
            }

            if (authentication.isAuthenticated()) {
                user.setNoOfLogins(user.getNoOfLogins() + 1);

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

    public ResponseEntity<String> logout(String email) {

        User user = userRepo.findByEmail(email).orElseThrow();
        user.setPreviousLogin(new java.sql.Timestamp(System.currentTimeMillis()));
        userRepo.save(user);

        ResponseCookie responseCookie = ResponseCookie.from("JWT", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("strict")
                .build();


        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body("Logout successful");
    }
}
