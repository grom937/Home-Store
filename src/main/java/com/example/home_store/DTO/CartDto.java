package com.example.home_store.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class CartDto {
    private UUID cartId;
    private UUID userId;
    private List<CartItemDto> items;
    private Integer totalItems;
    private BigDecimal totalAmount;
}