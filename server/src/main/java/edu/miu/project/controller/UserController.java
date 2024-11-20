package edu.miu.project.controller;

import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.UserDto;
import edu.miu.project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserService userService;

    @Operation(
            summary = "Get all users",
            description = "Retrieves a list of all users.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Users retrieved successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @Operation(
            summary = "Register a user",
            description = "Registers a new user in the system.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "User registered successfully",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "409", description = "Conflict - User already exists",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @Parameter(name = "user", description = "User to register", required = true)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String responseMessage = userService.registerUser(user);
        // Check the response message and decide the HTTP status
        if (responseMessage.contains("Error")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMessage);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMessage);
    }
}
