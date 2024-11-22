package edu.miu.project.controller;

import edu.miu.project.entity.Product;
import edu.miu.project.entity.dto.ProductDetailDto;
import edu.miu.project.entity.dto.ProductDto;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.service.ProductService;
import edu.miu.project.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    private ListMapper listMapper;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<Page<ProductDto>> filterProducts(
            @RequestParam(name = "q", defaultValue = "", required = false) String name,
            @RequestParam(name = "price_range", required = false) String priceRange,
            @RequestParam(name = "color", required = false) List<String> colors,
            @RequestParam(name = "brand", required = false) List<String> brands,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pagesize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        Double minPrice = null;
        Double maxPrice = null;

        // Parse price_range into minPrice and maxPrice
        if (priceRange != null && priceRange.contains("..")) {
            String[] parts = priceRange.split("\\.\\.");
            try {
                minPrice = Double.valueOf(parts[0]);
                maxPrice = Double.valueOf(parts[1]);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid price_range format. Use 'min..max'.");
            }
        }

        if (colors != null)
            colors = colors.stream().map(String::toLowerCase).toList();
        if (brands != null)
            brands = brands.stream().map(String::toLowerCase).toList();

        Pageable pageable = PageRequest.of(page, pageSize);
        Page<ProductDto> products = productService.filterProducts(name, minPrice, maxPrice, colors, brands, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/best")
    public ResponseEntity<List<ProductDto>> getBestProducts() {
        List<ProductDto> productDtos = listMapper.mapList(productService.getBestProducts(), ProductDto.class);
        return ResponseEntity.ok(productDtos);
    }

    @Operation(
            summary = "Add a product",
            description = "Adds a new product to the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product added successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "product", description = "Product to add", required = true)
    @PostMapping()
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {

            Product newProduct = productService.addProduct(product);
            return ResponseEntity.ok(newProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get product by ID",
            description = "Retrieves the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product retrieved successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "productId", description = "ID of the product to retrieve", required = true)
    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(modelMapper.map(product, ProductDetailDto.class));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Delete a product",
            description = "Deletes the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product deleted successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "productId", description = "ID of the product to delete", required = true)
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Update a product",
            description = "Updates the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product updated successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to update", required = true),
            @Parameter(name = "product", description = "Product to update", required = true)
    })
    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody Product product) {
        try {
            Product updatedProduct = productService.updateProduct(productId, product);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get products by seller",
            description = "Retrieves a list of products for the specified seller",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Products retrieved successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping("/seller")
    public ResponseEntity<List<ProductDto>> getProductsBySeller() {
        return ResponseEntity.ok(listMapper.mapList(productService.getProductsBySeller(), ProductDto.class));
    }

    @Operation(
            summary = "Update stock",
            description = "Updates the stock quantity of the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Stock updated successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to update stock", required = true),
            @Parameter(name = "quantity", description = "New stock quantity", required = true)
    })
    @PutMapping("/{productId}/quantity")
    public ResponseEntity<?> updateStock(@PathVariable Long productId, @RequestBody int quantity) {
        try {
            Product updatedProduct = productService.updateStock(productId, quantity);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get product status (Out of Stock or In Stock)",
            description = "Retrieves the status of the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product status retrieved successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping("/{productId}/status")
    public ResponseEntity<String> getProductStatus(@PathVariable Long productId) {
        try {
            String status = productService.getProductStatus(productId);
            return ResponseEntity.ok(status);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Update product image URL",
            description = "Updates the image URL of the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Image URL updated successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to update image URL", required = true),
            @Parameter(name = "imageUrl", description = "New image URL", required = true)
    })
    @PutMapping("/{productId}/imageUrl")
    public ResponseEntity<?> updateProductImageUrl(@PathVariable Long productId, @RequestBody String imageUrl) {
        try {
            Product updatedProduct = productService.updateProductImageUrl(productId, imageUrl);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get reviews by product ID",
            description = "Retrieves a list of reviews for the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reviews retrieved successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "productId", description = "ID of the product to retrieve reviews", required = true)
    @GetMapping("/{productId}/reviews")
    public ResponseEntity<?> getReviewsByProductId(@PathVariable Long productId) {
        try {
            List<?> reviews = productService.getReviewsByProductId(productId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get review by product id
    @Operation(
            summary = "Get review by product ID",
            description = "Retrieves the review with the specified ID for the product with the specified ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Review retrieved successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to retrieve review", required = true),
            @Parameter(name = "reviewId", description = "ID of the review to retrieve", required = true)
    })
    @GetMapping("/{productId}/reviews/{reviewId}")
    public ResponseEntity<?> getReviewByProductId(@PathVariable Long productId, @PathVariable Long reviewId) {
        try {
            Object review = productService.getReviewByProductId(productId, reviewId);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
