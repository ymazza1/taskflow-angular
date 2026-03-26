import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { taskResolver } from './features/board/task.resolver';

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
        resolve: { task: taskResolver },
        canDeactivate: [unsavedChangesGuard],
      },
    ],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
