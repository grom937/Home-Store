package com.example.home_store.Service;

import com.example.home_store.DTO.AddToCartRequestDto;
import com.example.home_store.DTO.CartDto;
import com.example.home_store.DTO.UpdateCartItemRequestDto;

import java.util.UUID;

public interface CartService {
    CartDto getCart(UUID userId);
    CartDto addItem(AddToCartRequestDto dto);
    CartDto updateItem(UUID productId, UpdateCartItemRequestDto dto);
    CartDto removeItem(UUID userId, UUID productId);
    void clearCart(UUID userId);
}