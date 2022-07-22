import { TodoAction, TodoActionType } from 'pages/TodoApp/context/todoAction';
import { Todo, TodoState } from 'pages/TodoApp/context/TodoProvider';
import { useCallback, useReducer } from 'react';

export type Dispatch = (action: TodoAction) => void;

function TodoReducer(state: TodoState, action: TodoAction) {
  switch (action.type) {
    case TodoActionType.addTodo:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };

    case TodoActionType.removeTodo:
      const filterTodo = state.todo.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todo: filterTodo,
      };

    case TodoActionType.completeTodo:
      const todoCompleted = state.todo.find((todo) => todo.id === action.payload);
      if (todoCompleted) {
        todoCompleted.completed = !todoCompleted.completed;
      }
      return {
        ...state,
        todo: [...state.todo],
      };

    case TodoActionType.editTodo:
      const todoEdit = state.todo.find((todo) => todo.id === action.payload.id);
      if (todoEdit) {
        todoEdit.text = action.payload.text;
      }
      return {
        ...state,
        todo: [...state.todo],
      };
    default:
      return state;
  }
}

export default function useTodoReducer(initialState: TodoState) {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const _handleAddTodo = (todo: Todo) => {
    console.log('add');
    dispatch({ type: TodoActionType.addTodo, payload: todo });
  };

  const _handleRemoveTodo = useCallback((id: number) => {
    console.log('remove');
    dispatch({ type: TodoActionType.removeTodo, payload: id });
  }, []);

  const _handleCompleteTodo = useCallback((id: number) => {
    console.log('complete');
    dispatch({ type: TodoActionType.completeTodo, payload: id });
  }, []);

  const _handleEditTodo = useCallback((id: number, text: string) => {
    console.log('edit');
    dispatch({ type: TodoActionType.editTodo, payload: { id, text } });
  }, []);

  return {
    state,
    dispatch,
    addTodo: _handleAddTodo,
    removeTodo: _handleRemoveTodo,
    completeTodo: _handleCompleteTodo,
    editTodo: _handleEditTodo,
  };
}
