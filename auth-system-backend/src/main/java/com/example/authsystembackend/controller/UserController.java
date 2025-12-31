package com.example.authsystembackend.controller;

import com.example.authsystembackend.dto.FeedbackRequestDTO;
import com.example.authsystembackend.dto.PasswordChangeDTO;
import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.entity.ActivityLog;
import com.example.authsystembackend.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('INTERMEDIATE','PRO','LEGEND')")
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords don't match");
        }
        String email = authentication.getName();
        return userService.changePassword(email, passwordChangeDTO.getNewPassword(), passwordChangeDTO.getOldPassword());
    }

    @PreAuthorize("hasRole('LEGEND')")
    @PutMapping("/edit-profile")
    public ResponseEntity<?> editProfile(Authentication authentication, @RequestBody UserDTO userDTO) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.editProfile(email, userDTO);
    }

    @PreAuthorize("hasRole('LEGEND')")
    @PutMapping("/reset-account")
    public ResponseEntity<?> resetAccount (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.resetAccount(email);
    }

    @PreAuthorize("hasRole('LEGEND')")
    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }
        String email = authentication.getName();
        return userService.deleteAccount(email);
    }

    @GetMapping("/check-promo")
    public ResponseEntity<?> checkPromo (@RequestParam String promoCode, @RequestParam String role) {
        return userService.checkPromo(promoCode, role);
    }

    @PostMapping("/change-plan")
    public ResponseEntity<?> changePlan (Authentication authentication, @RequestParam String promoCode, @RequestParam String role) {
        if(authentication == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Session expired. Please login again");
        }
        String email = authentication.getName();
        return userService.changePlan(email, promoCode, role);
    }

    @PreAuthorize("hasAnyRole('PRO','LEGEND')")
    @GetMapping("/get-activity-log")
    public ResponseEntity<Page<ActivityLog>> getActivityLogOfDate (Authentication authentication, @RequestParam String date, Pageable p) {
        if(authentication == null) {
            return ResponseEntity.badRequest().build();
        }
        String email = authentication.getName();
        Page<ActivityLog> activityLogs = userService.getActivityLogOfDate(email, date, p);
        return ResponseEntity.ok(activityLogs);
    }

    @PreAuthorize("hasAnyRole('INTERMEDIATE','PRO','LEGEND')")
    @PutMapping("/skip-activity-2")
    public ResponseEntity<String> skipActivity2 (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Session expired. Please login again");
        }
        String email = authentication.getName();
        return userService.skipActivity2(email);
    }

    @PreAuthorize("hasRole('LEGEND')")
    @PostMapping("/complete-activity-5")
    public ResponseEntity<String> completeActivity5 (Authentication authentication) {
        if(authentication == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Session expired. Please login again");
        }
        String email = authentication.getName();
        return userService.completeActivity5(email);
    }

    @PreAuthorize("hasRole('LEGEND')")
    @PostMapping("/submit-feedback")
    public ResponseEntity<String> submitFeedback(Authentication authentication, @RequestBody FeedbackRequestDTO feedbackReq) {
        if(authentication == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Session expired. Please login again");
        }
        String email = authentication.getName();
        return userService.saveFeedback(email, feedbackReq);
    }
}
