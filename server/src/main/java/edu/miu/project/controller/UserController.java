package edu.miu.project.controller;

import edu.miu.project.entity.User;
import edu.miu.project.entity.dto.UserDto;
import edu.miu.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Endpoint to register a user
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
