package com.example.authsystembackend.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendVerificationEmail(String toEmail, String verificationToken) {
        String subject = "Email Verification";
        String body = "Click the button below to verify your email (valid for 10 minutes):";
        String path = "/verify-email";
        sendEmailWithToken(toEmail, subject, body, path, verificationToken);
    }


    private void sendEmailWithToken(String toEmail, String subject, String body, String path, String token) {
        try {
            String actionUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(path)
                    .queryParam("token", token)
                    .toUriString();

            String emailContent = """
                <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 25px;\s
                            border: 1px solid #dcdcdc; border-radius: 8px; background-color: #ffffff;">
                   \s
                    <div style="text-align: center; padding-bottom: 15px; border-bottom: 2px solid #004080;">
                        <h2 style="color: #004080; margin: 0;">Action Required</h2>
                    </div>
                   \s
                    <div style="padding: 20px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                        %s
                    </div>
                   \s
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="%s"\s
                           style="background-color: #004080; color: #ffffff; padding: 12px 25px;\s
                                  text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Verify Email
                        </a>
                    </div>
                   \s
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f8fc;\s
                                border-left: 4px solid #004080; border-radius: 4px; font-size: 14px; color: #333;">
                        <p style="margin: 0;">If you did not request this, please ignore this email.</p>
                    </div>
                   \s
                    <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #777;">
                        <p style="margin: 0;">&copy; %d Auth-System. All rights reserved.</p>
                    </div>
                </div>
               \s""".formatted(body, actionUrl, java.time.Year.now().getValue());
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(emailContent, true);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
