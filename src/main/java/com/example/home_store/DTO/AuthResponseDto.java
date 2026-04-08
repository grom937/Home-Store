package com.example.home_store.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class AuthResponseDto {
    private UUID id;
    private String email;
    private String role;
    private String message;
}