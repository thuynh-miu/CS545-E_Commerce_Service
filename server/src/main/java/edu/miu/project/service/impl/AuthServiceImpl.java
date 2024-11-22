package edu.miu.project.service.impl;

import edu.miu.project.entity.*;
import edu.miu.project.entity.dto.LoginRequest;
import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.entity.dto.RefreshTokenRequest;
import edu.miu.project.entity.dto.RegisterRequest;
import edu.miu.project.repo.BuyerRepository;
import edu.miu.project.repo.RoleRepository;
import edu.miu.project.repo.SellerRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.AuthService;
import edu.miu.project.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication result = null;
        try {
            result = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(result.getName());

        final String accessToken = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        System.out.println("Access Token: " + accessToken);
        System.out.println("Refresh Token: " + refreshToken);

        return new LoginResponse(accessToken, refreshToken);
    }

    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        // Validate the refresh token
        boolean isRefreshTokenValid = jwtUtil.validateToken(refreshTokenRequest.getRefreshToken());
        if (!isRefreshTokenValid) {
            throw new IllegalArgumentException("Invalid refresh token.");
        }

        // Check if the access token is expired
        boolean isAccessTokenExpired = jwtUtil.isTokenExpired(refreshTokenRequest.getAccessToken());
        if (isAccessTokenExpired) {
            System.out.println("Access token is expired. Generating a new access token.");

            // Generate a new access token using the subject from the refresh token
            final UserDetails userDetails = jwtUtil.extractUserDetails(refreshTokenRequest.getRefreshToken());
            String newAccessToken = jwtUtil.generateToken(userDetails);

            // Optionally, renew the refresh token
            String newRefreshToken = refreshTokenRequest.getRefreshToken(); // Default to the existing refresh token
            if (jwtUtil.isTokenExpired(refreshTokenRequest.getRefreshToken())) {
                newRefreshToken = jwtUtil.generateRefreshToken(userDetails);
                System.out.println("Refresh token has been renewed.");
            }

            // Return the response with the new tokens
            return new LoginResponse(newAccessToken, newRefreshToken);
        } else {
            System.out.println("Access token is not expired. No renewal needed.");
            // Return the current tokens since no renewal is necessary
            return new LoginResponse(refreshTokenRequest.getAccessToken(), refreshTokenRequest.getRefreshToken());
        }
    }

    public boolean registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("User already exists.");
        }

        User user = new User();
        user.setUsername(registerRequest.getUserName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        roleRepository.findByRole(registerRequest.getRole()).ifPresent(user::setRole);

        if (registerRequest.getRole().equals(RoleEnum.BUYER.toString())) {
            Buyer buyer = new Buyer();
            buyer.setUser(user);
            buyerRepository.save(buyer);
        }
        else if (registerRequest.getRole().equals(RoleEnum.SELLER.toString())) {
            Seller seller = new Seller();
            seller.setUser(user);
            sellerRepository.save(seller);
        }
        else {
            throw new IllegalArgumentException("Invalid role.");
        }

        userRepository.save(user);

        return true;
    }
}
