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
  productForm: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      productType: ['LIVING_ROOM_SOFA', Validators.required],
      categoryId: ['', Validators.required]
    });
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
      this.snackBar.open('Popraw formularz', 'OK', {
        duration: 3000
      });
      return;
    }

    const formValue = this.productForm.getRawValue();

    if (
      !formValue.name ||
      formValue.price === null ||
      formValue.quantity === null ||
      !formValue.productType ||
      !formValue.categoryId
    ) {
      this.snackBar.open('Brakuje wymaganych danych', 'OK', {
        duration: 3000
      });
      return;
    }

    const productToCreate = {
      name: formValue.name,
      description: formValue.description ?? '',
      price: formValue.price,
      quantity: formValue.quantity,
      imageUrl: formValue.imageUrl ?? '',
      productType: formValue.productType,
      categoryId: formValue.categoryId
    };

    this.productService.create(productToCreate).subscribe({
      next: () => {
        this.snackBar.open('Produkt dodany', 'OK', {
          duration: 3000
        });

        this.loadProducts();

        this.productForm.reset({
          name: '',
          description: '',
          price: 0,
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
      data: {
        message: 'Czy na pewno chcesz usunąć produkt?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Usunięto produkt', 'OK', {
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
    const found = this.categories.find(category => category.id === categoryId);
    return found ? found.name : categoryId;
  }
}
