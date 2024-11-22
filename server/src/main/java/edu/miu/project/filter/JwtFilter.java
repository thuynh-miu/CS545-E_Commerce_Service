package edu.miu.project.filter;

import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

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
        // Get access Token from the request
        String accessToken = request.getHeader("accessToken");
        String refreshToken = request.getHeader("refreshToken");

        return new LoginResponse(accessToken, refreshToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final LoginResponse loginResponse = extractTokenFromRequest(request);
        String accessToken = loginResponse.getAccessToken();
        String refreshToken = loginResponse.getRefreshToken();

        boolean isAccessTokenExpired = jwtUtil.isTokenExpired(accessToken);

        if (isAccessTokenExpired && refreshToken != null && !refreshToken.isEmpty()) {
            // refresh token
            // Generate a new access token using the subject from the refresh token
            final UserDetails userDetails = jwtUtil.extractUserDetails(refreshToken);
            String newAccessToken = jwtUtil.generateToken(userDetails);
            accessToken = newAccessToken;
        }

        if (accessToken != null && !accessToken.isEmpty() && jwtUtil.validateToken(accessToken)) {
            SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(accessToken));
        }
        filterChain.doFilter(request, response);
    }
}
