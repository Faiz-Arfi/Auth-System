package com.example.authsystembackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActivityLog {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Enumerated(EnumType.STRING)
    private ActivitySeverity severity;

    @Enumerated(EnumType.STRING)
    private ActivityType type;

    private String description;

    private Date recordedAt;

    public enum ActivitySeverity {
        MODERATE, ATTENTION_REQUIRED, BASIC;
    }

    public enum ActivityType {
        LOGIN, LOGOUT, PASSWORD_CHANGE, PROFILE_UPDATE, ACTIVITY_COMPLETION, ROLE_CHANGE;
    }

}
