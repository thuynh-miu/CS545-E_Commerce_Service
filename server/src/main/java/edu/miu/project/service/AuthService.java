package edu.miu.project.service;

import edu.miu.project.entity.dtos.LoginRequest;
import edu.miu.project.entity.dtos.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
