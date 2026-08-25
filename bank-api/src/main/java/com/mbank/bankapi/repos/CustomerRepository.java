package com.mbank.bankapi.repos;

import com.mbank.bankapi.models.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository
        extends MongoRepository<Customer, String> {
}