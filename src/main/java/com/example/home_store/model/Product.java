package com.example.home_store.model;

import com.example.home_store.model.enum_model.ProductType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String description;

    @Column(precision = 19, scale = 2)
    private BigDecimal price;

    private int quantity;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @PrePersist
    public void prePersist() {
        if (this.imageUrl == null || this.imageUrl.trim().isEmpty()) {
            this.imageUrl = "https://via.placeholder.com/600x400?text=Brak+zdjecia";
        }
    }
}