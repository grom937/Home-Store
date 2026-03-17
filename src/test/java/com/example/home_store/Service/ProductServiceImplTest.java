package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.mapper.ProductMapper;
import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.repository.CategoryRepository;
import com.example.home_store.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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

    @Test
    void shouldCreateProductSuccessfully() {
        ProductDto inputDto = ProductDto.builder().name("Test Sofa").price(BigDecimal.valueOf(1000)).categoryId(1L).build();
        Category category = Category.builder().id(1L).name("Sofas").build();
        Product entityToSave = Product.builder().name("Test Sofa").price(BigDecimal.valueOf(1000)).build();
        Product savedEntity = Product.builder().id(100L).name("Test Sofa").price(BigDecimal.valueOf(1000)).build();
        ProductDto expectedDto = ProductDto.builder().id(100L).name("Test Sofa").build();

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(mapper.toEntity(inputDto, category)).thenReturn(entityToSave);
        when(productRepository.save(entityToSave)).thenReturn(savedEntity);
        when(mapper.toDto(savedEntity)).thenReturn(expectedDto);

        ProductDto result = productService.create(inputDto);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Test Sofa", result.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void shouldThrowExceptionWhenCategoryNotFound() {
        ProductDto inputDto = ProductDto.builder().categoryId(99L).build();
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> productService.create(inputDto));
        assertEquals("Category not found", exception.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldGetProductById() {
        Product product = Product.builder().id(1L).name("TV").build();
        ProductDto productDto = ProductDto.builder().id(1L).name("TV").build();

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(mapper.toDto(product)).thenReturn(productDto);

        ProductDto result = productService.getById(1L);

        assertNotNull(result);
        assertEquals("TV", result.getName());
    }

    @Test
    void shouldGetAllProducts() {
        Product p1 = Product.builder().id(1L).name("Sofa").build();
        Product p2 = Product.builder().id(2L).name("TV").build();

        ProductDto dto1 = ProductDto.builder().id(1L).name("Sofa").build();
        ProductDto dto2 = ProductDto.builder().id(2L).name("TV").build();

        when(productRepository.findAll()).thenReturn(List.of(p1, p2));
        when(mapper.toDto(p1)).thenReturn(dto1);
        when(mapper.toDto(p2)).thenReturn(dto2);

        List<ProductDto> result = productService.getAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Sofa", result.get(0).getName());
        assertEquals("TV", result.get(1).getName());
    }

    @Test
    void shouldDeleteProduct() {
        Long productId = 1L;

        productService.delete(productId);

        verify(productRepository, times(1)).deleteById(productId);
    }
}