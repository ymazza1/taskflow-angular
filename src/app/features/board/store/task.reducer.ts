import { createReducer, on, State } from '@ngrx/store';
import { createTask, Task } from '../../../models/task.model';
import { TaskActions } from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.addTask, (state, { title, description, columnId }) => {
    const newTask = createTask({
      title,
      description,
      columnId,
    });

    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }),

  on(TaskActions.loadTasks, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(TaskActions.loadTaskSuccess, (state, { tasks }) => {
    return {
      ...state,
      tasks,
      loading: false,
    };
  }),
);
