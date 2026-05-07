import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { LanguageService } from '../../../../core/services/language.service';
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
  public languageService = inject(LanguageService);

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
    { value: 'LIVING_ROOM_SOFA', labelPl: 'Sofa do salonu', labelEn: 'Living room sofa' },
    { value: 'LIVING_ROOM_COFFEE_TABLE', labelPl: 'Stolik kawowy', labelEn: 'Coffee table' },
    { value: 'LIVING_ROOM_BOOKCASE', labelPl: 'Regał do salonu', labelEn: 'Living room bookcase' },
    { value: 'LIVING_ROOM_ARMCHAIR', labelPl: 'Fotel do salonu', labelEn: 'Living room armchair' },

    { value: 'BEDROOM_BED', labelPl: 'Łóżko', labelEn: 'Bed' },
    { value: 'BEDROOM_WARDROBE', labelPl: 'Szafa', labelEn: 'Wardrobe' },
    { value: 'BEDROOM_CHEST_OF_DRAWERS', labelPl: 'Komoda', labelEn: 'Chest of drawers' },
    { value: 'BEDROOM_NIGHT_STAND', labelPl: 'Szafka nocna', labelEn: 'Nightstand' },

    { value: 'KITCHEN_TABLE', labelPl: 'Stół kuchenny', labelEn: 'Kitchen table' },
    { value: 'KITCHEN_CHAIR', labelPl: 'Krzesło kuchenne', labelEn: 'Kitchen chair' },
    { value: 'KITCHEN_SINK', labelPl: 'Zlew kuchenny', labelEn: 'Kitchen sink' },
    { value: 'KITCHEN_CABINET', labelPl: 'Szafka kuchenna', labelEn: 'Kitchen cabinet' },
    { value: 'KITCHEN_BAR_STOOL', labelPl: 'Hoker', labelEn: 'Bar stool' },

    { value: 'BATHROOM_SINK_CABINET', labelPl: 'Szafka pod umywalkę', labelEn: 'Sink cabinet' },
    { value: 'BATHROOM_BATH', labelPl: 'Wanna', labelEn: 'Bathtub' },
    { value: 'BATHROOM_STORAGE_CABINET', labelPl: 'Szafka łazienkowa', labelEn: 'Bathroom cabinet' },
    { value: 'BATHROOM_SHELF', labelPl: 'Półka łazienkowa', labelEn: 'Bathroom shelf' },
    { value: 'BATHROOM_LAUNDRY_BASKET', labelPl: 'Kosz na pranie', labelEn: 'Laundry basket' },

    { value: 'OFFICE_DESK', labelPl: 'Biurko', labelEn: 'Desk' },
    { value: 'OFFICE_CHAIR', labelPl: 'Fotel biurowy', labelEn: 'Office chair' },
    { value: 'OFFICE_BOOKCASE', labelPl: 'Regał biurowy', labelEn: 'Office bookcase' },
    { value: 'OFFICE_FILE_CABINET', labelPl: 'Szafka na dokumenty', labelEn: 'File cabinet' },

    { value: 'HALLWAY_SHOE_CABINET', labelPl: 'Szafka na buty', labelEn: 'Shoe cabinet' },
    { value: 'HALLWAY_COAT_RACK', labelPl: 'Wieszak', labelEn: 'Coat rack' },
    { value: 'HALLWAY_BENCH', labelPl: 'Ławka', labelEn: 'Bench' },
    { value: 'HALLWAY_MIRROR', labelPl: 'Lustro', labelEn: 'Mirror' },

    { value: 'TELEVISION', labelPl: 'Telewizor', labelEn: 'Television' },
    { value: 'SOUND_SYSTEM', labelPl: 'System audio', labelEn: 'Sound system' },
    { value: 'HOME_THEATER', labelPl: 'Kino domowe', labelEn: 'Home theater' },
    { value: 'MEDIA_PLAYER', labelPl: 'Odtwarzacz multimedialny', labelEn: 'Media player' },
    { value: 'GAME_CONSOLE', labelPl: 'Konsola do gier', labelEn: 'Game console' },

    { value: 'REFRIGERATOR', labelPl: 'Lodówka', labelEn: 'Refrigerator' },
    { value: 'DISHWASHER', labelPl: 'Zmywarka', labelEn: 'Dishwasher' },
    { value: 'WASHING_MACHINE', labelPl: 'Pralka', labelEn: 'Washing machine' },
    { value: 'DRYER', labelPl: 'Suszarka', labelEn: 'Dryer' },
    { value: 'OVEN', labelPl: 'Piekarnik', labelEn: 'Oven' },
    { value: 'MICROWAVE', labelPl: 'Mikrofalówka', labelEn: 'Microwave' },
    { value: 'COFFEE_MACHINE', labelPl: 'Ekspres do kawy', labelEn: 'Coffee machine' },
    { value: 'KETTLE', labelPl: 'Czajnik', labelEn: 'Kettle' },
    { value: 'TOASTER', labelPl: 'Toster', labelEn: 'Toaster' },
    { value: 'BLENDER', labelPl: 'Blender', labelEn: 'Blender' },
    { value: 'VACUUM_CLEANER', labelPl: 'Odkurzacz', labelEn: 'Vacuum cleaner' },
    { value: 'IRON', labelPl: 'Żelazko', labelEn: 'Iron' },
    { value: 'AIR_PURIFIER', labelPl: 'Oczyszczacz powietrza', labelEn: 'Air purifier' }
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

  getProductTypeLabel(type: { labelPl: string; labelEn: string }): string {
    return this.languageService.currentLanguage === 'pl' ? type.labelPl : type.labelEn;
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
        this.error = this.languageService.t('productsError');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    let result = this.products.filter(product => {
      const translatedName = this.languageService.productName(product.name).toLowerCase();
      const translatedDescription = this.languageService.productDescription(product.description).toLowerCase();

      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        translatedName.includes(search) ||
        (product.description ?? '').toLowerCase().includes(search) ||
        translatedDescription.includes(search);

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
