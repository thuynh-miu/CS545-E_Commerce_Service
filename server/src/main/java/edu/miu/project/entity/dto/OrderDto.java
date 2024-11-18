package edu.miu.project.entity.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderDto {
    private Long id;
    private UserDto buyer; // Nested DTO for buyer information
    private ProductDto product; // Nested DTO for product information
    private int quantity;
    private LocalDateTime orderDate;
}

