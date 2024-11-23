package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private String cardNumber;
    private String expiryDate;
    private String cvv;
}
