import useTodo from 'pages/TodoApp/context';
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [text, setText] = useState('');
  const { addTodo, removeTodo, completeTodo, editTodo } = useTodo();

  const handleTodoSubmit = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (text) {
      const todo = {
        id: new Date().getTime(),
        text,
        completed: false,
      };
      addTodo(todo);
      setText('');
    }
  };

  const handleTodoClick = (id: number, mousePosition: 'left' | 'right') => {
    if (mousePosition === 'right') {
      removeTodo(id);
    } else {
      completeTodo(id);
    }
  };

  const handleTodoDoubleClick = (id: number, text: string) => {
    editTodo(id, text);
  };

  return (
    <div className="h-screen bg-[#f5f5f5] text-[#444] flex flex-col items-center justify-start">
      <h1 className="text-[9rem] opacity-40 text-center text-purple-500 font-medium">todos</h1>
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
        <TodoList onTodoClick={handleTodoClick} onTodoDoubleClick={handleTodoDoubleClick} />
      </div>
      <small className="text-[#b5b5b5] mt-12 text-center">
        Left click to toggle completed.
        <br />
        Right click to delete todo
        <br />
        Double click to edit todo
      </small>
    </div>
  );
}

interface TodoListProps {
  onTodoDoubleClick: (id: number, text: string) => void;
  onTodoClick: (id: number, mousePosition: 'left' | 'right') => void;
}

function TodoList({ onTodoClick, onTodoDoubleClick }: TodoListProps) {
  const {
    state: { todo },
  } = useTodo();

  return (
    <ul className="bg-white">
      {todo?.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoClick={onTodoClick}
          onTodoDoubleClick={onTodoDoubleClick}
        />
      ))}
    </ul>
  );
}

interface TodoItemProps {
  todo: Todo;
  onTodoClick: (id: number, mousePosition: 'left' | 'right') => void;
  onTodoDoubleClick: (id: number, text: string) => void;
}

function TodoItem({ todo, onTodoClick, onTodoDoubleClick }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, text, completed } = todo;
  let timer: NodeJS.Timeout | null = null;

  const handleTodoClick = (id: number) => (evt: React.MouseEvent<HTMLLIElement>) => {
    if (evt.detail === 1 && !isEditing) {
      timer = setTimeout(() => {
        if (evt.button === 0) {
          onTodoClick(id, 'left');
        } else if (evt.button === 2) {
          onTodoClick(id, 'right');
        }
      }, 400);
    }
  };

  const handleTodoDoubleClick = (id: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    setIsEditing(true);
  };

  const handleTodoChange = (id: number) => (evt: React.KeyboardEvent<HTMLLIElement>) => {
    const value = evt.currentTarget.textContent;
    const key = evt.key;
    if (value) {
      if (key === 'Enter') {
        onTodoDoubleClick(id, value);
        setIsEditing(false);
      }
    }
  };

  return (
    <li
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={handleTodoClick(id)}
      onDoubleClick={() => handleTodoDoubleClick(id)}
      className={`px-8 py-4 outline-1 outline-teal-500 text-2xl border-t-2 border-gray-300 ${
        completed ? 'text-[#b6b6b6] line-through' : ''
      }`}
      contentEditable={isEditing && !completed}
      onKeyDown={handleTodoChange(id)}
      suppressContentEditableWarning={true}
    >
      {text}
    </li>
  );
}
