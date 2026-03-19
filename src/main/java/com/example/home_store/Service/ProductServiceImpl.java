package com.example.home_store.Service;


import com.example.home_store.DTO.ProductDto;
import com.example.home_store.mapper.ProductMapper;
import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.repository.CategoryRepository;
import com.example.home_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper mapper;

    @Override
    public ProductDto create(ProductDto dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = mapper.toEntity(dto, category);

        return mapper.toDto(productRepository.save(product));
    }

    @Override
    public List<ProductDto> getAll() {
        return productRepository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    @Override
    public ProductDto getById(Long id) {
        return mapper.toDto(productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found")));
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}