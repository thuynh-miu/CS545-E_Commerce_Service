package edu.miu.project.service;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;

public interface OrderService {
    Order placeOrder(Long buyerId);
    Order cancelOrder(Long orderId);
    Order updateOrderStatus(Long orderId, OrderStatus status);
}