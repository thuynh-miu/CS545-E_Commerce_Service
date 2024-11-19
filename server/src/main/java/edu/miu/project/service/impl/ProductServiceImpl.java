package edu.miu.project.service.impl;

import edu.miu.project.entity.Product;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    // Create or update product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Get all products for a seller
    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.getSeller().getId().equals(sellerId))
                .toList();
    }

    // Delete product if not ordered
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        if (product.getOrders() != null && !product.getOrders().isEmpty()) {
            throw new RuntimeException("Cannot delete product because it has been purchased.");
        }

        productRepository.delete(product);
    }
}
