package com.example.home_store.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class OrderDto {
    private UUID orderId;
    private UUID userId;
    private String userEmail;
    private LocalDateTime createdAt;
    private String status;
    private List<OrderItemDto> items;
    private BigDecimal totalAmount;
}