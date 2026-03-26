import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnComponent } from './components/column/column.component';
import { Task, Column, DEFAULT_COLUMNS, createTask } from '../../models/task.model';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { Store } from '@ngrx/store';
import { TaskActions } from './store/task.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllTasks } from './store/task.selectors';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ColumnComponent, TaskFormComponent, RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private store = inject(Store);
  private announcer = inject(LiveAnnouncer);

  tasks = toSignal(this.store.select(selectAllTasks), { initialValue: [] });

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  columns = DEFAULT_COLUMNS;

  getTasksByColumnId(columnId: string) {
    return computed(() => this.tasks().filter((task) => task.columnId === columnId));
  }

  totalTasks = computed(() => this.tasks().length);

  completedTasks = this.getTasksByColumnId('done');

  completedPercentage = computed(() => {
    return Math.round((this.completedTasks().length / this.totalTasks()) * 100);
  });

  showTaskForm = signal(false);

  onCreatedTask(data: { title: string; description?: string; columnId: string }) {
    this.showTaskForm.set(false);
    this.store.dispatch(TaskActions.addTask(data));
    this.announcer.announce('La tache a été ajoutée');
  }
}
