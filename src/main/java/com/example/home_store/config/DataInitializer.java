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
        if (categoryRepository.count() > 0 || productRepository.count() > 0) {
            return;
        }

        Category furniture = Category.builder().name("Furniture").build();
        Category electronics = Category.builder().name("Electronics").build();

        Category sofas = Category.builder()
                .name("Sofas")
                .parentCategory(furniture)
                .build();

        categoryRepository.saveAll(List.of(furniture, electronics, sofas));

        Product p1 = Product.builder()
                .name("Simple Sofa")
                .description("Wygodna sofa do salonu w nowoczesnym stylu.")
                .price(BigDecimal.valueOf(1500))
                .quantity(10)
                .imageUrl("https://pieris.com.pl/wp-content/uploads/2023/12/Nowoczesna-luksusuowa-wygodna-sofa-hotelowa-rozkladana-Alicante-z-wloska-funkcja-spania-5-1.jpg")
                .productType(ProductType.LIVING_ROOM_SOFA)
                .category(sofas)
                .build();

        Product p2 = Product.builder()
                .name("Basic TV")
                .description("Podstawowy telewizor do codziennego użytku.")
                .price(BigDecimal.valueOf(2000))
                .quantity(5)
                .imageUrl("https://www.lg.com/content/dam/channel/wcms/pl/images/telewizory/32lm6300pla_aeu_eepl_pl_c/gallery/medium02.jpg")
                .productType(ProductType.TELEVISION)
                .category(electronics)
                .build();

        productRepository.saveAll(List.of(p1, p2));
    }
}