package com.example.home_store.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDto {

    @NotBlank(message = "Email jest wymagany.")
    @Email(message = "Podaj poprawny adres email.")
    private String email;

    @NotBlank(message = "Hasło jest wymagane.")
    @Size(min = 6, message = "Hasło musi mieć co najmniej 6 znaków.")
    private String password;

    @NotBlank(message = "Potwierdzenie hasła jest wymagane.")
    private String confirmPassword;
}