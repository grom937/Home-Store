package com.example.home_store.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdateCartItemRequestDto {

    @NotNull(message = "userId jest wymagane.")
    private UUID userId;

    @NotNull(message = "quantity jest wymagane.")
    @Min(value = 1, message = "Ilość musi być większa od 0.")
    private Integer quantity;
}