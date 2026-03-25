import { Component, input } from '@angular/core';
import { Column, Task } from '../../../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  column = input.required<Column>();
  tasks = input.required<Task[]>();
}
