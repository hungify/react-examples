import React from 'react';
import type { Ticket } from '~/interfaces/drag';

interface DraggableProps {
  onDrop: (card: Ticket, status: string) => void;
  children: React.ReactNode;
  status: string;
}

export default function Draggable({
  onDrop,
  children,
  status,
}: DraggableProps) {
  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.parse(e.dataTransfer.getData('card'));
    onDrop(data, status);
  };

  return (
    <div
      onDragOver={handleAllowDrop}
      onDrop={handleDrop}
      className='drop-wrapper'
    >
      {children}
    </div>
  );
}
