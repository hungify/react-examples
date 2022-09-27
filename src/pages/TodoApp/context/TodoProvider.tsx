import { createContext } from 'react';
import useTodoReducer from './useTodoReducer';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todo: Todo[];
}

type TodoContext = ReturnType<typeof useTodoReducer>;

const initialState: TodoState = {
  todo: [],
};

export const TodoCtx = createContext<TodoContext>({
  state: initialState,
  addTodo: (todo: Todo) => undefined,
  removeTodo: (id: number) => undefined,
  completeTodo: (id: number) => undefined,
  editTodo: (id: number, text: string) => undefined,
  dispatch: () => undefined,
});
TodoCtx.displayName = 'TodoContext';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TodoCtx.Provider value={useTodoReducer(initialState)}>
      {children}
    </TodoCtx.Provider>
  );
};
