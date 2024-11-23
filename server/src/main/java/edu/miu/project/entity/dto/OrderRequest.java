package edu.miu.project.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    AddressDto address;
    PaymentDto payment;
    List<OrderItemRequest> items;
}
