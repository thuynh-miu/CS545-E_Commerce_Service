package edu.miu.project.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDetailDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private int soldQuantity;
    private String imageUrl;
    List<ReviewDto> reviews;
    private String brand;
}
