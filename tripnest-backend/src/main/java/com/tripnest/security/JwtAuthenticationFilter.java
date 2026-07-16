package com.tripnest.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger =
            LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Value("${tripnest.jwt.header}")
    private String tokenHeader;

    @Value("${tripnest.jwt.prefix}")
    private String tokenPrefix;


    public JwtAuthenticationFilter(
            JwtTokenProvider tokenProvider,
            CustomUserDetailsService customUserDetailsService) {

        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)

            throws ServletException, IOException {


        try {

            System.out.println("========== JWT FILTER ==========");

            String header = request.getHeader(tokenHeader);

            System.out.println("Authorization Header : " + header);


            String jwt = getJwtFromRequest(request);


            if (StringUtils.hasText(jwt)) {

                System.out.println("JWT TOKEN FOUND");


                if (tokenProvider.validateToken(jwt)) {

                    System.out.println("JWT TOKEN VALID");


                    String username =
                            tokenProvider.getUsernameFromJWT(jwt);


                    System.out.println("USERNAME : " + username);


                    UserDetails userDetails =
                            customUserDetailsService
                                    .loadUserByUsername(username);


                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );


                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);


                    System.out.println(
                            "AUTHENTICATION SET SUCCESSFULLY"
                    );

                } else {

                    System.out.println("JWT TOKEN INVALID");

                }

            } else {

                System.out.println("NO JWT TOKEN FOUND");

            }


        } catch (Exception ex) {

            logger.error(
                    "Could not set user authentication in security context",
                    ex
            );

        }


        filterChain.doFilter(request, response);
    }



    private String getJwtFromRequest(HttpServletRequest request) {

        String bearerToken =
                request.getHeader(tokenHeader);


        if (StringUtils.hasText(bearerToken)
                && bearerToken.startsWith(tokenPrefix)) {


            return bearerToken.substring(
                    tokenPrefix.length()
            );
        }


        return null;
    }
}