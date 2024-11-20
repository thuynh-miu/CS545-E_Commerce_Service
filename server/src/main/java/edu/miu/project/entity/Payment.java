package edu.miu.project.entity;

import jakarta.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentType; // "CreditCard", "PayPal", etc.
    private String paymentDetails; // Simplified for demonstration

    @OneToOne
    private Order order;
}