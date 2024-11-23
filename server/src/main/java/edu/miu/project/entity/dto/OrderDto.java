package edu.miu.project.entity.dto;

import edu.miu.project.entity.*;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;

    private BuyerDto buyer; // Reference back to the buyer
    private SellerDto seller; // Reference back to the buyer

    private LocalDateTime orderDate;
    private LocalDateTime updateDate;

    private OrderStatus status; // Enum for order status

    private List<OrderItemDto> items;
    private AddressDto address;
    private PaymentDto payment;
}

