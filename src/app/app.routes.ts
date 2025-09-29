import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Authors } from './features/authors/authors';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'authors',
    component: Authors,
  },
];
