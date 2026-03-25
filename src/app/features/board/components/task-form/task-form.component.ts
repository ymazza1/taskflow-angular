import { Component, input, model, output } from '@angular/core';
import { Column } from '../../../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  columns = input.required<Column[]>();

  cancelled = output<void>();
  createdTask = output<{ title: string; description?: string; columnId: string }>();

  title = '';
  description = '';
  selectedColumnId = '';

  onCancel() {
    this.cancelled.emit();
  }

  isValid(): boolean {
    return this.title.trim().length > 0 && this.selectedColumnId.length > 0;
  }

  onSubmit() {
    if (!this.isValid()) return;

    this.createdTask.emit({
      title: this.title.trim(),
      description: this.description || undefined,
      columnId: this.selectedColumnId,
    });
  }
}
