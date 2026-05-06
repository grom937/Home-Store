import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dialog.closeAll();

    document.querySelectorAll('.cdk-overlay-backdrop, .cdk-overlay-pane')
      .forEach(el => el.remove());

    document.body.classList.remove('cdk-global-scrollblock');
  }

  logout(): void {
    this.dialog.closeAll();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
