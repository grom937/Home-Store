package com.example.home_store.controller;

import com.example.home_store.DTO.CreateOrderRequestDto;
import com.example.home_store.DTO.OrderDto;
import com.example.home_store.Service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequestDto dto) {
        return ResponseEntity.ok(orderService.createOrder(dto));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderDto>> getMyOrders(@RequestParam UUID userId) {
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
}