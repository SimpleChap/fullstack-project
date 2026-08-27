package com.mbank.bankapi.services;

import com.mbank.bankapi.models.Customer;
import com.mbank.bankapi.repos.CustomerRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        customer.setId(null);
        return customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(
            String id, Customer updatedCustomer) {

        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    existingCustomer.setName(updatedCustomer.getName());
                    existingCustomer.setEmail(updatedCustomer.getEmail());
                    return customerRepository.save(existingCustomer);
                });
    }

    public boolean deleteCustomer(String id) {
        if (!customerRepository.existsById(id)) {
            return false;
        }

        customerRepository.deleteById(id);
        return true;
    }

    public Customer register(String name, String username, String email, String password) {
        // Check if username already exists
        if (customerRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Check if email already exists
        if (customerRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Validate inputs
        if (name == null || name.isEmpty() || username == null || username.isEmpty() ||
            email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException("All fields are required");
        }

        // Create and save customer
        Customer customer = new Customer();
        customer.setName(name);
        customer.setUsername(username);
        customer.setEmail(email);
        customer.setPasswordHash(passwordEncoder.encode(password));
        customer.setRole("CUSTOMER");

        return customerRepository.save(customer);
    }

    public Optional<Customer> login(String username, String password) {
        return customerRepository.findByUsername(username)
                .filter(customer -> customer.getPasswordHash() != null &&
                        passwordEncoder.matches(password, customer.getPasswordHash()));
    }
}