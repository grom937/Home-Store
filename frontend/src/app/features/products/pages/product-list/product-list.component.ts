import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  loading = true;
  error = '';

  searchTerm = '';
  selectedCategoryId = '';
  selectedProductType = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortOption = '';

  productTypes = [
    { value: 'LIVING_ROOM_SOFA', label: 'Sofa do salonu' },
    { value: 'LIVING_ROOM_COFFEE_TABLE', label: 'Stolik kawowy do salonu' },
    { value: 'LIVING_ROOM_BOOKCASE', label: 'Regał do salonu' },
    { value: 'LIVING_ROOM_ARMCHAIR', label: 'Fotel do salonu' },

    { value: 'BEDROOM_BED', label: 'Łóżko do sypialni' },
    { value: 'BEDROOM_WARDROBE', label: 'Szafa do sypialni' },
    { value: 'BEDROOM_CHEST_OF_DRAWERS', label: 'Komoda do sypialni' },
    { value: 'BEDROOM_NIGHT_STAND', label: 'Szafka nocna' },

    { value: 'KITCHEN_TABLE', label: 'Stół kuchenny' },
    { value: 'KITCHEN_CHAIR', label: 'Krzesło kuchenne' },
    { value: 'KITCHEN_SINK', label: 'Zlew kuchenny' },
    { value: 'KITCHEN_CABINET', label: 'Szafka kuchenna' },
    { value: 'KITCHEN_BAR_STOOL', label: 'Hoker kuchenny' },

    { value: 'BATHROOM_SINK_CABINET', label: 'Szafka pod umywalkę' },
    { value: 'BATHROOM_BATH', label: 'Wanna' },
    { value: 'BATHROOM_STORAGE_CABINET', label: 'Szafka łazienkowa' },
    { value: 'BATHROOM_SHELF', label: 'Półka łazienkowa' },
    { value: 'BATHROOM_LAUNDRY_BASKET', label: 'Kosz na pranie' },

    { value: 'OFFICE_DESK', label: 'Biurko' },
    { value: 'OFFICE_CHAIR', label: 'Krzesło biurowe' },
    { value: 'OFFICE_BOOKCASE', label: 'Regał biurowy' },
    { value: 'OFFICE_FILE_CABINET', label: 'Szafka na dokumenty' },

    { value: 'HALLWAY_SHOE_CABINET', label: 'Szafka na buty' },
    { value: 'HALLWAY_COAT_RACK', label: 'Wieszak do przedpokoju' },
    { value: 'HALLWAY_BENCH', label: 'Ławka do przedpokoju' },
    { value: 'HALLWAY_MIRROR', label: 'Lustro do przedpokoju' },

    { value: 'TELEVISION', label: 'Telewizor' },
    { value: 'SOUND_SYSTEM', label: 'System audio' },
    { value: 'HOME_THEATER', label: 'Kino domowe' },
    { value: 'MEDIA_PLAYER', label: 'Odtwarzacz multimedialny' },
    { value: 'GAME_CONSOLE', label: 'Konsola do gier' },

    { value: 'REFRIGERATOR', label: 'Lodówka' },
    { value: 'DISHWASHER', label: 'Zmywarka' },
    { value: 'WASHING_MACHINE', label: 'Pralka' },
    { value: 'DRYER', label: 'Suszarka' },
    { value: 'OVEN', label: 'Piekarnik' },
    { value: 'MICROWAVE', label: 'Mikrofalówka' },
    { value: 'COFFEE_MACHINE', label: 'Ekspres do kawy' },
    { value: 'KETTLE', label: 'Czajnik' },
    { value: 'TOASTER', label: 'Toster' },
    { value: 'BLENDER', label: 'Blender' },
    { value: 'VACUUM_CLEANER', label: 'Odkurzacz' },
    { value: 'IRON', label: 'Żelazko' },
    { value: 'AIR_PURIFIER', label: 'Oczyszczacz powietrza' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.route.queryParams.subscribe(params => {
      this.selectedCategoryId = params['categoryId'] || '';
      this.loadProducts();
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Błąd pobierania kategorii:', err);
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania produktów:', err);
        this.error = 'Nie udało się pobrać produktów z backendu.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    let result = this.products.filter(product => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        (product.description ?? '').toLowerCase().includes(search);

      const matchesCategory =
        !this.selectedCategoryId ||
        String(product.categoryId) === String(this.selectedCategoryId);

      const matchesType =
        !this.selectedProductType ||
        product.productType === this.selectedProductType;

      const matchesMinPrice =
        this.minPrice === null || this.minPrice === undefined || product.price >= this.minPrice;

      const matchesMaxPrice =
        this.maxPrice === null || this.maxPrice === undefined || product.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesType && matchesMinPrice && matchesMaxPrice;
    });

    if (this.sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (this.sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategoryId = '';
    this.selectedProductType = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.sortOption = '';
    this.applyFilters();
  }
}
