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

    @Value("${FROM_EMAIL:no-reply@auths.faizarfi.dev}")
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
            <div style="font-family: 'Arial', sans-serif; max-width: 650px; margin: auto; padding: 0; background-color: #f3f4f6;">
                <div style="background: linear-gradient(135deg, #2563eb 0%%, #1d4ed8 100%%); padding: 40px 25px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        &#128274; Action Required
                    </h1>
                    <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 14px;">
                        Please verify your email address
                    </p>
                </div>
                <div style="background-color: #ffffff; padding: 30px 25px; border-left: 4px solid #2563eb; border-right: 4px solid #2563eb;">
                    <div style="color: #374151; font-size: 15px; line-height: 1.8; margin-bottom: 25px;">
                        %s
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="%s"
                           style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%%, #1d4ed8 100%%);
                                  color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px;
                                  font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                            &#9989; Verify Email Address
                        </a>
                    </div>
                    <div style="margin-top: 25px; padding: 18px; background: linear-gradient(to right, #dbeafe, #f3f4f6);
                                border-left: 4px solid #3b82f6; border-radius: 8px; font-size: 14px; color: #1e40af;">
                        <p style="margin: 0; font-weight: 500;">
                            &#128712; <strong>Security Notice:</strong> If you did not request this verification, please ignore this email and your account will remain secure.
                        </p>
                    </div>
                    <div style="margin-top: 25px; padding: 15px; background-color: #f9fafb; border-radius: 8px;
                                border: 1px dashed #d1d5db; text-align: center;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; font-weight: 600;">
                            Link not working?
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #9ca3af; word-break: break-all;">
                            Copy and paste this URL into your browser:<br/>
                            <span style="color: #2563eb;">%s</span>
                        </p>
                    </div>
                </div>
                <div style="background-color: #f9fafb; padding: 20px 25px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">
                        &copy; %d Auth-System. All rights reserved.
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">
                        Secure authentication system built with care &#128155;
                    </p>
                </div>
            </div>
            """.formatted(body, actionUrl, actionUrl, java.time.Year.now().getValue());
    }

    public void sendAccomplishmentEmail(String toEmail, String userName) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Congratulations on Your Achievement!");

            String emailContent = generateAccomplishmentHtml(userName);

            helper.setText(emailContent, true);

            javaMailSender.send(mimeMessage);

            log.info("Accomplishment Email sent to user: {}", toEmail);

        } catch (Exception e) {
            log.error("Failed to send accomplishment email to: {}", toEmail, e);
        }
    }

    private String generateAccomplishmentHtml(String userName) {
        return """
            <div style="font-family: 'Arial', sans-serif; max-width: 650px; margin: auto; padding: 0; background-color: #f3f4f6;">
                <div style="background: linear-gradient(135deg, #2563eb 0%%, #1d4ed8 100%%); padding: 40px 25px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        &#127881; Congratulations %s! &#127881;
                    </h1>
                </div>
                <div style="background-color: #ffffff; padding: 30px 25px; border-left: 4px solid #16a34a; border-right: 4px solid #16a34a;">
                    <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <p style="color: #166534; font-size: 16px; line-height: 1.8; margin: 0; font-weight: 500;">
                            Congrats for exploring the entire site! At the time of development, I wasn't sure if anyone would reach this stage, but if you're reading this, I am more happy than you.
                        </p>
                    </div>
                    <div style="color: #374151; font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
                        <p style="margin: 0 0 15px 0;">
                            I wanted to make this moment special and memorable, so I thought, why not send an accomplishment mail once anyone reaches and completes the last activity—even if it costs me to send a mail.
                        </p>
                        <p style="margin: 0; font-weight: bold; color: #1d4ed8; font-size: 17px;">
                            Mark my words: <span style="color: #16a34a;">You are awesome! &#11088;</span>
                        </p>
                    </div>
                    <div style="background: linear-gradient(to right, #dbeafe, #dcfce7); padding: 20px; border-radius: 8px; text-align: center; margin-top: 25px;">
                        <p style="color: #1e40af; font-size: 16px; margin: 0; font-weight: 600;">
                            Thank you for exploring Auth-System! &#128153;
                        </p>
                    </div>
                    <div style="margin-top: 30px; padding-top: 25px; border-top: 2px dashed #e5e7eb;">
                        <p style="color: #374151; font-size: 15px; margin: 0 0 20px 0; text-align: center; font-weight: 600;">
                            Want to know more about the tech behind this project?
                        </p>
                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <a href="https://www.linkedin.com/in/faiz-arfi/"
                               style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px;
                                      border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;
                                      box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);">
                                &#128279; Read LinkedIn Post
                            </a>
                            <a href="faizarfi.dev/projects/auth-s"
                               style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 24px;
                                      border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;
                                      box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3);">
                                &#128194; View Project Details
                            </a>
                        </div>
                    </div>
                </div>
                <div style="background-color: #f9fafb; padding: 20px 25px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">
                        &copy; %d Auth-System. All rights reserved.
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">
                        Crafted with &#10084;&#65039; for awesome people like you
                    </p>
                </div>
            </div>
            """.formatted(userName, java.time.Year.now().getValue());
    }
}
