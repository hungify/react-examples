import { TodoCtx } from 'pages/TodoApp/context/TodoProvider';
import { useContext } from 'react';
export { TodoProvider } from 'pages/TodoApp/context/TodoProvider';

export default function useTodo() {
  const todoCtx = useContext(TodoCtx);
  if (!todoCtx) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return todoCtx;
}
