package com.example.home_store.Service;

import com.example.home_store.DTO.CreateOrderRequestDto;
import com.example.home_store.DTO.OrderDto;
import com.example.home_store.DTO.OrderItemDto;
import com.example.home_store.model.Cart;
import com.example.home_store.model.CartItem;
import com.example.home_store.model.Order;
import com.example.home_store.model.OrderItem;
import com.example.home_store.model.User;
import com.example.home_store.model.enum_model.OrderStatus;
import com.example.home_store.repository.CartRepository;
import com.example.home_store.repository.OrderRepository;
import com.example.home_store.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public OrderDto createOrder(CreateOrderRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono użytkownika."));

        Cart cart = cartRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Koszyk użytkownika nie istnieje."));

        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Koszyk jest pusty.");
        }

        Order order = Order.builder()
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.NEW)
                .user(user)
                .items(new ArrayList<>())
                .build();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .build();

            order.addItem(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return toDto(savedOrder);
    }

    @Override
    public List<OrderDto> getMyOrders(UUID userId) {
        return orderRepository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public OrderDto updateStatus(UUID orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono zamówienia."));

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status zamówienia jest wymagany.");
        }

        OrderStatus newStatus;
        try {
            newStatus = OrderStatus.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Nieprawidłowy status zamówienia: " + status);
        }

        order.setStatus(newStatus);

        Order savedOrder = orderRepository.saveAndFlush(order);

        return toDto(savedOrder);
    }

    private OrderDto toDto(Order order) {
        List<OrderItemDto> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItem item : order.getItems()) {
            BigDecimal lineTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

            items.add(OrderItemDto.builder()
                    .productId(item.getProduct().getId())
                    .productName(item.getProduct().getName())
                    .imageUrl(item.getProduct().getImageUrl())
                    .quantity(item.getQuantity())
                    .unitPrice(item.getPrice())
                    .lineTotal(lineTotal)
                    .build());

            totalAmount = totalAmount.add(lineTotal);
        }

        return OrderDto.builder()
                .orderId(order.getId())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .createdAt(order.getCreatedAt())
                .status(order.getStatus().name())
                .items(items)
                .totalAmount(totalAmount)
                .build();
    }
}