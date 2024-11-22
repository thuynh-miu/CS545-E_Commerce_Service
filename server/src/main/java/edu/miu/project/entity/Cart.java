package edu.miu.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CartItem> items;

    @OneToOne
    private Buyer buyer;

    @Transient
    private double totalPrice;

    @PostLoad
    private void onLoad() {
        this.totalPrice = items.stream().map(CartItem::getSubTotal).reduce(0.0, Double::sum);
    }
}

