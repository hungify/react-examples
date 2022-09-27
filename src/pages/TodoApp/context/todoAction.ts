import type { Todo } from './TodoProvider';

export enum TodoActionType {
  addTodo = 'add/todo',
  removeTodo = 'remove/todo',
  editTodo = 'edit/todo',
  completeTodo = 'complete/todo',
}

interface addTodo {
  type: TodoActionType.addTodo;
  payload: Todo;
}

interface removeTodo {
  type: TodoActionType.removeTodo;
  payload: number;
}

interface editTodo {
  type: TodoActionType.editTodo;
  payload: {
    id: number;
    text: string;
  };
}

interface completeTodo {
  type: TodoActionType.completeTodo;
  payload: number;
}

export type TodoAction = addTodo | removeTodo | editTodo | completeTodo;
