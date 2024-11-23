package edu.miu.project.controller;

import edu.miu.project.entity.Cart;
import edu.miu.project.entity.dto.CartDto;
import edu.miu.project.entity.dto.ProductDto;
import edu.miu.project.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    private ModelMapper modelMapper;

    @Operation(
            summary = "Add product to cart",
            description = "Adds a specified product to the cart for the given buyer ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product added to cart successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cart.class))),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to add to cart", required = true),
            @Parameter(name = "quantity", description = "Quantity of the product to add to cart", required = true)
    })
    @PostMapping()
    public CartDto addToCart(@RequestParam Long productId, @RequestParam int quantity) {
        return modelMapper.map(cartService.addToCart(productId, quantity), CartDto.class);
    }

    @Operation(
            summary = "Remove product from cart",
            description = "Removes a specified product from the cart for the given buyer ID."
    )
    @Parameters({
            @Parameter(name = "productId", description = "ID of the product to remove from cart", required = true)
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product removed from cart successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cart.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json"))
    })
    @DeleteMapping()
    public ResponseEntity<?> removeFromCart(@RequestParam Long productId) {
        try {
            Cart cart = cartService.removeFromCart(productId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<CartDto> getCart() {
        Cart cart = cartService.getCart();
        return ResponseEntity.ok(modelMapper.map(cart, CartDto.class));
    }

    @PutMapping()
    public ResponseEntity<CartDto> updateCartItems(@RequestBody List<ProductDto> products) {
        Cart cart = cartService.getCart();
        return ResponseEntity.ok(modelMapper.map(cart, CartDto.class));
    }

//    @Operation(
//            summary = "Update cart item quantity",
//            description = "Updates the quantity of a specified product in the cart for the given buyer ID.",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "Cart item quantity updated successfully",
//                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cart.class))),
//                    @ApiResponse(responseCode = "400", description = "Bad request",
//                            content = @Content(mediaType = "application/json"))
//            }
//    )
//    @Parameters({
//            @Parameter(name = "productId", description = "ID of the product to update quantity in cart", required = true),
//            @Parameter(name = "quantity", description = "New quantity of the product in cart", required = true)
//    })
//    @PutMapping()
//    public ResponseEntity<?> updateCartItemQuantity(@RequestParam Long productId, @RequestParam int quantity) {
//        try {
//            Cart cart = cartService.updateCartItemQuantity(productId, quantity);
//            return ResponseEntity.ok(cart);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}
