package edu.miu.project.service.impl;


import edu.miu.project.entity.*;
import edu.miu.project.repo.CartRepository;
import edu.miu.project.repo.OrderRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CartRepository cartRepository;

    // Place an order
    public Order placeOrder(Long buyerId) {
        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user with ID: " + buyerId));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot place order.");
        }

        Order order = new Order(null,  cart.getBuyer(), cart, null, LocalDateTime.now(), OrderStatus.PENDING);

        // Save the order
        return orderRepository.save(order);
    }

    // Cancel an order
    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        // Update status to CANCELED
        order.setStatus(OrderStatus.CANCELED);
        return orderRepository.save(order);
    }

    // Update order status (Shipped → On the Way → Delivered)
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        // Validate status transition
        validateStatusTransition(order.getStatus(), status);

        // Update status
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Helper to validate status transitions
    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        if (currentStatus == OrderStatus.CANCELED) {
            throw new RuntimeException("Cannot change the status of a canceled order.");
        }

        if ((currentStatus == OrderStatus.PENDING && newStatus != OrderStatus.SHIPPED) ||
                (currentStatus == OrderStatus.SHIPPED && newStatus != OrderStatus.ON_THE_WAY) ||
                (currentStatus == OrderStatus.ON_THE_WAY && newStatus != OrderStatus.DELIVERED)) {
            throw new RuntimeException("Invalid status transition.");
        }
    }
}
