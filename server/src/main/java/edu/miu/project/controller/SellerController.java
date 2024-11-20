package edu.miu.project.controller;

import edu.miu.project.entity.Product;
import edu.miu.project.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sellers")
public class SellerController {
    @Autowired
    ProductService productService;

    @Operation(
            summary = "Create product",
            description = "Creates a product for the specified seller ID.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Product created successfully"),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request")
            }
    )
    @Parameters({
            @io.swagger.v3.oas.annotations.Parameter(name = "product", description = "Product to create", required = true),
            @io.swagger.v3.oas.annotations.Parameter(name = "sellerId", description = "ID of the seller creating the product", required = true)
    })
    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody Product product, @RequestParam Long sellerId) {
        try {
            Product createdProduct = productService.createProduct(product, sellerId);
            return ResponseEntity.ok(createdProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get products",
            description = "Retrieves the products for the specified seller ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Products retrieved successfully",
                            content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "sellerId", description = "ID of the seller to retrieve products", required = true)
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(@RequestParam Long sellerId) {
        List<Product> products = productService.getProductsBySeller(sellerId);
        return ResponseEntity.ok(products);
    }

    @Operation(
            summary = "Delete a product",
            description = "Deletes the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product deleted successfully",
                            content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "productId", description = "ID of the product to delete", required = true)
    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
