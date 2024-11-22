package edu.miu.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
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

    @Formula("(SELECT COUNT(*) FROM order_item i WHERE i.product_id = id)")
    private Integer soldQuantity = 0;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller; // Reference back to the seller

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private List<Review> reviews; // Reviews for this product

    @ManyToMany(fetch = FetchType.LAZY)
    List<Attribute> attributes;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<CartItem> cartItems;
}
