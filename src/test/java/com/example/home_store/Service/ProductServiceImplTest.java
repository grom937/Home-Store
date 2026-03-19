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
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

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
        ProductDto inputDto = ProductDto.builder().categoryId(1L).name("Test").build();
        Category category = Category.builder().id(1L).name("Furniture").build();
        Product productEntity = Product.builder().id(1L).name("Test").category(category).build();
        ProductDto outputDto = ProductDto.builder().id(1L).name("Test").categoryId(1L).build();

        Mockito.when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        Mockito.when(mapper.toEntity(inputDto, category)).thenReturn(productEntity);
        Mockito.when(productRepository.save(productEntity)).thenReturn(productEntity);
        Mockito.when(mapper.toDto(productEntity)).thenReturn(outputDto);

        ProductDto result = productService.create(inputDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test", result.getName());
        Mockito.verify(productRepository, Mockito.times(1)).save(productEntity);
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithNonExistentCategory() {
        ProductDto inputDto = ProductDto.builder().categoryId(99L).build();
        Mockito.when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productService.create(inputDto);
        });

        assertEquals("Category not found", exception.getMessage());
        Mockito.verify(productRepository, Mockito.never()).save(any());
    }

    @Test
    void shouldReturnProductById() {
        Product product = Product.builder().id(1L).name("Test").build();
        ProductDto dto = ProductDto.builder().id(1L).name("Test").build();

        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Mockito.when(mapper.toDto(product)).thenReturn(dto);

        ProductDto result = productService.getById(1L);
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void shouldDeleteProduct() {
        Long productId = 1L;

        productService.delete(productId);

        Mockito.verify(productRepository, Mockito.times(1)).deleteById(productId);
    }
}