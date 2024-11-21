package edu.miu.project.service.impl;

import edu.miu.project.entity.*;
import edu.miu.project.entity.dto.UserDto;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.helper.UserHelper;
import edu.miu.project.repo.BuyerRepository;
import edu.miu.project.repo.RoleRepository;
import edu.miu.project.repo.SellerRepository;
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
    @Autowired
    BuyerRepository buyerRepository;
    @Autowired
    SellerRepository sellerRepository;

    @Override
    public List<UserDto> getAllUsers() {
        return listMapper.mapList(userRepository.findAll(), UserDto.class);
    }

    // Approve a seller by Admin
    public String approveSeller(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty())
            return "Error: User not found with ID: " + userId;

        if (user.get().getRoles().stream().anyMatch(role -> role.getRole().equalsIgnoreCase("SELLER"))) {
            User updatedUser = userRepository.save(user.get());
            return "Seller approved: " + updatedUser.getUsername();
        } else {
            return "Error: Can't approve a non-seller user: " + user.get().getUsername();
        }
    }

    public Optional<Buyer> getCurrentBuyer() {
        String userName = UserHelper.getCurrentUserName();
        return buyerRepository.findByEmail(userName);
    }

    public Optional<Seller> getCurrentSeller() {
        String username = UserHelper.getCurrentUserName();
        return sellerRepository.findByEmail(username);
    }

    public Optional<User> getCurrentUser() {
        String username = UserHelper.getCurrentUserName();
        return userRepository.findByEmail(username);
    }

    @Override
    public List<UserDto> getUnapprovedSellers() {
        Optional<List<User>> unapprovedSellers = userRepository.findUnapprovedSellers();
        if (unapprovedSellers.isEmpty())
            throw new RuntimeException("No unapproved sellers found.");

        return listMapper.mapList(unapprovedSellers.get(), UserDto.class);
    }
}
