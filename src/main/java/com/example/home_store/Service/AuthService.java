package com.example.home_store.Service;

import com.example.home_store.DTO.RegisterRequestDto;
import com.example.home_store.DTO.RegisterResponseDto;

public interface AuthService {
    RegisterResponseDto register(RegisterRequestDto dto);
}