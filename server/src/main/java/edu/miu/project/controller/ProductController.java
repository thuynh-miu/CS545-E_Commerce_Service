package edu.miu.project.controller;

import edu.miu.project.entity.Product;
import edu.miu.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Get all products by seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySeller(@PathVariable Long sellerId) {
        List<Product> products = productService.getProductsBySeller(sellerId);
        return ResponseEntity.ok(products);
    }

    // Update stock quantity
    @PutMapping("/{productId}/quantity")
    public ResponseEntity<?> updateStock(@PathVariable Long productId, @RequestBody int quantity) {
        try {
            Product updatedProduct = productService.updateStock(productId, quantity);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get product status (Out of Stock or In Stock)
    @GetMapping("/{productId}/status")
    public ResponseEntity<String> getProductStatus(@PathVariable Long productId) {
        try {
            String status = productService.getProductStatus(productId);
            return ResponseEntity.ok(status);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
