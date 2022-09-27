import { useState } from 'react';
import { boardData, cardData } from '~/mocks';
import Column from './Column';
import './boards.css';

export default function Boards() {
  const [cards, setCards] = useState(cardData);
  const [boards] = useState(boardData);

  return (
    <div className='row'>
      {boards.map(({ status, icon }) => (
        <div className='col-wrapper' key={status}>
          <div className='col-group'>
            <h5 className='col-header'>{`${status} ${icon}`}</h5>
            <p className='col-count'>
              {cards.filter((i) => i.status === status).length}
            </p>
          </div>
          <Column cards={cards} status={status} setCards={setCards} />
        </div>
      ))}
    </div>
  );
}
