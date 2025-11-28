package com.example.authsystembackend.services;

import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
            user.setUserName(name);
            user.setProfilePicture(pictureUrl);
            return userRepo.save(user);
        }
        User newUser = User.builder()
                .email(email)
                .userName(name)
                .profilePicture(pictureUrl)
                .role("USER")
                .password(passwordEncoder.encode("OAUTH2_USER"))
                .build();
        return userRepo.save(newUser);
    }
}
