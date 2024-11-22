package edu.miu.project.service;

import edu.miu.project.entity.Product;
import edu.miu.project.entity.Review;
import edu.miu.project.entity.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    // Get all products
    List<Product> getAllProducts();
    // Add Product
    Product addProduct(Product product);
    // Get product by id
    Product getProductById(Long productId);
    // Update product
    Product updateProduct(Long productId, Product product);
    // Create or update product
    Product createProduct(Product product);
    // Get all products for a seller
    List<Product> getProductsBySeller();
    // Delete product if not ordered
    void deleteProduct(Long productId);
    // Update stock quantity
    Product updateStock(Long productId, int quantity);
    // Get product status
    String getProductStatus(Long productId);
    // Update Product imageUrl
    Product updateProductImageUrl(Long productId, String imageUrl);
    // Get Reviews by Product Id
    List<Review> getReviewsByProductId(Long productId);
    // Get Review by Product Id, Review Id
    Review getReviewByProductId(Long productId, Long reviewId);

    List<Product> getBestProducts();

    Page<ProductDto> filterProducts(Double minPrice, Double maxPrice, List<String> colors, List<String> branchs, Pageable pageable);
}
