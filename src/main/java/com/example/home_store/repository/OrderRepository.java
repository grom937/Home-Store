package com.example.home_store.repository;

import com.example.home_store.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findAllByUserIdOrderByCreatedAtDesc(UUID userId);
}