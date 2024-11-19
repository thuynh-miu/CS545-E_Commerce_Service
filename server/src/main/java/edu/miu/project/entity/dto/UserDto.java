package edu.miu.project.entity.dto;

import edu.miu.project.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private boolean isAprroved;
    private List<Role> roles; // e.g., "ADMIN", "SELLER", "BUYER"
}
