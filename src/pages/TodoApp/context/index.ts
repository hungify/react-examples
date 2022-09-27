import { TodoCtx } from './TodoProvider';
import { useContext } from 'react';

export default function useTodo() {
  const todoCtx = useContext(TodoCtx);
  if (!todoCtx) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return todoCtx;
}
