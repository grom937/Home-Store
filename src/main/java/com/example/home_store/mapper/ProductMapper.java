package com.example.home_store.mapper;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.model.Product;

public class ProductMapper {

    public static ProductDto toDto(Product product){

        ProductDto dto = new ProductDto();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setRoom(product.getRoom());
        dto.setCategory(product.getCategory());
        dto.setImageUrl(product.getImageUrl());

        return dto;
    }

    public static Product toEntity(ProductDto dto){

        Product product = new Product();

        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setRoom(dto.getRoom());
        product.setCategory(dto.getCategory());
        product.setImageUrl(dto.getImageUrl());

        return product;
    }
}