package edu.miu.project.entity;

public enum OrderStatus {
    PENDING, // Default
    CANCELED, // By seller
    SHIPPED, // Seller ships the product
    TRANSIT, // Product is on the way
    DELIVERED // Delivered to the buyer
}
