export type DragType = 'card' | 'list';

export interface DragContextType<
  TElementType extends HTMLElement = HTMLDivElement,
> {
  draggable: boolean;
  dragItem: string | null;
  dragType: DragType | null;
  isDragging: boolean;
  drop: string | null;

  dragStart: (
    e: React.DragEvent<TElementType>,
    dragId: string,
    dragType: DragType,
  ) => void;
  drag: (e: React.DragEvent<TElementType>) => void;
  dragEnd: () => void;
  setDrop: (drop: string | null) => void;
  onDrop: (e: React.DragEvent<TElementType>) => void;
}
