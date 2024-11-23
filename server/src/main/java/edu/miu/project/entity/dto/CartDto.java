package edu.miu.project.entity.dto;
import lombok.Data;
import java.util.List;
@Data
public class CartDto {
    private Long id;
    private List<CartItemDto> cartItems;
    private double totalPrice;
}