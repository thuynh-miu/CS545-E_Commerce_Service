package edu.miu.project.service;

import edu.miu.project.entity.Cart;

public interface CartService {
    Cart getCart();
    Cart addToCart(Long productId, int quantity);
    Cart removeFromCart(Long productId);
//    Cart updateCartItemQuantity(Long productId, int quantity);
}
