package com.example.home_store.controller;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.Service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductDto dto) {
        log.info("Odebrano żądanie utworzenia nowego produktu: {}", dto.getName());

        ProductDto createdProduct = service.create(dto);

        log.info("Pomyślnie utworzono produkt o ID: {}", createdProduct.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAll() {
        log.debug("Odebrano żądanie pobrania wszystkich produktów");
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable UUID id) {
        log.info("Odebrano żądanie pobrania produktu o ID: {}", id);
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        log.warn("Odebrano żądanie usunięcia produktu o ID: {}", id);
        service.delete(id);
        log.info("Pomyślnie usunięto produkt o ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}