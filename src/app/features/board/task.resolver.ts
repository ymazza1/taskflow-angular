import { ResolveFn } from '@angular/router';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { selectAllTasks, selectTaskLoading } from './store/task.selectors';
import { first, map, tap, filter } from 'rxjs';
import { TaskActions } from './store/task.actions';

export const taskResolver: ResolveFn<Task | undefined> = (route) => {
  const store = inject(Store);

  const taskId = route.paramMap.get('id');

  return store.select(selectTaskLoading).pipe(
    tap((loading) => {
      if (loading === false) {
        store
          .select(selectAllTasks)
          .pipe(first())
          .subscribe((tasks) => {
            if (tasks.length === 0) {
              store.dispatch(TaskActions.loadTasks());
            }
          });
      }
    }),

    filter((loading) => !loading),

    first(),

    map(() => {
      let foundTask: Task | undefined;
      store
        .select(selectAllTasks)
        .pipe(first())
        .subscribe((tasks) => {
          foundTask = tasks.find((task) => task.id === taskId);
        });
      return foundTask;
    }),
  );
};
