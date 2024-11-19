package edu.miu.project.service.impl;

import edu.miu.project.entity.Review;
import edu.miu.project.repo.ReviewRepository;
import edu.miu.project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + reviewId));
        reviewRepository.delete(review);
    }
}
