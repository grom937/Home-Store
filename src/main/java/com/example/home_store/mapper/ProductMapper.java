package com.example.home_store.mapper;


import com.example.home_store.DTO.ProductDto;
import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDto toDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .imageUrl(product.getImageUrl())
                .productType(product.getProductType())
                .categoryId(product.getCategory().getId())
                .build();
    }

    public Product toEntity(ProductDto dto, Category category) {
        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .quantity(dto.getQuantity())
                .imageUrl(dto.getImageUrl())
                .productType(dto.getProductType())
                .category(category)
                .build();
    }
}