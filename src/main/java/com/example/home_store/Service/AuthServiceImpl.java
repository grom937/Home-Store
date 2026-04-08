package com.example.home_store.Service;

import com.example.home_store.DTO.AuthResponseDto;
import com.example.home_store.DTO.LoginRequestDto;
import com.example.home_store.DTO.RegisterRequestDto;
import com.example.home_store.DTO.RegisterResponseDto;
import com.example.home_store.model.Cart;
import com.example.home_store.model.User;
import com.example.home_store.model.enum_model.UserRole;
import com.example.home_store.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public RegisterResponseDto register(RegisterRequestDto dto) {
        String email = dto.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Użytkownik o takim adresie e-mail już istnieje.");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Hasła nie są takie same.");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(UserRole.USER)
                .build();

        Cart cart = Cart.builder()
                .user(user)
                .build();

        user.setCart(cart);

        User savedUser = userRepository.save(user);

        return RegisterResponseDto.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .message("Konto zostało utworzone.")
                .build();
    }

    @Override
    public AuthResponseDto login(LoginRequestDto dto) {
        String email = dto.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("Nieprawidłowy email lub hasło."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Nieprawidłowy email lub hasło.");
        }

        return AuthResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Logowanie zakończone sukcesem.")
                .build();
    }
}