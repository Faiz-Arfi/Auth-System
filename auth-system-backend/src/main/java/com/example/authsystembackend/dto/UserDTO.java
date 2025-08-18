package com.example.authsystembackend.dto;

import com.example.authsystembackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String userName;
    private String email;
    private boolean isEmailVerified;

    public User toEntity(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .isEmailVerified(userDTO.isEmailVerified())
                .build();
    }

    public UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getUserName())
                .isEmailVerified(user.isEmailVerified())
                .build();
    }
}
