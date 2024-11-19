package edu.miu.project.controller;

import edu.miu.project.service.ReviewService;
import edu.miu.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @Autowired
    UserService userService;
    @Autowired
    ReviewService reviewService;

    // Endpoint to approve a seller
    @PatchMapping("/sellers/{id}/approve")
    public ResponseEntity<?> approveSeller(@PathVariable Long id) {
        String responseMessage = userService.approveSeller(id);
        if (responseMessage.contains("Error")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMessage);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMessage);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok("Review deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
