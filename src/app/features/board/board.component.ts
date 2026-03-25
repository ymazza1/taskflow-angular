import { Component, computed, signal } from '@angular/core';
import { ColumnComponent } from './components/column/column.component';
import { Task, Column, DEFAULT_COLUMNS, createTask } from '../../models/task.model';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ColumnComponent, TaskFormComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  tasks = signal<Task[]>([
    createTask({ title: 'Apprendre les Signals', columnId: 'todo' }),
    createTask({
      title: 'Tache test',
      columnId: 'done',
      description: 'ma super description',
    }),
    createTask({
      title: 'Tache test 2',
      columnId: 'done',
    }),
  ]);

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
    this.tasks().push(
      createTask({
        title: data.title,
        description: data.description,
        columnId: data.columnId,
      }),
    );
  }
}
