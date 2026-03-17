package com.example.home_store.controller;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    @Test
    void shouldReturnAllProducts() throws Exception {
        ProductDto p1 = ProductDto.builder().id(1L).name("Sofa").price(BigDecimal.valueOf(1500)).build();
        ProductDto p2 = ProductDto.builder().id(2L).name("TV").price(BigDecimal.valueOf(2000)).build();

        when(productService.getAll()).thenReturn(List.of(p1, p2));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].name").value("Sofa"))
                .andExpect(jsonPath("$[1].name").value("TV"));
    }

    @Test
    void shouldGetProductById() throws Exception {
        Long productId = 1L;
        ProductDto expectedDto = ProductDto.builder()
                .id(productId)
                .name("Sofa")
                .price(BigDecimal.valueOf(1500))
                .build();

        when(productService.getById(productId)).thenReturn(expectedDto);

        mockMvc.perform(get("/api/products/{id}", productId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(productId))
                .andExpect(jsonPath("$.name").value("Sofa"))
                .andExpect(jsonPath("$.price").value(1500));
    }

    @Test
    void shouldCreateProduct() throws Exception {
        ProductDto inputDto = ProductDto.builder().name("Table").price(BigDecimal.valueOf(500)).build();
        ProductDto savedDto = ProductDto.builder().id(10L).name("Table").price(BigDecimal.valueOf(500)).build();

        when(productService.create(any(ProductDto.class))).thenReturn(savedDto);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10L))
                .andExpect(jsonPath("$.name").value("Table"));
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isOk());
    }
}