package edu.miu.project.controller;


import edu.miu.project.entity.dto.LoginRequest;
import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.entity.dto.RefreshTokenRequest;
import edu.miu.project.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/authenticate")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(
            summary = "User login",
            description = "Authenticates a user and returns a JWT token.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Login successful",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))),
                    @ApiResponse(responseCode = "401", description = "Unauthorized",
                            content = @Content(mediaType = "application/json"))
            })
    @Parameter(name = "loginRequest", description = "User login credentials", required = true)
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @Operation(
            summary = "Refresh JWT token",
            description = "Refreshes the JWT token using a refresh token.")
    @Parameter(name = "refreshTokenRequest", description = "Refresh token", required = true)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token refreshed successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid refresh token",
                    content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    // Register as a buyer
    @PostMapping("/register-buyer")
    public ResponseEntity<?> registerAsBuyer(@RequestBody LoginRequest loginRequest) {
        boolean ret = authService.registerAsBuyer(loginRequest);
        if (ret) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Buyer registered successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Buyer registration failed");
    }

    @PostMapping("/register-seller")
    public ResponseEntity<?> registerAsSeller(@RequestBody LoginRequest loginRequest) {
        boolean ret = authService.registerAsSeller(loginRequest);
        if (ret) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Seller registered successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Seller registration failed");
    }
}
