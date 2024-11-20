package edu.miu.project.controller;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;
import edu.miu.project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PreAuthorize("hasRole('BUYER')")
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestParam Long buyerId) {
        try {
            Order placedOrder = orderService.placeOrder(buyerId);
            return ResponseEntity.ok(placedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Cancel an order
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

    // Update order status
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
