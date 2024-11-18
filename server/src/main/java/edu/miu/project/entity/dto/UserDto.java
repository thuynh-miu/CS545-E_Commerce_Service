package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String role; // e.g., "ADMIN", "SELLER", "BUYER"
}
