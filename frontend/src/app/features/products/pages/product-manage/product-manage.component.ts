import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { LanguageService } from '../../../../core/services/language.service';
import { Product } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

type ProductTypeOption = {
  value: string;
  labelPl: string;
  labelEn: string;
};

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.css'
})
export class ProductManageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  editingProductId: string | null = null;
  searchTerm = '';

  productTypes: ProductTypeOption[] = [
    { value: 'LIVING_ROOM_SOFA', labelPl: 'Sofa do salonu', labelEn: 'Living room sofa' },
    { value: 'LIVING_ROOM_COFFEE_TABLE', labelPl: 'Stolik kawowy do salonu', labelEn: 'Living room coffee table' },
    { value: 'LIVING_ROOM_BOOKCASE', labelPl: 'Regał do salonu', labelEn: 'Living room bookcase' },
    { value: 'LIVING_ROOM_ARMCHAIR', labelPl: 'Fotel do salonu', labelEn: 'Living room armchair' },

    { value: 'BEDROOM_BED', labelPl: 'Łóżko do sypialni', labelEn: 'Bedroom bed' },
    { value: 'BEDROOM_WARDROBE', labelPl: 'Szafa do sypialni', labelEn: 'Bedroom wardrobe' },
    { value: 'BEDROOM_CHEST_OF_DRAWERS', labelPl: 'Komoda do sypialni', labelEn: 'Bedroom chest of drawers' },
    { value: 'BEDROOM_NIGHT_STAND', labelPl: 'Szafka nocna', labelEn: 'Nightstand' },

    { value: 'KITCHEN_TABLE', labelPl: 'Stół kuchenny', labelEn: 'Kitchen table' },
    { value: 'KITCHEN_CHAIR', labelPl: 'Krzesło kuchenne', labelEn: 'Kitchen chair' },
    { value: 'KITCHEN_SINK', labelPl: 'Zlew kuchenny', labelEn: 'Kitchen sink' },
    { value: 'KITCHEN_CABINET', labelPl: 'Szafka kuchenna', labelEn: 'Kitchen cabinet' },
    { value: 'KITCHEN_BAR_STOOL', labelPl: 'Hoker kuchenny', labelEn: 'Kitchen bar stool' },

    { value: 'BATHROOM_SINK_CABINET', labelPl: 'Szafka pod umywalkę', labelEn: 'Sink cabinet' },
    { value: 'BATHROOM_BATH', labelPl: 'Wanna', labelEn: 'Bathtub' },
    { value: 'BATHROOM_STORAGE_CABINET', labelPl: 'Szafka łazienkowa', labelEn: 'Bathroom cabinet' },
    { value: 'BATHROOM_SHELF', labelPl: 'Półka łazienkowa', labelEn: 'Bathroom shelf' },
    { value: 'BATHROOM_LAUNDRY_BASKET', labelPl: 'Kosz na pranie', labelEn: 'Laundry basket' },

    { value: 'OFFICE_DESK', labelPl: 'Biurko', labelEn: 'Desk' },
    { value: 'OFFICE_CHAIR', labelPl: 'Krzesło biurowe', labelEn: 'Office chair' },
    { value: 'OFFICE_BOOKCASE', labelPl: 'Regał biurowy', labelEn: 'Office bookcase' },
    { value: 'OFFICE_FILE_CABINET', labelPl: 'Szafka na dokumenty', labelEn: 'File cabinet' },

    { value: 'HALLWAY_SHOE_CABINET', labelPl: 'Szafka na buty', labelEn: 'Shoe cabinet' },
    { value: 'HALLWAY_COAT_RACK', labelPl: 'Wieszak do przedpokoju', labelEn: 'Coat rack' },
    { value: 'HALLWAY_BENCH', labelPl: 'Ławka do przedpokoju', labelEn: 'Hallway bench' },
    { value: 'HALLWAY_MIRROR', labelPl: 'Lustro do przedpokoju', labelEn: 'Hallway mirror' },

    { value: 'TELEVISION', labelPl: 'Telewizor', labelEn: 'TV' },
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

  productForm: ReturnType<FormBuilder['group']>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      productType: ['LIVING_ROOM_SOFA', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;

        if (data.length > 0 && !this.productForm.get('categoryId')?.value) {
          this.productForm.patchValue({
            categoryId: data[0].id
          });
        }
      },
      error: () => {
        this.snackBar.open(this.languageService.t('categoryLoadErrorShort'), 'OK', {
          duration: 3000
        });
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applySearch();
      },
      error: () => {
        this.snackBar.open(this.languageService.t('productsLoadErrorShort'), 'OK', {
          duration: 3000
        });
      }
    });
  }

  applySearch(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      const translatedName = this.languageService.productName(product.name).toLowerCase();
      const translatedDescription = this.languageService.productDescription(product.description).toLowerCase();

      return !search ||
        product.name.toLowerCase().includes(search) ||
        (product.description ?? '').toLowerCase().includes(search) ||
        translatedName.includes(search) ||
        translatedDescription.includes(search);
    });
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();

      this.snackBar.open(this.languageService.t('fillFormCorrectly'), 'OK', {
        duration: 3000
      });
      return;
    }

    const formValue = this.productForm.getRawValue();

    const productPayload = {
      name: formValue.name?.trim() ?? '',
      description: formValue.description?.trim() || '',
      price: Number(formValue.price),
      quantity: Number(formValue.quantity),
      imageUrl: formValue.imageUrl?.trim() || '',
      productType: formValue.productType ?? 'LIVING_ROOM_SOFA',
      categoryId: formValue.categoryId ?? ''
    };

    if (this.editingProductId) {
      this.productService.update(this.editingProductId, productPayload).subscribe({
        next: () => {
          this.snackBar.open(this.languageService.t('productUpdated'), 'OK', {
            duration: 3000
          });

          this.cancelEdit();
          this.loadProducts();
        },
        error: () => {
          this.snackBar.open(this.languageService.t('productUpdateError'), 'OK', {
            duration: 3000
          });
        }
      });

      return;
    }

    this.productService.create(productPayload).subscribe({
      next: () => {
        this.snackBar.open(this.languageService.t('productAdded'), 'OK', {
          duration: 3000
        });

        this.resetForm();
        this.loadProducts();
      },
      error: () => {
        this.snackBar.open(this.languageService.t('productAddError'), 'OK', {
          duration: 3000
        });
      }
    });
  }

  startEdit(product: Product): void {
    this.editingProductId = product.id ?? null;

    this.productForm.patchValue({
      name: product.name,
      description: product.description ?? '',
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl ?? '',
      productType: product.productType,
      categoryId: product.categoryId
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingProductId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.productForm.reset({
      name: '',
      description: '',
      price: null,
      quantity: 0,
      imageUrl: '',
      productType: 'LIVING_ROOM_SOFA',
      categoryId: this.categories.length > 0 ? this.categories[0].id : ''
    });
  }

  deleteProduct(id?: string): void {
    if (!id) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      autoFocus: false,
      restoreFocus: false,
      data: {
        message: this.languageService.t('confirmDeleteProductMessage')
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.snackBar.open(this.languageService.t('productDeleted'), 'OK', {
              duration: 3000
            });

            this.loadProducts();
          },
          error: () => {
            this.snackBar.open(this.languageService.t('productDeleteError'), 'OK', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  getCategoryName(categoryId: string): string {
    const found = this.categories.find((category) => category.id === categoryId);
    return found ? this.languageService.categoryName(found.name) : this.languageService.t('unknownCategory');
  }

  getProductTypeOptionLabel(type: ProductTypeOption): string {
    return this.languageService.currentLanguage === 'en' ? type.labelEn : type.labelPl;
  }

  getProductTypeLabel(productType: string): string {
    const found = this.productTypes.find((type) => type.value === productType);
    return found ? this.getProductTypeOptionLabel(found) : productType;
  }
}
