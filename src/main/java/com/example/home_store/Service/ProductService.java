package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;
import java.util.List;


public interface ProductService {

    ProductDto create(ProductDto dto);

    List<ProductDto> getAll();

    ProductDto getById(Long id);

    void delete(Long id);
}