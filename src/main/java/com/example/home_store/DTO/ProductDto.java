package com.example.home_store.DTO;


import com.example.home_store.model.enum_model.ProductType;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int quantity;
    private String imageUrl;
    private ProductType productType;
    private Long categoryId;
}