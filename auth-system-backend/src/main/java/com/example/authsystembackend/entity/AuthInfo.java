package com.example.authsystembackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long infoId;

    private Date createdAt;

    private Date previousLogin;

    private Date currentLogin;

    private Integer noOfLogins;

    private Integer noOfPasswordChanges;

    private Integer noOfProfileUpdates;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    public enum Provider {
        LOCAL, GOOGLE, FACEBOOK, GITHUB, LINKEDIN
    }
}
