import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/pages/home/home.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';

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
    path: 'admin/products',
    loadComponent: () =>
      import('./features/products/pages/product-manage/product-manage.component')
        .then(m => m.ProductManageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
