package edu.miu.project.service.impl;

import edu.miu.project.entity.Role;
import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.UserDto;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.repo.RoleRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    ListMapper listMapper;

    @Override
    public List<UserDto> getAllUsers() {
        return listMapper.mapList(userRepository.findAll(), UserDto.class);
    }

    // Register a user (default isApproved = false for sellers)
    public String registerUser(User user) {
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Error: Username already exists: " + user.getUsername();
        }

        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Error: Email already exists: " + user.getEmail();
        }

        // Map role names to Role entities
        List<Role> roles = user.getRoles().stream()
                .map(roleName -> roleRepository.findByRole(roleName.getRole())
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                .collect(Collectors.toList());
        user.setRoles(roles);
        user.setApproved(false); // Default for sellers
        user.setPassword(passwordEncoder.encode("123"));
        userRepository.save(user);
        // Return a success message
        return "User registered successfully.";
    }

    // Approve a seller by Admin
    public String approveSeller(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty())
            return "Error: User not found with ID: " + userId;

        if (user.get().getRoles().stream().anyMatch(role -> role.getRole().equalsIgnoreCase("SELLER"))) {
            user.get().setApproved(true);
            User updatedUser = userRepository.save(user.get());
            return "Seller approved: " + updatedUser.getUsername();
        } else {
            return "Error: Can't approve a non-seller user: " + user.get().getUsername();
        }
    }
}
