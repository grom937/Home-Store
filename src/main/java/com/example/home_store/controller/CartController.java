package com.example.home_store.controller;

import com.example.home_store.DTO.AddToCartRequestDto;
import com.example.home_store.DTO.CartDto;
import com.example.home_store.DTO.UpdateCartItemRequestDto;
import com.example.home_store.Service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCart(@RequestParam UUID userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addItem(@Valid @RequestBody AddToCartRequestDto dto) {
        return ResponseEntity.ok(cartService.addItem(dto));
    }

    @PatchMapping("/items/{productId}")
    public ResponseEntity<CartDto> updateItem(
            @PathVariable UUID productId,
            @Valid @RequestBody UpdateCartItemRequestDto dto
    ) {
        return ResponseEntity.ok(cartService.updateItem(productId, dto));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartDto> removeItem(
            @PathVariable UUID productId,
            @RequestParam UUID userId
    ) {
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestParam UUID userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
}