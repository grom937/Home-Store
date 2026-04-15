package com.example.home_store.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateOrderRequestDto {

    @NotNull(message = "userId jest wymagane.")
    private UUID userId;
}