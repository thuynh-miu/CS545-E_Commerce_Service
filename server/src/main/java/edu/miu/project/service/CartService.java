package edu.miu.project.service;

import edu.miu.project.entity.Cart;

public interface CartService {
    Cart addToCart(Long buyerId, Long productId, int quantity);
}
