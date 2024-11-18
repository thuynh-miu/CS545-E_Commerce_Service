package edu.miu.project.entity.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private UserDto buyer; // Nested DTO for the buyer who wrote the review
    private ProductDto product; // Nested DTO for the reviewed product
    private String comment;
    private int rating; // Example: from 1 to 5
}
