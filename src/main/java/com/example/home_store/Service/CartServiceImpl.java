package com.example.home_store.Service;

import com.example.home_store.DTO.AddToCartRequestDto;
import com.example.home_store.DTO.CartDto;
import com.example.home_store.DTO.CartItemDto;
import com.example.home_store.DTO.UpdateCartItemRequestDto;
import com.example.home_store.model.Cart;
import com.example.home_store.model.CartItem;
import com.example.home_store.model.Product;
import com.example.home_store.model.User;
import com.example.home_store.repository.CartRepository;
import com.example.home_store.repository.ProductRepository;
import com.example.home_store.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public CartDto getCart(UUID userId) {
        Cart cart = getOrCreateCart(userId);
        return toDto(cart);
    }

    @Override
    public CartDto addItem(AddToCartRequestDto dto) {
        Cart cart = getOrCreateCart(dto.getUserId());

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono produktu."));

        CartItem existingItem = cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + dto.getQuantity());
        } else {
            CartItem item = CartItem.builder()
                    .product(product)
                    .quantity(dto.getQuantity())
                    .build();

            cart.addItem(item);
        }

        cartRepository.save(cart);
        return toDto(cart);
    }

    @Override
    public CartDto updateItem(UUID productId, UpdateCartItemRequestDto dto) {
        Cart cart = getOrCreateCart(dto.getUserId());

        CartItem item = cart.getItems()
                .stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono produktu w koszyku."));

        item.setQuantity(dto.getQuantity());

        cartRepository.save(cart);
        return toDto(cart);
    }

    @Override
    public CartDto removeItem(UUID userId, UUID productId) {
        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems()
                .stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono produktu w koszyku."));

        cart.removeItem(item);

        cartRepository.save(cart);
        return toDto(cart);
    }

    @Override
    public void clearCart(UUID userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(UUID userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono użytkownika."));

                    Cart cart = Cart.builder()
                            .user(user)
                            .items(new ArrayList<>())
                            .build();

                    user.setCart(cart);
                    return cartRepository.save(cart);
                });
    }

    private CartDto toDto(Cart cart) {
        List<CartItemDto> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        int totalItems = 0;

        for (CartItem item : cart.getItems()) {
            BigDecimal unitPrice = item.getProduct().getPrice();
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

            items.add(CartItemDto.builder()
                    .productId(item.getProduct().getId())
                    .productName(item.getProduct().getName())
                    .imageUrl(item.getProduct().getImageUrl())
                    .unitPrice(unitPrice)
                    .quantity(item.getQuantity())
                    .lineTotal(lineTotal)
                    .build());

            totalAmount = totalAmount.add(lineTotal);
            totalItems += item.getQuantity();
        }

        return CartDto.builder()
                .cartId(cart.getId())
                .userId(cart.getUser().getId())
                .items(items)
                .totalItems(totalItems)
                .totalAmount(totalAmount)
                .build();
    }
}