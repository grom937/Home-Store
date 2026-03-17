package com.example.home_store.DTO;


import com.example.home_store.model.enum_model.ProductType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price; // ZMIANA: z double na BigDecimal
    private int quantity;
    private String imageUrl;
    private ProductType productType;
    private Long categoryId;
}