package edu.miu.project.entity.dto;

import edu.miu.project.entity.Product;
import lombok.Data;

@Data
public class CartItemDto {
    private Long id;
    private ProductDto product;
    private int quantity;
    private double subTotal;
}
