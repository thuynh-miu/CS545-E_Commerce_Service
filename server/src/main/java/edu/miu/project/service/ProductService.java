package edu.miu.project.service;

import edu.miu.project.entity.Product;

import java.util.List;

public interface ProductService {
    // Create or update product
    Product saveProduct(Product product);
    // Get all products for a seller
    List<Product> getProductsBySeller(Long sellerId);
    // Delete product if not ordered
    void deleteProduct(Long productId);
}
