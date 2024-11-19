package edu.miu.project.service.impl;


import edu.miu.project.entity.Order;
import edu.miu.project.entity.Product;
import edu.miu.project.entity.User;
import edu.miu.project.repo.OrderRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ProductRepository productRepository;

    // Place an order
    public Order placeOrder(Order order) {
        User buyer = order.getBuyer();
        Product product = order.getProduct();
        int orderQuantity = order.getQuantity();

        // Check if the buyer is a seller
        boolean isSeller = buyer.getRoles().stream()
                .anyMatch(role -> role.getRole().equalsIgnoreCase("SELLER"));

        if (isSeller) {
            throw new RuntimeException("Sellers cannot purchase products.");
        }

        // Check if product has enough quantity
        if (product.getQuantity() < orderQuantity) {
            throw new RuntimeException("Insufficient stock for the product.");
        }

        // Reduce product quantity and save
        product.setQuantity(product.getQuantity() - orderQuantity);
        productRepository.save(product);

        // Save the order
        return orderRepository.save(order);
    }
}
