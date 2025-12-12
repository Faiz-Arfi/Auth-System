package com.example.authsystembackend.controller;

import com.example.authsystembackend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody String oldPassword, String newPassword, String confirmPassword) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Passwords don't match");
        }
        String email = authentication.getName();
        return userService.changePassword(email, newPassword);
    }


}
