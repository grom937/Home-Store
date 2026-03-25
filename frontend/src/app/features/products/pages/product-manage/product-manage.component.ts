import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

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
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  products: Product[] = [];
  productForm: any;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      productType: ['PHYSICAL', Validators.required],
      categoryId: [1, Validators.required]
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: () => {
        this.snackBar.open('Błąd ładowania produktów ❌', 'OK', {
          duration: 3000
        });
      }
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.snackBar.open('Popraw formularz ❌', 'OK', {
        duration: 3000
      });
      return;
    }

    this.productService.create(this.productForm.value).subscribe({
      next: () => {
        this.snackBar.open('Produkt dodany ✅', 'OK', {
          duration: 3000
        });

        this.loadProducts();
        this.productForm.reset({
          productType: 'PHYSICAL',
          categoryId: 1
        });
      },
      error: () => {
        this.snackBar.open('Błąd dodawania ❌', 'OK', {
          duration: 3000
        });
      }
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Czy na pewno chcesz usunąć produkt?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Usunięto produkt 🗑️', 'OK', {
              duration: 3000
            });

            this.loadProducts();
          },
          error: () => {
            this.snackBar.open('Błąd usuwania ❌', 'OK', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}
