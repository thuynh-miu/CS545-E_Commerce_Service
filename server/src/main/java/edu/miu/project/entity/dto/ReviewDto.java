package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private BuyerDto buyer; // Nested DTO for the buyer who wrote the review
    private String comment;
    private int rating; // Example: from 1 to 5
}
