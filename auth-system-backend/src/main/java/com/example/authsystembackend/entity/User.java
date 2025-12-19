package com.example.authsystembackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String password;

    @Column(nullable = false)
    private String userName;

    @Column(unique = true, nullable = false)
    private String email;

    private String profilePicture;

    private boolean isEmailVerified;

    private String verificationCode;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Date createdAt;

    private Date previousLogin;

    private Integer noOfLogins;

    private String resetPasswordCode;

    private boolean activity1Status;

    private boolean activity2Status;

    private boolean activity3Status;

    private boolean activity4Status;

    private boolean activity5Status;

    private Integer points;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ActivityLog> activityLogs;
}
