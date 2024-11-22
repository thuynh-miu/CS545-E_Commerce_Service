package edu.miu.project.entity.dto.request;

import lombok.Data;

@Data
public class PostReviewRequest {
    private String title;
    private String comment;
    private int rating;
}
