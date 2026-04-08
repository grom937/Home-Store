import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/pages/home/home.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
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
