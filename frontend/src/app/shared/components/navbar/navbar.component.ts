import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  navigateTo(path: string): void {
    this.dialog.closeAll();
    this.router.navigateByUrl(path);
  }

  logout(): void {
    this.dialog.closeAll();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
