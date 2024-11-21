package edu.miu.project.service;

import edu.miu.project.entity.dto.LoginRequest;
import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.entity.dto.RefreshTokenRequest;
import edu.miu.project.entity.dto.RegisterRequest;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    boolean registerUser(RegisterRequest loginRequest);
}
