package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.mapper.ProductMapper;
import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.repository.CategoryRepository;
import com.example.home_store.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductMapper mapper;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;
    private ProductDto dto;
    private Category category;

    @BeforeEach
    void setup() {
        category = new Category();
        category.setId(1L);

        product = new Product();
        product.setId(1L);
        product.setName("Laptop");

        dto = new ProductDto();
        dto.setId(1L);
        dto.setName("Laptop");
        dto.setCategoryId(1L);
    }

    @Test
    void shouldCreateProduct() {

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(mapper.toEntity(dto, category)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(product);
        when(mapper.toDto(product)).thenReturn(dto);

        ProductDto result = productService.create(dto);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());

        verify(productRepository).save(product);
    }

    @Test
    void shouldReturnAllProducts() {

        when(productRepository.findAll()).thenReturn(List.of(product));
        when(mapper.toDto(product)).thenReturn(dto);

        List<ProductDto> result = productService.getAll();

        assertEquals(1, result.size());
        verify(productRepository).findAll();
    }

    @Test
    void shouldReturnProductById() {

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(mapper.toDto(product)).thenReturn(dto);

        ProductDto result = productService.getById(1L);

        assertEquals(1L, result.getId());
        verify(productRepository).findById(1L);
    }

    @Test
    void shouldDeleteProduct() {

        productService.delete(1L);

        verify(productRepository).deleteById(1L);
    }
}