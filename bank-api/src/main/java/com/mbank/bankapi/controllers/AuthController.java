package com.mbank.bankapi.controllers;

import com.mbank.bankapi.dtos.AuthLoginRequest;
import com.mbank.bankapi.dtos.AuthRegisterRequest;
import com.mbank.bankapi.dtos.AuthResponse;
import com.mbank.bankapi.models.Customer;
import com.mbank.bankapi.services.CustomerService;
import com.mbank.bankapi.utils.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final CustomerService customerService;
    private final JwtUtils jwtUtils;

    public AuthController(CustomerService customerService, JwtUtils jwtUtils) {
        this.customerService = customerService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterRequest request) {
        try {
            // Validate inputs
            if (request.getName() == null || request.getName().isEmpty()) {
                return ResponseEntity.badRequest().body("Name is required");
            }
            if (request.getUsername() == null || request.getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }

            // Register customer
            Customer createdCustomer = customerService.register(
                    request.getName(),
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword()
            );

            // Return safe response without passwordHash or token
            AuthResponse response = new AuthResponse(
                    createdCustomer.getId(),
                    createdCustomer.getName(),
                    createdCustomer.getUsername(),
                    createdCustomer.getEmail(),
                    createdCustomer.getRole()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request) {
        try {
            // Validate inputs
            if (request.getUsername() == null || request.getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }

            // Attempt login
            var customer = customerService.login(request.getUsername(), request.getPassword());

            if (customer.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }

            // Generate JWT token
            Customer authenticatedCustomer = customer.get();
            String token = jwtUtils.generateToken(authenticatedCustomer.getUsername(), authenticatedCustomer.getId());

            // Return response with token
            AuthResponse response = new AuthResponse(
                    authenticatedCustomer.getId(),
                    authenticatedCustomer.getName(),
                    authenticatedCustomer.getUsername(),
                    authenticatedCustomer.getEmail(),
                    authenticatedCustomer.getRole(),
                    token
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}
