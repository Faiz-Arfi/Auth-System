package com.example.authsystembackend.configuration;

import com.example.authsystembackend.entity.User;
import com.example.authsystembackend.jwt.JwtAuthenticationFilter;
import com.example.authsystembackend.jwt.JwtService;
import com.example.authsystembackend.services.UserDetailsServiceImpl;
import com.example.authsystembackend.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${jwt.access-token-validity-time}")
    private String accessTokenValidityTime;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsServiceImpl userDetailsService;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, UserDetailsServiceImpl userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity, UserService userService, JwtService jwtService) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
                .cors(cors -> cors.configurationSource(configurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/error/**", "/verify-email/**", "/reset-password/**").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler((request, response, authentication) -> {
                            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                            String email = oAuth2User.getAttribute("email");
                            String name = oAuth2User.getAttribute("name");
                            String pictureUrl = oAuth2User.getAttribute("picture");
                            // Map user to the db
                            User user = userService.processOAuthPostLogin(email, name, pictureUrl);

                            // Generate JWT and return cookie
                            String jwt = jwtService.generateToken(user, Integer.parseInt(accessTokenValidityTime));
                            ResponseCookie responseCookie = ResponseCookie.from("JWT", jwt)
                                    .httpOnly(true)
                                    .secure(true)
                                    .path("/")
                                    .maxAge(24 * 60 * 60) //24hr
                                    .sameSite("strict")
                                    .build();
                            response.setHeader("Set-Cookie", responseCookie.toString());

                            // Redirect to frontend
                            response.sendRedirect(frontendUrl+"/user/dashboard");
                        }))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return userDetailsService;
//    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource configurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(frontendUrl, "http://localhost:3000", "http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
