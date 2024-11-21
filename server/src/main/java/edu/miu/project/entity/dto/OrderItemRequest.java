package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private int quantity;
    private Long productId;
}
