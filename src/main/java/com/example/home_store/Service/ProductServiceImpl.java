package com.example.home_store.Service;

import com.example.home_store.DTO.ProductDto;
import com.example.home_store.mapper.ProductMapper;
import com.example.home_store.model.Product;
import com.example.home_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor

public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
            .stream()
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
        .orElseThrow();
        return ProductMapper.toDto(product);
    }

    @Override
        public ProductDto createProduct(ProductDto dto) {
        Product product = ProductMapper.toEntity(dto);
        Product saved = productRepository.save(product);
        return ProductMapper.toDto(saved);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
        .orElseThrow();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setRoom(dto.getRoom());
        product.setCategory(dto.getCategory());
        product.setImageUrl(dto.getImageUrl());

        Product updated = productRepository.save(product);
        return ProductMapper.toDto(updated);
    }

    @Override
    public void deleteProduct(Long id) {
    productRepository.deleteById(id);

    }

}