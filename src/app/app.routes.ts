import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './guards/usaved-changes.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: 'board',
    loadComponent: () => import('./features/board/board.component').then((m) => m.BoardComponent),
    children: [
      {
        path: 'task/:id',
        loadComponent: () =>
          import('./features/board/task-detail/task-detail.component').then(
            (m) => m.TaskDetailComponent,
          ),
        // resolve: { task: taskResolver }, // à implémenter
        canDeactivate: [unsavedChangesGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
