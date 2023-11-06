import classNames from 'classnames';
import React from 'react';
import { Drag, type DragType } from '~/components/Drag';
import DropGuide from '~/components/Drag/DropGuide';

const dummyData = [
  {
    id: '1',
    name: 'To do',
    cards: [
      { id: '1', title: 'Ticket 1' },
      { id: '2', title: 'Ticket 2' },
      { id: '3', title: 'Ticket 3' },
      { id: '4', title: 'Ticket 4' },
      { id: '5', title: 'Ticket 5' },
    ],
  },
  {
    id: '2',
    name: 'In Progress',
    cards: [
      { id: '6', title: 'Ticket 6' },
      { id: '7', title: 'Ticket 7' },
      { id: '8', title: 'Ticket 8' },
    ],
  },
  {
    id: '3',
    name: 'In Review',
    cards: [
      { id: '10', title: 'Ticket 10' },
      { id: '11', title: 'Ticket 17' },
      { id: '12', title: 'Ticket 18' },
    ],
  },
  {
    id: '4',
    name: 'Done',
    cards: [
      { id: '13', title: 'Ticket 26' },
      { id: '14', title: 'Ticket 27' },
      { id: '15', title: 'Ticket 28' },
    ],
  },
];

interface CardProps {
  title: string;
  description?: string;
  isDragItem?: boolean;
}

function Card({
  title,
  description = 'Drag and drop me!',
  isDragItem,
}: CardProps) {
  return (
    <div
      className={classNames(
        'rounded-lg bg-white border border-gray-300 shadow-sm p-5 m-2',
        {
          'rotate-6': isDragItem,
        },
      )}
    >
      <h3 className='font-bold text-lg my-1'>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

interface ListProps {
  name: string;
  dragItem?: boolean;
  children: React.ReactNode;
}

function List({ name, dragItem, children }: ListProps) {
  return (
    <div
      className={classNames(
        'rounded-xl bg-gray-100 p-2 mx-2 my-5 w-80 shrink-0 grow-0 shadow',
        {
          'rotate-6': dragItem,
        },
      )}
    >
      <div className='px-6 py-1'>
        <h2 className='font-bold text-xl my-1'>{name}</h2>
      </div>
      {children}
    </div>
  );
}

export default function KanbanBoard() {
  const [data, setData] = React.useState(dummyData);

  const handleDrop = ({
    dragItem,
    dragType,
    drop,
  }: {
    dragItem: string;
    dragType: DragType;
    drop: string;
  }) => {
    if (dragType === 'card') {
      // get the drop position as numbers
      // eslint-disable-next-line prefer-const
      let [newListPosition, newCardPosition] = drop
        .split('-')
        .map((i) => parseInt(i));

      if (newCardPosition == undefined || newListPosition == undefined) return;

      const newData = structuredClone(data); // deep clone
      // find the current positions
      let oldCardPosition: number | undefined;
      const oldListPosition = data.findIndex((list) => {
        oldCardPosition = list.cards.findIndex((card) => card.id === dragItem);
        return oldCardPosition >= 0;
      });

      if (oldCardPosition == undefined || newCardPosition == undefined) return;

      const card = data[oldListPosition]?.cards[oldCardPosition];

      if (!card) return;

      if (
        newListPosition === oldListPosition &&
        oldCardPosition < newCardPosition
      ) {
        newCardPosition--; // reduce by one
      }
      // remove the card from the old position
      newData[oldListPosition]?.cards.splice(oldCardPosition, 1);
      // put it in the new position
      newData[newListPosition]?.cards.splice(newCardPosition, 0, card);
      // update the state
      setData(newData);
    } else if (dragType === 'list') {
      let newListPosition = Number(drop);
      const oldListPosition = data.findIndex((list) => list.id === dragItem);
      // create a copy for the new data
      const newData = structuredClone(data); // deep clone
      // get the list
      const list = data[oldListPosition];
      // if current position before drop reduce drop position by one
      if (oldListPosition < newListPosition) {
        newListPosition--; // reduce by one
      }
      // remove list from the old position
      newData.splice(oldListPosition, 1);
      // put it in the new position
      if (!list) return;
      newData.splice(newListPosition, 0, list);
      // update the state
      setData(newData);
    }
  };

  const addNewTicket = (listId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newData = structuredClone(data); // deep clone
    const listPosition = data.findIndex((list) => list.id === listId);
    if (listPosition < 0) return;
    const id = Math.round(50 + Math.random() * 50).toString();

    newData[listPosition]?.cards.push({
      id,
      title: `Ticket ${id}`,
    });
    setData(newData);
  };

  return (
    <div className='p-10 flex flex-col h-screen'>
      <h1 className='font-semibold text-3xl py-2'>Trello-Style Drag & Drop</h1>
      <p>Let&apos;s drag some cards around!</p>
      <Drag handleDrop={handleDrop}>
        {({ activeItem, activeType, isDragging }) => (
          <Drag.DropZone className='flex -mx-2'>
            {data.map((list, listPosition) => {
              return (
                <React.Fragment key={list.id}>
                  <Drag.DropZone
                    dropId={listPosition}
                    dropType='list'
                    remember={true}
                  >
                    <Drag.DropGuide
                      dropId={listPosition.toString()}
                      dropType='list'
                      className='rounded-xl bg-gray-200 h-96 mx-2 my-5 w-80 shrink-0 grow-0'
                    />
                  </Drag.DropZone>
                  <Drag.DropZones
                    className='flex flex-col h-full'
                    prevId={listPosition}
                    nextId={listPosition + 1}
                    dropType='list'
                    split='x'
                    remember={true}
                  >
                    <Drag.DragItem
                      dragId={list.id}
                      className={`cursor-pointer ${
                        activeItem === list.id &&
                        activeType === 'list' &&
                        isDragging
                          ? 'hidden'
                          : 'translate-x-0'
                      }`}
                      dragType='list'
                    >
                      <List
                        name={list.name}
                        dragItem={
                          activeItem === list.id && activeType === 'list'
                        }
                      >
                        {data[listPosition]?.cards.map((card, cardPosition) => {
                          const isSameCard = activeItem === card.id;
                          const isCardType = activeType === 'card';
                          const isDragItem = isSameCard && isCardType;
                          const isDraggedOver = isDragItem && isDragging;

                          return (
                            <Drag.DropZones
                              key={card.id}
                              prevId={`${listPosition}-${cardPosition}`}
                              nextId={`${listPosition}-${cardPosition + 1}`}
                              dropType='card'
                              remember={true}
                            >
                              <Drag.DropGuide
                                dropId={`${listPosition}-${cardPosition}`}
                                className='rounded-lg bg-gray-200 h-24 m-2'
                                dropType='card'
                              />
                              <Drag.DragItem
                                dragId={card.id}
                                className={classNames('cursor-pointer', {
                                  [isDraggedOver ? 'hidden' : 'translate-x-0']:
                                    true,
                                })}
                                dragType='card'
                              >
                                <Card
                                  title={card.title}
                                  isDragItem={isDragItem}
                                />
                              </Drag.DragItem>
                            </Drag.DropZones>
                          );
                        })}
                        <Drag.DropZone
                          dropId={`${listPosition}-${data[listPosition]?.cards.length}`}
                          dropType='card'
                          remember={true}
                        >
                          <Drag.DropGuide
                            dropId={`${listPosition}-${data[listPosition]?.cards.length}`}
                            className='rounded-lg bg-gray-200 h-24 m-2'
                            dropType='card'
                          />
                        </Drag.DropZone>
                        <div className='w-full text-center m-2'>
                          <button
                            className='rounded-lg p-2'
                            onClick={addNewTicket(list.id)}
                          >
                            Add new ticket
                          </button>
                        </div>
                      </List>
                    </Drag.DragItem>
                    <Drag.DropZone
                      dropId={`${listPosition}-${data[listPosition]?.cards.length}`}
                      className='grow'
                      dropType='card'
                      remember={true}
                    />
                  </Drag.DropZones>
                </React.Fragment>
              );
            })}
            <Drag.DropZone dropId={data.length} dropType='list' remember={true}>
              <Drag.DropGuide
                dropId={data.length.toString()}
                dropType='list'
                className='rounded-xl bg-gray-200 h-96 mx-2 my-5 w-80 shrink-0 grow-0'
              />
            </Drag.DropZone>
          </Drag.DropZone>
        )}
      </Drag>
    </div>
  );
}
