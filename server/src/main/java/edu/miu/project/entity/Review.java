package edu.miu.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id", nullable = false)
    private Buyer buyer; // Reference back to the buyer

    @Column(nullable = false)
    private String comment;

    private int rating; // Example: from 1 to 5
}
