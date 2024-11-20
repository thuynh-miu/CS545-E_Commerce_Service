package edu.miu.project.service;

import edu.miu.project.entity.Product;

import java.util.List;

public interface ProductService {
    // Get all products
    List<Product> getAllProducts();
    // Create or update product
    Product createProduct(Product product, Long sellerId);
    // Get all products for a seller
    List<Product> getProductsBySeller(Long sellerId);
    // Delete product if not ordered
    void deleteProduct(Long productId);
    // Update stock quantity
    Product updateStock(Long productId, int quantity);
    // Get product status
    String getProductStatus(Long productId);
}
