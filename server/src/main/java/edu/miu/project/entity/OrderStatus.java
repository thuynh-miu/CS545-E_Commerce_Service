package edu.miu.project.entity;

public enum OrderStatus {
    PENDING, // Default
    CANCELED, // By seller
    SHIPPED, // Seller ships the product
    ON_THE_WAY, // Product is on the way
    DELIVERED // Delivered to the buyer
}
