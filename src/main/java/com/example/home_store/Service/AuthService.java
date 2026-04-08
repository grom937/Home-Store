package com.example.home_store.Service;

import com.example.home_store.DTO.AuthResponseDto;
import com.example.home_store.DTO.LoginRequestDto;
import com.example.home_store.DTO.RegisterRequestDto;
import com.example.home_store.DTO.RegisterResponseDto;

public interface AuthService {
    RegisterResponseDto register(RegisterRequestDto dto);
    AuthResponseDto login(LoginRequestDto dto);
}