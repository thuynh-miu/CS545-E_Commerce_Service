package edu.miu.project.service;

import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.UserDto;

import java.util.List;

public interface UserService {
    // Register a user (default isApproved = false for sellers)
    String registerUser(User user);

    // Approve a seller by Admin
    String approveSeller(Long userId);

    // Get All Users
    List<UserDto> getAllUsers();
}
