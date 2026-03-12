package com.example.home_store.controller;


import com.example.home_store.DTO.ProductDto;
import com.example.home_store.Service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDto> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @PostMapping
    public ProductDto createProduct(@Valid @RequestBody ProductDto dto){
        return productService.createProduct(dto);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id,
                                    @Valid @RequestBody ProductDto dto){
        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
}
