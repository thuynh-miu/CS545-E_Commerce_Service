package edu.miu.project.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private UserDto seller; // Nested DTO for seller information
    private List<ReviewDto> reviews; // List of nested DTOs for reviews
    private List<OrderDto> orders; // List of nested DTOs for orders
    private List<CategoryDto> categories; // List of nested DTOs for categories
}
