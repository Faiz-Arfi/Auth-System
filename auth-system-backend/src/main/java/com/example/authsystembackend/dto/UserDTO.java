package com.example.authsystembackend.dto;

import com.example.authsystembackend.entity.AuthInfo;
import com.example.authsystembackend.entity.Role;
import com.example.authsystembackend.entity.AppUser;
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
    private boolean activity1Status;
    private boolean activity2Status;
    private boolean activity3Status;
    private boolean activity4Status;
    private boolean activity5Status;
    private Integer points;
    private AuthInfo authInfo;
    private String role;

    public AppUser toEntity(UserDTO userDTO) {
        return AppUser.builder()
                .id(userDTO.getId())
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .isEmailVerified(userDTO.isEmailVerified())
                .activity1Status(userDTO.isActivity1Status())
                .activity2Status(userDTO.isActivity2Status())
                .activity3Status(userDTO.isActivity3Status())
                .activity4Status(userDTO.isActivity4Status())
                .activity5Status(userDTO.isActivity5Status())
                .points(userDTO.getPoints())
                .role(Role.valueOf(userDTO.getRole()))
                .authInfo(userDTO.getAuthInfo())
                .build();
    }

    public UserDTO toDTO(AppUser user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getUserName())
                .isEmailVerified(user.isEmailVerified())
                .activity1Status(user.isActivity1Status())
                .activity2Status(user.isActivity2Status())
                .activity3Status(user.isActivity3Status())
                .activity4Status(user.isActivity4Status())
                .activity5Status(user.isActivity5Status())
                .points(user.getPoints())
                .authInfo(user.getAuthInfo())
                .role(user.getRole().toString())
                .build();
    }
}
