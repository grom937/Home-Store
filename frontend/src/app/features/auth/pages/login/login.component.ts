import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.getRawValue();

    this.isSubmitting = true;

    this.authService.login({
      email: formValue.email ?? '',
      password: formValue.password ?? ''
    }).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Zalogowano pomyślnie.';
        this.isSubmitting = false;

        if (response.role === 'ADMIN') {
          this.router.navigateByUrl('/admin/products');
          return;
        }

        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message || 'Wystąpił błąd podczas logowania.';
        this.isSubmitting = false;
      }
    });
  }
}
