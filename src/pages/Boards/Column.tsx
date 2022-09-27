import { useCallback } from 'react';
import type { Ticket } from '~/interfaces/drag';
import { boardData } from '~/mocks';
import Card from './Card';
import Draggable from './Draggable';

interface ColumnProps {
  cards: Ticket[];
  status: string;
  setCards: (cards: Ticket[]) => void;
}

export default function Column({ cards, setCards, status }: ColumnProps) {
  console.log('render');
  const onDrop = (item: Ticket, status: string) => {
    if (item.status === status) return;

    const foundIcon = boardData.find((board) => board.status === status);
    if (!foundIcon) return;

    const newCard = cards
      .filter((i) => i.id !== item.id)
      .concat({ ...item, status, icon: foundIcon.icon });

    setCards(newCard);
  };

  const onAddItem = useCallback(
    (col: string) => {
      const status = boardData.find((board) => board.status === col);
      if (!status) return;

      const newId = new Date().getTime();
      const newCard = {
        id: String(newId),
        icon: status.icon,
        status: status.status,
        title: `Fix bug in issue #${newId + 1}`,
      };
      setCards([...cards, newCard]);
    },
    [cards, setCards],
  );

  const formatCards = useCallback((cards: Ticket[], status: string) => {
    return cards.filter((i) => i.status === status);
  }, []);

  return (
    <div className='col'>
      <Draggable onDrop={onDrop} status={status}>
        {formatCards(cards, status)?.map((i) => (
          <Card key={i.id} card={i} />
        ))}
        <button onClick={() => onAddItem(status)}>Add a new card</button>
      </Draggable>
    </div>
  );
}
