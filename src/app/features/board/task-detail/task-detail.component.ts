import { Component, inject, signal, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { HasUnsavedChanges } from '../../../guards/unsaved-changes.guard';
import { TaskActions } from '../store/task.actions';
import { Store } from '@ngrx/store';
import { title } from 'process';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements HasUnsavedChanges {
  private store = inject(Store);
  private router = inject(Router);

  task = input<Task | null>(null);

  private changed = signal(false);

  editedTitle = '';
  editedDescription = '';

  markAsChanged() {
    this.changed.set(true);
  }

  hasunsavedChanges(): boolean {
    return this.changed();
  }

  save() {
    const taskToChange = this.task();
    if (!taskToChange) return;

    this.store.dispatch(
      TaskActions.updateTask({
        id: taskToChange.id,
        changes: {
          title: this.editedTitle,
          description: this.editedDescription,
        },
      }),
    );

    this.changed.set(false);
  }

  goBack() {
    console.log('changed: ', this.changed());

    this.router.navigate(['/board']);
  }
}
