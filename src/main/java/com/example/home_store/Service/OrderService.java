package com.example.home_store.Service;

import com.example.home_store.DTO.CreateOrderRequestDto;
import com.example.home_store.DTO.OrderDto;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderDto createOrder(CreateOrderRequestDto dto);
    List<OrderDto> getMyOrders(UUID userId);
    List<OrderDto> getAllOrders();
    OrderDto updateStatus(UUID orderId, String status);
}