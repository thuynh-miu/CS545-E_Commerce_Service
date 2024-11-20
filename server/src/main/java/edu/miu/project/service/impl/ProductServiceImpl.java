package edu.miu.project.service.impl;

import edu.miu.project.entity.Product;
import edu.miu.project.entity.Review;
import edu.miu.project.entity.User;
import edu.miu.project.repo.CartRepository;
import edu.miu.project.repo.ProductRepository;
import edu.miu.project.repo.UserRepository;
import edu.miu.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setImageUrl(product.getImageUrl());
        return productRepository.save(existingProduct);
    }

    // Create a product
    public Product createProduct(Product product, Long sellerId) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + sellerId));

        // Check if the user is a seller
        if (seller.getRoles().stream().noneMatch(role -> role.getRole().equalsIgnoreCase("SELLER"))) {
            throw new RuntimeException("Only sellers can add products.");
        }

        // Set the seller to the product
        product.setSeller(seller);
        return productRepository.save(product);
    }

    // Get all products for a seller
    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findBySeller_Id(sellerId);
    }

    // Delete product if not ordered
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        cartRepository.findByItems_Product_Id(productId).ifPresent(p -> {
            throw new RuntimeException("Cannot delete product because it is in a cart.");
        });

        productRepository.delete(product);
    }

    // Update stock quantity
    public Product updateStock(Long productId, int quantity) {
        // Validate that the quantity is not negative
        if (quantity < 0) {
            throw new RuntimeException("Quantity cannot be negative.");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        product.setQuantity(quantity);
        return productRepository.save(product);
    }

    // Get product status
    public String getProductStatus(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        return product.getQuantity() > 0 ? "In Stock" : "Out of Stock";
    }

    // Update Product imageUrl
    public Product updateProductImageUrl(Long productId, String imageUrl) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        product.setImageUrl(imageUrl);
        return productRepository.save(product);
    }

    // Get Reviews by Product Id
    public List<Review> getReviewsByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        return product.getReviews();
    }

    // Get Review by Product Id, Review Id
    public Review getReviewByProductId(Long productId, Long reviewId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        return product.getReviews().stream()
                .filter(review -> review.getId().equals(reviewId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + reviewId));
    }
}
