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
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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
        Mockito.when(productService.getAll()).thenReturn(List.of(sampleDto));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value("Testowy Produkt"));
    }

    @Test
    void shouldReturnProductById() throws Exception {
        Mockito.when(productService.getById(1L)).thenReturn(sampleDto);

        mockMvc.perform(get("/api/products/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Testowy Produkt"));
    }

    @Test
    void shouldCreateProduct() throws Exception {
        Mockito.when(productService.create(any(ProductDto.class))).thenReturn(sampleDto);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Testowy Produkt"));
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        Mockito.doNothing().when(productService).delete(anyLong());

        mockMvc.perform(delete("/api/products/{id}", 1L))
                .andExpect(status().isNoContent()); // <--- TUTAJ POPRAWKA

        Mockito.verify(productService, Mockito.times(1)).delete(1L);
    }
}