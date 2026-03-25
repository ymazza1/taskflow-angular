import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../../models/task.model';

export const TaskActions = createActionGroup({
  source: 'Tasks',

  events: {
    'Load Tasks': emptyProps(),
    'Load Task Success': props<{ tasks: Task[] }>(),
    'Add Task': props<{ title: string; description?: string; columnId: string }>(),
    'Delete Task': props<{ id: string }>(),
  },
});
