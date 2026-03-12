package com.example.home_store.DTO;

import com.example.home_store.model.enum_model.Category;
import com.example.home_store.model.enum_model.Room;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Room room;
    private Category category;
    @NotBlank
    @URL
    @Size(max = 255)
    private String imageUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        if (imageUrl != null) {
            this.imageUrl = imageUrl.replaceAll("<[^>]*>", "").trim();
        } else {
            this.imageUrl = null;
        }
    }
}