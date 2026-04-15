package com.example.home_store.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateOrderStatusRequestDto {

    @NotBlank(message = "Status jest wymagany.")
    private String status;
}