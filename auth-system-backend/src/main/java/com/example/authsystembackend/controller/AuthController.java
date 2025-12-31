package com.example.authsystembackend.controller;

import com.example.authsystembackend.dto.LoginRequestDTO;
import com.example.authsystembackend.dto.LoginResponseDTO;
import com.example.authsystembackend.dto.RegisterRequestDTO;
import com.example.authsystembackend.dto.UserDTO;
import com.example.authsystembackend.entity.AppUser;
import com.example.authsystembackend.services.AuthService;
import com.example.authsystembackend.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup (@RequestBody RegisterRequestDTO registerRequestDTO, UriComponentsBuilder uriComponentsBuilder) {
        UserDTO savedUser = authService.signup(registerRequestDTO);
        var location = uriComponentsBuilder.path("/user/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(location).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO loginResponseDTO = authService.login(loginRequestDTO);
        ResponseCookie responseCookie = ResponseCookie.from("JWT", loginResponseDTO.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(24 * 60 * 60) //24hr
                .sameSite("strict")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(loginResponseDTO.getUser());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return authService.logout();
    }

    @GetMapping("/get-current-user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("No user logged in");
        }

        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);
        return ResponseEntity.ok(new UserDTO().toDTO(user));
    }

    @PostMapping("/forget-password")
    public String forgetPassword(@RequestParam String email) {
        return authService.forgetPassword(email);
    }

    @PostMapping("/confirm-reset-password")
    public ResponseEntity<?> confirmReset (@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        String message = authService.updatePassword(token, newPassword);
        return ResponseEntity.ok(message);
    }
}
