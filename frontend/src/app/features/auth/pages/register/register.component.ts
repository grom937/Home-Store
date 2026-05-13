import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage = this.languageService.t('passwordsDoNotMatch');
      return;
    }

    this.isSubmitting = true;

    this.authService.register({
      email: formValue.email ?? '',
      password: formValue.password ?? '',
      confirmPassword: formValue.confirmPassword ?? ''
    }).subscribe({
      next: () => {
        this.successMessage = this.languageService.t('registerSuccess');
        this.registerForm.reset();
        this.isSubmitting = false;
        this.router.navigateByUrl('/account');
      },
      error: (_error: HttpErrorResponse) => {
        this.errorMessage = this.languageService.t('registerError');
        this.isSubmitting = false;
      }
    });
  }
}
