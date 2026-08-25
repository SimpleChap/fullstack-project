package com.mbank.bankapi.repos;

import com.mbank.bankapi.models.Customer;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerRepository {

    private final List<Customer> customers = new ArrayList<>();

    public CustomerRepository() {
        customers.add(new Customer(1, "Mit"));
        customers.add(new Customer(2, "Tim"));
        customers.add(new Customer(3, "John"));
    }

    public List<Customer> getAllCustomers() {
        return customers;
    }
}