package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductDto create(ProductDto dto);

    List<ProductDto> getAll();

    ProductDto getById(UUID id);

    void delete(UUID id);
}