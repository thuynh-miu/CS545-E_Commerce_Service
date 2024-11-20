package edu.miu.project.controller;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;
import edu.miu.project.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Operation(
            summary = "Place order",
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
    @PreAuthorize("hasRole('BUYER')")
    @PostMapping("/{buyerId}")
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
    @PreAuthorize("hasRole('BUYER')")
    @GetMapping("/{buyerId}")
    public ResponseEntity<?> getOrderHistory(@PathVariable Long buyerId) {
        try {
            return ResponseEntity.ok(orderService.getOrderHistory(buyerId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Cancel an order",
            description = "Cancels the specified order by order ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Order canceled successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "orderId", description = "ID of the order to cancel", required = true)
    })
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {
            Order canceledOrder = orderService.cancelOrder(orderId);
            return ResponseEntity.ok(canceledOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Update order status",
            description = "Updates the status of the specified order by order ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Order status updated successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "orderId", description = "ID of the order to update", required = true),
            @Parameter(name = "status", description = "New status of the order", required = true)
    })
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        try {
            OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
            Order updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
