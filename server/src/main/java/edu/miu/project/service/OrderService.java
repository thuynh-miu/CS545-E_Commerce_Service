package edu.miu.project.service;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;
import edu.miu.project.entity.dto.OrderDto;
import edu.miu.project.entity.dto.OrderRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    // Get order history
    Page<OrderDto> getOrderHistory(Pageable pageable);
    void placeOrder(OrderRequest orderRequest);
    boolean cancelOrder(Long orderId);
    Order updateOrderStatus(Long orderId, OrderStatus status);
}