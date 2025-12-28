package com.example.authsystembackend.services;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Value("${FROM_EMAIL}")
    private String fromEmail;

    // Inject Base URL to avoid "No Request Context" errors in Async threads
    // Add app.base-url=http://localhost:8080 (or your production domain) to properties
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @Async
    public void sendVerificationEmail(String toEmail, String verificationToken) {
        String subject = "Email Verification";
        String body = "Click the button below to verify your email (valid for 10 minutes):";

        String actionUrl = baseUrl + "/verify-email?token=" + verificationToken;
        sendEmailWithToken(toEmail, subject, body, actionUrl);
    }

    public void sendPasswordResetMail(String email, String resetPasswordCode) {
        String subject = "Password Reset";
        String body = "Click the button below to reset your password:";

        String actionUrl = baseUrl + "/reset-password?token=" + resetPasswordCode;
        sendEmailWithToken(email, subject, body, actionUrl);
    }

    private void sendEmailWithToken(String toEmail, String subject, String body, String actionUrl) {
        try {

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);

            String emailContent = generateAccountCreationHtml(body, actionUrl);

            helper.setText(emailContent, true);

            javaMailSender.send(mimeMessage);

            log.info("Email sent to user: {}", toEmail);

        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", toEmail, e);
        }
    }

    private String generateAccountCreationHtml(String body, String actionUrl) {
        return """
                <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 25px;
                                        border: 1px solid #dcdcdc; border-radius: 8px; background-color: #ffffff;">
                                <div style="text-align: center; padding-bottom: 15px; border-bottom: 2px solid #004080;">
                                    <h2 style="color: #004080; margin: 0;">Action Required</h2>
                                </div>
                                <div style="padding: 20px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                    %s
                                </div>
                                <div style="text-align: center; margin-top: 30px;">
                                    <a href="%s"
                                       style="background-color: #004080; color: #ffffff; padding: 12px 25px;
                                              text-decoration: none; border-radius: 5px; font-size: 16px;">
                                        Verify Email
                                    </a>
                                </div>
                                <div style="margin-top: 20px; padding: 15px; background-color: #f5f8fc;
                                            border-left: 4px solid #004080; border-radius: 4px; font-size: 14px; color: #333;">
                                    <p style="margin: 0;">If you did not request this, please ignore this email.</p>
                                </div>
                                <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #777;">
                                    <p style="margin: 0;">&copy; %d Auth-System. All rights reserved.</p>
                                </div>
                            </div>
                """.formatted(body, actionUrl, java.time.Year.now().getValue());
    }
}
