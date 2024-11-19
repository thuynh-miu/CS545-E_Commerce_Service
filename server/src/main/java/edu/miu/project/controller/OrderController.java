package edu.miu.project.controller;

import edu.miu.project.entity.Order;
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
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        try {
            Order placedOrder = orderService.placeOrder(order);
            return ResponseEntity.ok(placedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
