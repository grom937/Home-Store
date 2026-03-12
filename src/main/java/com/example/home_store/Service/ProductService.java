package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;
import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    ProductDto createProduct(ProductDto dto);
    ProductDto updateProduct(Long id, ProductDto dto);
    void deleteProduct(Long id);
}