export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  order: number;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export function createTask(partial: Partial<Task>): Task {
  return {
    id: crypto.randomUUID(),
    title: partial.title || 'Nouvelle tache',
    description: partial.description,
    columnId: partial.columnId || 'todo',
    order: partial.order || 0,
    createdAt: new Date(),
    ...partial,
  };
}

export const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'A faire',
    order: 0,
  },
  {
    id: 'doing',
    title: 'En cours',
    order: 1,
  },
  {
    id: 'done',
    title: 'Fait',
    order: 2,
  },
];

export interface TaskData {
  title: string;
  description: string;
  selectedColumnId: string;
}
