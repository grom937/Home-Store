import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/pages/home/home.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/pages/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/pages/cart/cart.component')
        .then(m => m.CartComponent)
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/pages/order-history/order-history.component')
        .then(m => m.OrderHistoryComponent)
  },
  {
    path: 'admin/products',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/products/pages/product-manage/product-manage.component')
        .then(m => m.ProductManageComponent)
  },
  {
    path: 'admin/orders',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/admin/pages/order-manage/order-manage.component')
        .then(m => m.OrderManageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
