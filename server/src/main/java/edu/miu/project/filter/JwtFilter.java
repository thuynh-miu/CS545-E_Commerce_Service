package edu.miu.project.filter;

import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;


    @Autowired
    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    public LoginResponse extractTokenFromRequest(HttpServletRequest request) {
        // Get all cookies from the request
        Cookie[] cookies = request.getCookies();

        String accessToken = "";
        String refreshToken = "";
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                // Check for the cookie named "token" (or any name you use)
                if ("accessToken".equals(cookie.getName())) {
                    accessToken = cookie.getValue();
                }
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        return new LoginResponse(accessToken, refreshToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final LoginResponse loginResponse = extractTokenFromRequest(request);
        String accessToken = loginResponse.getAccessToken();
        String refreshToken = loginResponse.getRefreshToken();

        boolean isAccessTokenExpired = jwtUtil.isTokenExpired(accessToken);
        if (isAccessTokenExpired && !refreshToken.isEmpty()) {
            // refresh token
            // Generate a new access token using the subject from the refresh token
            final UserDetails userDetails = jwtUtil.extractUserDetails(refreshToken);
            String newAccessToken = jwtUtil.generateToken(userDetails);
            accessToken = newAccessToken;
            response.addCookie(new Cookie("accessToken", newAccessToken));
        }

        if (!accessToken.isEmpty() && jwtUtil.validateToken(accessToken)) {
            SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(accessToken));
        }
        filterChain.doFilter(request, response);
    }
}
