import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: 'board',
    loadComponent: () => import('./features/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
