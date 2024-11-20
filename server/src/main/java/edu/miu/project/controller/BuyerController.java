package edu.miu.project.controller;

import edu.miu.project.entity.Order;
import edu.miu.project.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/buyers")
public class BuyerController {

    @Autowired
    OrderService orderService;

    @Operation(
            summary = "Place an order",
            description = "Places an order for the specified buyer ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Order placed successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "buyerId", description = "ID of the buyer placing the order", required = true)
    })
    @PostMapping("/{buyerId}/order")
    public ResponseEntity<?> placeOrder(@PathVariable Long buyerId) {
        try {
            Order placedOrder = orderService.placeOrder(buyerId);
            return ResponseEntity.ok(placedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Check order history",
            description = "Retrieves the order history for the specified buyer ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Order history retrieved successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "buyerId", description = "ID of the buyer to retrieve order history", required = true)
    })
    @GetMapping("/{buyerId}/order")
    public ResponseEntity<?> getOrderHistory(@PathVariable Long buyerId) {
        try {
            return ResponseEntity.ok(orderService.getOrderHistory(buyerId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
