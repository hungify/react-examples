import React, { Fragment } from 'react';
import type { Ticket } from '~/interfaces/drag';

interface ItemProps {
  card: Ticket;
}

export default function Card({ card }: ItemProps) {
  const onDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.dataTransfer.setData('card', JSON.stringify(card));
    setTimeout(function () {
      const target = evt.target as HTMLDivElement;
      target.style.visibility = 'hidden';
    }, 0);
  };

  const onDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;
    target.style.visibility = 'visible';
  };

  return (
    <Fragment>
      <div
        className='item'
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <p id={String(card.id)}>{card.title}</p>
      </div>
    </Fragment>
  );
}
