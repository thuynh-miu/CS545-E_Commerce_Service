package edu.miu.project.service.impl;

import edu.miu.project.entity.Product;
import edu.miu.project.entity.Review;
import edu.miu.project.entity.Seller;
import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.ProductDto;
import edu.miu.project.entity.dto.ReviewDto;
import edu.miu.project.entity.dto.request.PostReviewRequest;
import edu.miu.project.entity.dto.response.GetReviewResponse;
import edu.miu.project.helper.ListMapper;
import edu.miu.project.repo.*;
import edu.miu.project.service.ProductService;
import edu.miu.project.service.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartItemRepository cartItemRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ListMapper listMapper;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        final Seller seller = userService.getCurrentSeller().orElseThrow(
                () -> new RuntimeException("Can not find current seller")
        );
        product.setSeller(seller);
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
    public Product createProduct(Product product) {
        // Just seller can create product
        Optional<Seller> seller = userService.getCurrentSeller();
        if (seller.isEmpty()) {
            throw new RuntimeException("Seller not found.");
        }

        // Set the seller to the product
        product.setSeller(seller.get());
        return productRepository.save(product);
    }

    // Get all products for a seller
    public List<Product> getProductsBySeller() {
        Optional<Seller> seller = userService.getCurrentSeller();
        if (seller.isEmpty()) {
            throw new RuntimeException("Seller not found.");
        }

        return productRepository.findBySeller_Id(seller.get().getId());
    }

    // Delete product if not ordered
    @Transactional
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        if (product.getSoldQuantity() > 0) {
            throw new RuntimeException("Cannot delete product because it has been sold before.");
        }

//        cartItemRepository.deleteBy(productId);

        // TODO: added cascade for cart_items, validate if it works

//        cartRepository.findByItems_Product_Id(productId).ifPresent(p -> {
//            throw new RuntimeException("Cannot delete product because it is in a cart.");
//        });

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
    public List<GetReviewResponse> getReviewsByProductId(Long productId) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        return product.getReviews().stream().map(m -> {
            var result= modelMapper.map(m, GetReviewResponse.class);
            result.setAuthor(m.getBuyer().getUser().getEmail());
            return result;
        }).collect(Collectors.toList());
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

    @Override
    public List<Product> getBestProducts() {
        if (productRepository.findTop10OrderProduct().isEmpty()) {
            return productRepository.find10ProductByNameDesc();
        }
        return productRepository.findTop10OrderProduct();
    }

    @Override
    public Page<ProductDto> filterProducts(
            String name,
            Double minPrice, Double maxPrice,
            List<String> colors, List<String> branchs, Pageable pageable) {
        Page<Product> products = productRepository.filterProducts(name, minPrice, maxPrice, colors, branchs, pageable);
        return products.map(product -> modelMapper.map(product, ProductDto.class));
    }

    @Override
    public void postReview(Long productId, PostReviewRequest reviewRequest) {
        var reviewEntity = new Review();
        modelMapper.map(reviewRequest, reviewEntity);
        var buyer = userService.getCurrentBuyer().orElseThrow();
        reviewEntity.setBuyer(buyer);

        var product = productRepository.findById(productId).orElseThrow();
        product.getReviews().add(reviewEntity);
        productRepository.save(product);
    }
}
