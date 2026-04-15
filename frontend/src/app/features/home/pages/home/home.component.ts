import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../core/models/category.model';
import { Product } from '../../../../core/models/product.model';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  featuredProducts: Product[] = [];
  loadingProducts = true;
  loadingCategories = true;

  categoriesError = '';
  productsError = '';

  selectedCategoryId: string | null = null;
  allProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoriesError = '';

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: (error) => {
        console.error('Błąd ładowania kategorii:', error);
        this.categories = [];
        this.categoriesError = 'Nie udało się pobrać kategorii z backendu.';
        this.loadingCategories = false;
      }
    });
  }

  loadProducts(): void {
    this.productsError = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.featuredProducts = this.pickRandomProducts(data, 4);
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error('Błąd ładowania produktów:', error);
        this.productsError = 'Nie udało się pobrać produktów z backendu.';
        this.loadingProducts = false;
      }
    });
  }

  private pickRandomProducts(products: Product[], count: number): Product[] {
    const copy = [...products];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, count);
  }

  goToCategory(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;

    if (categoryId) {
      this.router.navigate(['/products'], {
        queryParams: { categoryId }
      });
    } else {
      this.router.navigate(['/products']);
    }
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  trackByProductId(index: number, product: Product): string {
    return product.id!;
  }
}
