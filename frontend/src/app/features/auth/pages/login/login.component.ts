import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

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
    private router: Router,
    public languageService: LanguageService
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
      next: () => {
        this.successMessage = this.languageService.t('loginSuccess');
        this.isSubmitting = false;

        const currentUser = this.authService.getCurrentUser();

        if (currentUser?.role === 'ADMIN') {
          this.router.navigateByUrl('/admin/products');
          return;
        }

        this.router.navigateByUrl('/');
      },
      error: (_error: HttpErrorResponse) => {
        this.errorMessage = this.languageService.t('loginError');
        this.isSubmitting = false;
      }
    });
  }
}
