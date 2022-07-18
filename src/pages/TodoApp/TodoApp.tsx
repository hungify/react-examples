import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const handleTodoSubmit = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const todo = {
      id: new Date().getTime(),
      text,
      completed: false,
    };
    setTodos([...todos, todo]);
    setText('');
  };

  const handleTodoClick = (id: number, mousePosition: 'left' | 'right') => {
    if (mousePosition === 'right') {
      const newTodods = todos.filter((todo) => todo.id !== id);
      setTodos(newTodods);
    } else {
      const todosFilter = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
      setTodos(todosFilter);
    }
  };

  return (
    <div className="h-screen bg-[#f5f5f5] text-[#444] flex flex-col items-center justify-center">
      <h1 className="text-[10rem] opacity-40 text-center text-purple-500 font-medium">todos</h1>
      <div className="w-[400px] max-w-full shadow-xl">
        <form onSubmit={handleTodoSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            spellCheck="false"
            className="w-full px-8 py-4 border-none text-[#444] text-3xl focus:outline-purple-500"
          />
        </form>
        <TodoList todos={todos} onTodoClick={handleTodoClick} />
      </div>
      <small className="text-[#b5b5b5] mt-12 text-center">
        Left click to toggle completed.
        <br />
        Right click to delete todo
      </small>
    </div>
  );
}

interface TodoListProps {
  todos: Todo[];
  onTodoClick: (id: number, mousePosition: 'left' | 'right') => void;
}

function TodoList({ todos, onTodoClick }: TodoListProps) {
  return (
    <ul className="bg-white">
      {todos?.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} onTodoClick={onTodoClick} />
      ))}
    </ul>
  );
}

interface TodoItemProps {
  todo: Todo;
  onTodoClick: (id: number, mousePosition: 'left' | 'right') => void;
}

function TodoItem({ todo, onTodoClick }: TodoItemProps) {
  const { id, text, completed } = todo;

  const handleTodoClick = (id: number) => (evt: React.MouseEvent<HTMLLIElement>) => {
    if (evt.button === 0) {
      onTodoClick(id, 'left');
    } else if (evt.button === 2) {
      onTodoClick(id, 'right');
    }
  };

  return (
    <li
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={handleTodoClick(id)}
      className={`px-8 py-4 text-2xl border-t-2 border-gray-300 ${
        completed ? 'text-[#b6b6b6] line-through' : ''
      }`}
    >
      {text}
    </li>
  );
}
