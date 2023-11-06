import React from 'react';

import DragItem from './DragItem';
import DropZone from './DropZone';
import DropZones from './DropZones';
import DropGuide from './DropGuide';
import type { DragContextType, DragType } from './shared';

export const DragContext = React.createContext<DragContextType>({
  draggable: true,
  dragItem: null,
  dragType: null,
  isDragging: false,
  drop: null,

  dragStart: () => undefined,
  drag: () => undefined,
  dragEnd: () => undefined,
  setDrop: () => undefined,
  onDrop: () => undefined,
});

interface DragProps {
  draggable?: boolean;
  handleDrop: (args: {
    dragItem: string;
    dragType: DragType;
    drop: string;
  }) => void;
  children: (args: {
    activeItem: string | null;
    activeType: string | null;
    isDragging: boolean;
  }) => React.ReactNode;
}

function Drag({ draggable = true, handleDrop, children }: DragProps) {
  const [dragItem, setDragItem] = React.useState<string | null>(null);
  const [dragType, setDragType] = React.useState<DragType | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [drop, setDrop] = React.useState<string | null>(null);

  const dragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dragId: string,
    dragType: DragType,
  ) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    setDragItem(dragId);
    setDragType(dragType);
  };

  const drag = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const dragEnd = () => {
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragItem && dragType && drop) handleDrop({ dragItem, dragType, drop });
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  return (
    <DragContext.Provider
      value={{
        draggable,
        dragItem,
        dragType,
        isDragging,
        dragStart,
        drag,
        dragEnd,
        drop,
        setDrop,
        onDrop,
      }}
    >
      {typeof children === 'function'
        ? children({ activeItem: dragItem, activeType: dragType, isDragging })
        : children}
    </DragContext.Provider>
  );
}

Drag.DragItem = DragItem;
Drag.DropZone = DropZone;
Drag.DropZones = DropZones;
Drag.DropGuide = DropGuide;

export default Drag;
