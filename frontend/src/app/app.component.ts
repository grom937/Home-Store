import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationStart } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private navigationSubscription?: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.dialog.closeAll();

        const overlayElement = this.overlayContainer.getContainerElement();

        overlayElement
          .querySelectorAll('.cdk-overlay-backdrop, .cdk-overlay-pane')
          .forEach(element => element.remove());
      });
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }
}
