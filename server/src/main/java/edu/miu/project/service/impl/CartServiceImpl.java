package edu.miu.project.service.impl;

import edu.miu.project.entity.*;
import edu.miu.project.repo.CartItemRepository;
import edu.miu.project.repo.CartRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.CartService;
import edu.miu.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepository cartRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CartItemRepository cartItemRepository;

    // Get cart by buyer ID
    public Cart getCart() {
        Buyer buyer = userService.getCurrentBuyer()
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Cart cart = cartRepository.findByBuyer_Id(buyer.getId())
                .orElse(null);
        if (cart == null) {
            cart = new Cart(null, new ArrayList<>(), buyer, 0.0);
            cartRepository.save(cart);
        }
        return cart;
    }

    // Add item to cart
    public Cart addToCart(Long productId, int quantity) {
        Buyer buyer = userService.getCurrentBuyer()
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyer.getId())
                .orElse(null);
        if (cart == null) {
            cart = new Cart(null, new ArrayList<>(), buyer, 0.0);
            cartRepository.save(cart);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getItems().stream().filter(
                item -> Objects.equals(item.getProduct().getId(), productId)
        ).findFirst().orElse(null);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setCart(cart);

            cart.getItems().add(cartItem);
        }
        cartItem.setQuantity(quantity);

        // Check if product has enough quantity
        if (product.getQuantity() < quantity) {
            cartItem.setQuantity(product.getQuantity());
        }

        if (cartItem.getQuantity() == 0) {
            cart.getItems().remove(cartItem);
        }

        cartItemRepository.save(cartItem);

        return cartRepository.save(cart);
    }

    // Remove item from cart
    public Cart removeFromCart(Long productId) {
        Buyer buyer = userService.getCurrentBuyer()
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyer.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        cart.getItems().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public void emptyCart() {
        Buyer buyer = userService.getCurrentBuyer()
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyer.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.setItems(new ArrayList<>());
        cartRepository.save(cart);
    }

//    // Update cart item quantity
//    public Cart updateCartItemQuantity(Long productId, int quantity) {
//        Buyer buyer = userService.getCurrentBuyer()
//                .orElseThrow(() -> new RuntimeException("Buyer not found"));
//
//        Cart cart = (Cart) cartRepository.findByBuyer_Id(buyer.getId())
//                .orElseThrow(() -> new RuntimeException("Cart not found"));
//
//        CartItem item = cart.getItems().stream()
//                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Product not found in cart"));
//
//        // Increase product quantity and save
//        Product product = item.getProduct();
//        product.setQuantity(product.getQuantity() + item.getQuantity());
//        productRepository.save(product);
//
//        // Check if product has enough quantity
//        if (product.getQuantity() < quantity) {
//            throw new RuntimeException("Insufficient stock for the product.");
//        }
//
//        // Reduce product quantity and save
//        product.setQuantity(product.getQuantity() - quantity);
//        productRepository.save(product);
//
//        item.setQuantity(quantity);
//        item.setPrice(product.getPrice() * quantity);
//
//        cart.setTotalPrice(cart.getTotalPrice() - item.getPrice() + product.getPrice() * quantity);
//
//        return cartRepository.save(cart);
//    }
}
