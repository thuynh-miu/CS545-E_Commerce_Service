package edu.miu.project.service.impl;

import edu.miu.project.entity.*;
import edu.miu.project.entity.dto.SellerDto;
import edu.miu.project.entity.dto.UserDto;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.helper.UserHelper;
import edu.miu.project.repo.BuyerRepository;
import edu.miu.project.repo.RoleRepository;
import edu.miu.project.repo.SellerRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
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
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<UserDto> getAllUsers() {
        return listMapper.mapList(userRepository.findAll(), UserDto.class);
    }

    // Approve a seller by Admin
    public String approveSeller(Long sellerId) {
        Seller seller = sellerRepository.findById(sellerId).orElse(null);
        if (seller == null) {
            return "Error: User not found with ID: " + sellerId;
        }

        seller.setApproved(true);
        sellerRepository.save(seller);
        return "Approved";
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
    public List<SellerDto> getUnapprovedSellers() {
        List<Seller> unapprovedSellers = userRepository.findUnapprovedSellers();
        return listMapper.mapList(unapprovedSellers, SellerDto.class);
    }

    @Override
    public UserDto findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(user -> modelMapper.map(user, UserDto.class))
                .orElse(null);
    }
}
