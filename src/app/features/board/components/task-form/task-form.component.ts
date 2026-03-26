import { Component, input, model, output, signal } from '@angular/core';
import { Column, Task, TaskData } from '../../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { form, required, FormField, max, maxLength } from '@angular/forms/signals';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, FormField, A11yModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  columns = input.required<Column[]>();
  cancelled = output<void>();
  createdTask = output<{ title: string; description?: string; columnId: string }>();

  taskModel = signal<TaskData>({
    title: '',
    description: '',
    selectedColumnId: '',
  });

  form = form(this.taskModel, (path) => {
    required(path.title);
    maxLength(path.description, 10, { message: 'description trop longue' });
    required(path.selectedColumnId);
  });

  onCancel() {
    this.cancelled.emit();
    this.form().reset();
  }

  isValid(): boolean {
    return (
      this.form().value().title.trim().length > 0 && this.form().value().selectedColumnId.length > 0
    );
  }

  onSubmit() {
    if (!this.form().valid()) return;

    this.createdTask.emit({
      title: this.form().value().title.trim(),
      description: this.form().value().description || undefined,
      columnId: this.form().value().selectedColumnId,
    });
  }
}
