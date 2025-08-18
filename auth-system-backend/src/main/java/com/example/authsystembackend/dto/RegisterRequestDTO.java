package com.example.authsystembackend.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String userName;
    private String email;
    private String password;
    private String confirmPassword;
}
