package com.example.home_store.model;

import com.example.home_store.model.enum_model.Category;
import com.example.home_store.model.enum_model.Room;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1000)
    private String description;
    private Double price;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private Room room;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String imageUrl = "default-placeholder.jpg";


    public void setImageUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) {
            this.imageUrl = "default-placeholder.jpg";
        } else {
            this.imageUrl = imageUrl;
        }
    }

    }