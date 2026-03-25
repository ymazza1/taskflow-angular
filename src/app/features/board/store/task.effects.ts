import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskActions } from './task.actions';
import { delay, map } from 'rxjs';
import { createTask } from '../../../models/task.model';

export class TaskEffects {
  private actions = inject(Actions);

  loadTasks = createEffect(() =>
    this.actions.pipe(
      ofType(TaskActions.loadTasks),

      map(() => {
        const mockTasks = [
          createTask({
            title: 'Apprendre les signals',
            columnId: 'doing',
          }),
          createTask({
            title: 'Apprendre NgRX',
            columnId: 'doing',
          }),
          createTask({
            title: 'prendre un café',
            columnId: 'done',
          }),
        ];
        return TaskActions.loadTaskSuccess({ tasks: mockTasks });
      }),
    ),
  );
}
