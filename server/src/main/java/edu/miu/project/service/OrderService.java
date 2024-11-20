package edu.miu.project.service;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;

import java.util.List;

public interface OrderService {
    // Get order history
    List<Order> getOrderHistory(Long buyerId);
    Order placeOrder(Long buyerId);
    Order cancelOrder(Long orderId);
    Order updateOrderStatus(Long orderId, OrderStatus status);
}