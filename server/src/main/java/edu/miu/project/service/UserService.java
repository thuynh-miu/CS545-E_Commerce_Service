package edu.miu.project.service;

import edu.miu.project.entity.Buyer;
import edu.miu.project.entity.Seller;
import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.SellerDto;
import edu.miu.project.entity.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    // Approve a seller by Admin
    String approveSeller(Long userId);

    // Get All Users
    List<UserDto> getAllUsers();

    Optional<Buyer> getCurrentBuyer();

    Optional<Seller> getCurrentSeller();

    Optional<User> getCurrentUser();

    List<SellerDto> getUnapprovedSellers();

    UserDto findByEmail(String email);
}
