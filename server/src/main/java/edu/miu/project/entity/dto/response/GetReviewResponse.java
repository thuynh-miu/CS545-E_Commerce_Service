package edu.miu.project.entity.dto.response;

import lombok.Data;

@Data
public class GetReviewResponse {
    private Long id;
    private String title;
    private String comment;
    private int rating; // Example: from 1 to 5
}
