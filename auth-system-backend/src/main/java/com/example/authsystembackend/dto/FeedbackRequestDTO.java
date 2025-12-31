package com.example.authsystembackend.dto;

import lombok.Data;

@Data
public class FeedbackRequestDTO {
    private String feedback;
    private Integer rating;

    public boolean isValidInput() {
        return
                feedback != null &&
                        rating != null &&
                        rating >= 1 &&
                        rating <= 5;
    }

    public boolean isValidLength() {
        return feedback.length() <= 505;
    }
}
