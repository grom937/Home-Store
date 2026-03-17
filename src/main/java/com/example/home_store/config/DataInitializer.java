package com.example.home_store.config;


import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.model.enum_model.ProductType;
import com.example.home_store.repository.CategoryRepository;
import com.example.home_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {

        Category furniture = Category.builder().name("Furniture").build();
        Category electronics = Category.builder().name("Electronics").build();

        Category sofas = Category.builder()
                .name("Sofas")
                .parentCategory(furniture)
                .build();

        categoryRepository.saveAll(List.of(furniture, electronics, sofas));

        Product p1 = Product.builder()
                .name("Simple Sofa")
                .price(BigDecimal.valueOf(1500))
                .quantity(10)
                .productType(ProductType.LIVING_ROOM_SOFA)
                .category(sofas)
                .build();

        Product p2 = Product.builder()
                .name("Basic TV")
                .price(BigDecimal.valueOf(2000))
                .quantity(5)
                .productType(ProductType.TELEVISION)
                .category(electronics)
                .build();

        productRepository.saveAll(List.of(p1, p2));
    }
}