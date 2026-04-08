package com.example.home_store.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDto {

    @NotBlank(message = "Email jest wymagany.")
    @Email(message = "Podaj poprawny adres email.")
    private String email;

    @NotBlank(message = "Hasło jest wymagane.")
    private String password;
}