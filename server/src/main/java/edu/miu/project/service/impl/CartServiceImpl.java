package edu.miu.project.service.impl;

import edu.miu.project.entity.Cart;
import edu.miu.project.entity.CartItem;
import edu.miu.project.entity.Product;
import edu.miu.project.entity.User;
import edu.miu.project.repo.CartRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepository cartRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;

    // Add item to cart
    public Cart addToCart(Long buyerId, Long productId, int quantity) {
        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyerId)
                .orElseGet(() -> new Cart(null, new ArrayList<>(), buyer, 0.0));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if the buyer is a seller
        boolean isSeller = buyer.getRoles().stream()
                .anyMatch(role -> role.getRole().equalsIgnoreCase("SELLER"));

        if (isSeller) {
            throw new RuntimeException("Sellers cannot purchase products.");
        }

        // Check if product has enough quantity
        if (product.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for the product.");
        }

        // Reduce product quantity and save
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        CartItem item = new CartItem(null, product, quantity, product.getPrice() * quantity);
        cart.getItems().add(item);
        cart.setTotalPrice(cart.getTotalPrice() + item.getPrice());

        return cartRepository.save(cart);
    }
}
