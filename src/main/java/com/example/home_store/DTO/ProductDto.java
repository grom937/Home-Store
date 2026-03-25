package com.example.home_store.DTO;


import com.example.home_store.model.enum_model.ProductType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;

    @NotBlank(message = "Nazwa produktu nie może być pusta")
    @Size(min = 2, max = 100, message = "Nazwa musi mieć od 2 do 100 znaków")
    private String name;

    private String description;

    @NotNull(message = "Cena jest wymagana")
    @DecimalMin(value = "0.0", inclusive = false, message = "Cena musi być większa od 0")
    private BigDecimal price;

    @Min(value = 0, message = "Ilość nie może być ujemna")
    private int quantity;

    private String imageUrl;

    @NotNull(message = "Typ produktu jest wymagany")
    private ProductType productType;

    @NotNull(message = "ID kategorii jest wymagane")
    private Long categoryId;
}