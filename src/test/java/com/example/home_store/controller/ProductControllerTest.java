package com.example.home_store.controller;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.Service.ProductService;
import com.example.home_store.model.enum_model.ProductType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    private ProductDto sampleDto;
    private UUID sampleId;
    private UUID categoryId;

    @BeforeEach
    void setUp() {
        sampleId = UUID.randomUUID();
        categoryId = UUID.randomUUID();

        sampleDto = ProductDto.builder()
                .id(sampleId)
                .name("Testowy Produkt")
                .price(BigDecimal.valueOf(100.0))
                .quantity(5)
                .categoryId(categoryId)
                .productType(ProductType.LIVING_ROOM_SOFA)
                .imageUrl("https://via.placeholder.com/600x400?text=Test")
                .build();
    }

    @Test
    void shouldReturnAllProducts() throws Exception {
        Mockito.when(productService.getAll()).thenReturn(List.of(sampleDto));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value("Testowy Produkt"));
    }

    @Test
    void shouldReturnProductById() throws Exception {
        Mockito.when(productService.getById(sampleId)).thenReturn(sampleDto);

        mockMvc.perform(get("/api/products/{id}", sampleId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sampleId.toString()))
                .andExpect(jsonPath("$.name").value("Testowy Produkt"));
    }

    @Test
    void shouldCreateProduct() throws Exception {
        Mockito.when(productService.create(any(ProductDto.class))).thenReturn(sampleDto);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(sampleId.toString()))
                .andExpect(jsonPath("$.name").value("Testowy Produkt"));
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        Mockito.doNothing().when(productService).delete(sampleId);

        mockMvc.perform(delete("/api/products/{id}", sampleId))
                .andExpect(status().isNoContent());

        Mockito.verify(productService, Mockito.times(1)).delete(sampleId);
    }
}