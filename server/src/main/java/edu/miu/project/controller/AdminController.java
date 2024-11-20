package edu.miu.project.controller;

import edu.miu.project.service.ReviewService;
import edu.miu.project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Admin Controller", description = "Admin management APIs")
@RequestMapping("/api/v1/admin")
public class AdminController {
    @Autowired
    UserService userService;
    @Autowired
    ReviewService reviewService;

    @PatchMapping("/sellers/{id}/approve")
    @Operation(
            summary = "Approve a seller",
            description = "Approves a seller by their ID and changes their status to approved. Returns a success or error message."
    )
    @Parameter(name = "id", description = "ID of the seller to approve", required = true)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Seller approved successfully",
                    content = @Content(mediaType = "text/plain", schema = @Schema(example = "Seller approved successfully"))),
            @ApiResponse(responseCode = "409", description = "Conflict error if the seller cannot be approved",
                    content = @Content(mediaType = "text/plain", schema = @Schema(example = "Error: Seller approval failed")))
    })
    public ResponseEntity<?> approveSeller(@PathVariable Long id) {
        String responseMessage = userService.approveSeller(id);
        if (responseMessage.contains("Error")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMessage);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMessage);
    }


    @DeleteMapping("/reviews/{reviewId}")
    @Operation(
            summary = "Delete a review",
            description = "Deletes a review by its ID. Returns a success or error message."
    )
    @Parameter(name = "reviewId", description = "ID of the review to delete", required = true)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Review deleted successfully",
                    content = @Content(mediaType = "text/plain", schema = @Schema(example = "Review deleted successfully"))),
            @ApiResponse(responseCode = "400", description = "Bad request error if the review cannot be deleted",
                    content = @Content(mediaType = "text/plain", schema = @Schema(example = "Error: Review deletion failed")))
    })
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok("Review deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
