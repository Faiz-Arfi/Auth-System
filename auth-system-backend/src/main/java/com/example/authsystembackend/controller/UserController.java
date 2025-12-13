package com.example.authsystembackend.controller;

import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody String oldPassword, String newPassword, String confirmPassword) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Passwords don't match");
        }
        String email = authentication.getName();
        return userService.changePassword(email, newPassword, oldPassword);
    }

    @PutMapping("/edit-profile")
    public ResponseEntity<?> editProfile(Authentication authentication, @RequestBody UserDTO userDTO) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.editProfile(email, userDTO);
    }

    @PutMapping("/reset-account")
    public ResponseEntity<?> resetAccount (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.resetAccount(email);
    }

    @DeleteMapping("/delete-account") 
    public ResponseEntity<?> deleteAccount (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.deleteAccount(email);
    }
}
