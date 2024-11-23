package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private int soldQuantity;
    private String imageUrl;
    private double rating;
}
