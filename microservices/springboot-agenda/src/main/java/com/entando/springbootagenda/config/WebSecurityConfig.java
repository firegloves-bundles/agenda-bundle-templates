package com.entando.springbootagenda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class WebSecurityConfig {

    public static final String ADMIN = "admin";
    public static final String USER = "user";
    private final JwtAuthConverter jwtAuthConverter;

    public WebSecurityConfig(JwtAuthConverter jwtAuthConverter) {
        this.jwtAuthConverter = jwtAuthConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors
                        .disable())
                . authorizeHttpRequests((authorize) -> authorize
                                .requestMatchers(HttpMethod.GET, "/api/anonymous").permitAll()

//                .requestMatchers(HttpMethod.GET, "/api/contacts").hasRole(ADMIN)
//                .requestMatchers(HttpMethod.GET, "/api/user").hasAnyRole(ADMIN, USER)

                                .requestMatchers(HttpMethod.GET, "/api/contacts").authenticated()
                                .anyRequest()
                                .authenticated()
                );

        http.oauth2ResourceServer((oauth2) ->
                oauth2.jwt((jwt) ->
                        jwt.jwtAuthenticationConverter(jwtAuthConverter)));
        http.sessionManagement((session) ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

}
