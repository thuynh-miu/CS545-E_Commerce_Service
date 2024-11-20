package edu.miu.project.service;

import edu.miu.project.entity.Cart;

public interface CartService {
    Cart getCart(Long buyerId);
    Cart addToCart(Long buyerId, Long productId, int quantity);
    Cart removeFromCart(Long buyerId, Long productId);
    Cart updateCartItemQuantity(Long buyerId, Long productId, int quantity);
}
