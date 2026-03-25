import { Component, input, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Task } from '../../../../models/task.model';
import { TaskActions } from '../../store/task.actions';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  private store = inject(Store);

  task = input.required<Task>();

  deleteTask(taskId: string) {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }
}
