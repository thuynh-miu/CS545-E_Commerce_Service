package edu.miu.project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false, columnDefinition = "int default 0")
    private Integer quantity = 0;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller; // Reference back to the seller

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private List<Review> reviews; // Reviews for this product

//    @ManyToMany(fetch = FetchType.LAZY)
//    private List<Order> orders; // Orders for this product

    @ManyToMany()
    private List<Category> categories;
}
