package edu.miu.project.entity.dto;

import edu.miu.project.entity.Attribute;
import lombok.Data;

import java.util.List;

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
    private String brand;
    private List<Attribute> attributes;
}
