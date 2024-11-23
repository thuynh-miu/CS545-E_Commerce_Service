package edu.miu.project.service.impl;


import edu.miu.project.entity.*;
import edu.miu.project.entity.dto.OrderDto;
import edu.miu.project.entity.dto.OrderRequest;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.repo.BuyerRepository;
import edu.miu.project.repo.OrderRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.service.CartService;
import edu.miu.project.service.OrderService;
import edu.miu.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    BuyerRepository buyerRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    UserService userService;
    @Autowired
    CartService cartService;

    // Place an order
    public void placeOrder(OrderRequest orderRequest) {
        Optional<Buyer> buyer = userService.getCurrentBuyer();
        if (buyer.isEmpty()) {
            throw new RuntimeException("Buyer not found.");
        }

        // Create an order
        Order order = new Order();
        order.setBuyer(buyer.get());
        order.setStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        orderRequest.getItems().stream().forEach(item -> {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + item.getProductId()));

            if (product.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());

            // Update product quantity
            product.setQuantity(product.getQuantity() - item.getQuantity());
            productRepository.save(product);

            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        });

        order.setSeller(orderItems.get(0).getProduct().getSeller());
        order.setItems(orderItems);
        cartService.emptyCart();
        // Save the order
        orderRepository.save(order);
    }

    // Cancel an order
    public boolean cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Cannot cancel an order that is not pending.");
        }
        // Update status to CANCELED
        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
        return true;
    }

    // Get order history
    public Page<OrderDto> getOrderHistory(Pageable pageable) {
        Optional<Buyer> buyer = userService.getCurrentBuyer();
        if (buyer.isPresent()) {
            var orders = orderRepository.findByBuyer_Id(buyer.get().getId(), pageable);
            return orders.map(order -> modelMapper.map(order, OrderDto.class));
        }
        Optional<Seller> seller = userService.getCurrentSeller();
        if (seller.isPresent()) {
            var orders = orderRepository.findBySeller_Id(seller.get().getId(), pageable);
            return orders.map(order -> modelMapper.map(order, OrderDto.class));
        }
        throw new RuntimeException("Cannot find buyer or seller.");
    }

    // Update order status (Shipped → On the Way → Delivered)
    public OrderDto updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        // Validate status transition
        validateStatusTransition(order.getStatus(), status);

        // Update status
        order.setStatus(status);
        return modelMapper.map(orderRepository.save(order), OrderDto.class);
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public Page<OrderDto> getOrderByStatus(OrderStatus orderStatus, Pageable pageable) {
        Optional<Buyer> buyer = userService.getCurrentBuyer();
        if (buyer.isPresent()) {
            var orders = orderRepository.findByBuyer_IdAndStatus(buyer.get().getId(), orderStatus, pageable);
            return orders.map(order -> modelMapper.map(order, OrderDto.class));
        }
        Optional<Seller> seller = userService.getCurrentSeller();
        if (seller.isPresent()) {
            var orders = orderRepository.findBySeller_IdAndStatus(seller.get().getId(), orderStatus, pageable);
            return orders.map(order -> modelMapper.map(order, OrderDto.class));
        }
        throw new RuntimeException("Cannot find buyer or seller.");
    }

    // Helper to validate status transitions
    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        if (currentStatus == OrderStatus.CANCELED) {
            throw new RuntimeException("Cannot change the status of a canceled order.");
        }
        if (currentStatus == OrderStatus.PENDING && newStatus == OrderStatus.CANCELED) {
            return;
        }
        if ((currentStatus == OrderStatus.PENDING && newStatus != OrderStatus.SHIPPED) ||
                (currentStatus == OrderStatus.SHIPPED && newStatus != OrderStatus.TRANSIT) ||
                (currentStatus == OrderStatus.TRANSIT && newStatus != OrderStatus.DELIVERED)) {
            throw new RuntimeException("Invalid status transition.");
        }
    }
}
