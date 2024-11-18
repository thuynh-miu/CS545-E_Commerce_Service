package edu.miu.project.service;

import edu.miu.project.entity.dto.LoginRequest;
import edu.miu.project.entity.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
