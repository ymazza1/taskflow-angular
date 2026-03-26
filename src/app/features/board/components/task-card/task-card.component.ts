import { Component, input, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Task } from '../../../../models/task.model';
import { TaskActions } from '../../store/task.actions';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  imports: [RouterLink, DatePipe],
})
export class TaskCardComponent {
  private store = inject(Store);

  task = input.required<Task>();

  deleteTask(taskId: string) {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }
}
