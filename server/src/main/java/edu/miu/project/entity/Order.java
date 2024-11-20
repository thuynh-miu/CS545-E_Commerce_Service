package edu.miu.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orders") // Use "orders" instead of "order"
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer; // Reference back to the buyer

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Product> products; // Reference back to the product

//    @Column(nullable = false)
//    private int quantity;

//    @OneToOne
//    private Cart cart;

    @OneToOne
    private Address shippingAddress;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // Enum for order status
}

