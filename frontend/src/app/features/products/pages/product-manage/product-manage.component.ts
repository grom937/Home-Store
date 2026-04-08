import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Product } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.css'
})
export class ProductManageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

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

  productForm: ReturnType<FormBuilder['group']>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
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
        this.snackBar.open('Błąd ładowania kategorii', 'OK', {
          duration: 3000
        });
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.snackBar.open('Błąd ładowania produktów', 'OK', {
          duration: 3000
        });
      }
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();

      this.snackBar.open('Uzupełnij poprawnie formularz', 'OK', {
        duration: 3000
      });
      return;
    }

    const formValue = this.productForm.getRawValue();

    const productToCreate = {
      name: formValue.name?.trim() ?? '',
      description: formValue.description?.trim() || '',
      price: Number(formValue.price),
      quantity: Number(formValue.quantity),
      imageUrl: formValue.imageUrl?.trim() || '',
      productType: formValue.productType ?? 'LIVING_ROOM_SOFA',
      categoryId: formValue.categoryId ?? ''
    };

    this.productService.create(productToCreate).subscribe({
      next: () => {
        this.snackBar.open('Produkt został dodany', 'OK', {
          duration: 3000
        });

        this.loadProducts();

        this.productForm.reset({
          name: '',
          description: '',
          price: null,
          quantity: 0,
          imageUrl: '',
          productType: 'LIVING_ROOM_SOFA',
          categoryId: this.categories.length > 0 ? this.categories[0].id : ''
        });
      },
      error: () => {
        this.snackBar.open('Błąd dodawania produktu', 'OK', {
          duration: 3000
        });
      }
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
        message: 'Czy na pewno chcesz usunąć ten produkt? Tej operacji nie można cofnąć.'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Produkt został usunięty', 'OK', {
              duration: 3000
            });

            this.loadProducts();
          },
          error: () => {
            this.snackBar.open('Błąd usuwania produktu', 'OK', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  getCategoryName(categoryId: string): string {
    const found = this.categories.find((category) => category.id === categoryId);
    return found ? found.name : 'Nieznana kategoria';
  }

  getProductTypeLabel(productType: string): string {
    const found = this.productTypes.find((type) => type.value === productType);
    return found ? found.label : productType;
  }
}
