import { useEffect, useState } from 'react';
import {
  HiPlusCircle,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';

interface Note {
  id: number;
  title: string;
  body: string;
  editing: boolean;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(window.localStorage.getItem('notes') || '[]'),
  );

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNewNote = () => {
    setNotes([
      ...notes,
      {
        id: new Date().getTime(),
        title: 'Edit title here',
        body: 'Edit body here',
        editing: true,
      },
    ]);
  };

  const handleNoteRemove = (id: number) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleBodyChange = (id: number, value: string) => {
    const noteFound = notes.find((note) => note.id === id);
    if (noteFound) {
      noteFound.body = value;
      setNotes([...notes]);
    }
  };

  const handleNoteEdit = (id: number) => {
    const noteFound = notes.find((note) => note.id === id);
    if (noteFound) {
      noteFound.editing = !noteFound.editing;
      setNotes([...notes]);
    }
  };

  const handleTitleChange = (id: number, value: string) => {
    const noteFound = notes.find((note) => note.id === id);
    if (noteFound) {
      noteFound.title = value;
      setNotes([...notes]);
    }
  };

  return (
    <div className='pt-12 bg-[#7bdaf3] relative min-h-screen'>
      <button
        className='py-2 px-3 inline-flex items-center rounded-md bg-[#9ec862] text-white absolute top-2 right-2'
        onClick={handleCreateNewNote}
      >
        <HiPlusCircle />
        <span className='ml-1'>Add note</span>
      </button>
      <div
        className='grid'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        }}
      >
        {notes.map((note) => (
          <NoteCard
            id={note.id}
            editing={note.editing}
            key={note.id}
            title={note.title}
            body={note.body}
            onNoteChange={handleBodyChange}
            onNoteRemove={handleNoteRemove}
            onNoteEdit={handleNoteEdit}
            onTitleChange={handleTitleChange}
          />
        ))}
      </div>
    </div>
  );
}

interface NoteProps {
  id: number;
  editing: boolean;
  title: string;
  body: string;
  onNoteChange: (id: number, value: string) => void;
  onNoteRemove: (id: number) => void;
  onNoteEdit: (id: number) => void;
  onTitleChange: (id: number, value: string) => void;
}
function NoteCard({
  id,
  editing,
  title,
  body,
  onNoteChange,
  onNoteRemove,
  onNoteEdit,
  onTitleChange,
}: NoteProps) {
  const onBodyChange =
    (id: number) => (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target.value;
      if (editing) onNoteChange(id, value);
    };

  const onTitleNoteChange =
    (id: number) => (evt: React.ChangeEvent<HTMLSpanElement>) => {
      const value = evt.currentTarget.textContent;
      if (value) {
        onTitleChange(id, value);
      }
    };

  return (
    <div className='h-[400px] w-[400px] mx-6 my-8 bg-white shadow-2xl'>
      <div className='bg-[#9ec862] h-8 relative flex justify-between items-center  p-2'>
        <span
          contentEditable={true}
          spellCheck={false}
          onBlur={onTitleNoteChange(id)}
          className='outline-none'
          suppressContentEditableWarning={true}
        >
          {title}
        </span>
        <div className='flex items-center gap-2'>
          <button
            className='h-full text-white bg-transparent flex items-center'
            onClick={() => onNoteEdit(id)}
          >
            <HiOutlinePencilAlt className='h-6 w-6' />
          </button>
          <button
            className='h-full text-white bg-transparent flex items-center'
            onClick={() => onNoteRemove(id)}
          >
            <HiOutlineTrash className='h-6 w-6' />
          </button>
        </div>
      </div>
      <textarea
        className={`outline-none resize-none w-full h-full p-5 text-xl ${
          editing ? 'bg-[#f8f8f8]' : 'bg-white'
        }`}
        onChange={onBodyChange(id)}
        value={body}
      />
    </div>
  );
}
