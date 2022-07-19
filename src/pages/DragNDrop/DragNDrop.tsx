import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #4682b4;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 3px solid #111;
  cursor: move;

  &.hovered {
    background-color: #333;
    border-color: white;
    border-style: dashed;
  }
  &.empty {
    background-color: #fff;
  }
`;

interface ItemProps {
  draggable: boolean;
}

const Item = styled.div<ItemProps>`
  height: 100%;
  width: 100%;
  &.hold {
    border: solid 5px #ccc;
  }
`;
const url =
  "url('https://images.unsplash.com/photo-1655747508339-7cc94a19ac2b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NzUxNTU5Mw&ixlib=rb-1.2.1&q=80&w=150')";

export default function DragNDrop() {
  const [dragIndex, setDragIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDropCard = (idx: number) => {
    setDragIndex(idx);
    setIsDragging(false);
    setHoverIndex(-1);
  };
  const onDragEnterCard = (idx: number) => {
    setHoverIndex(idx);
    setDragIndex(idx);
    setIsDragging(true);
  };
  const onDragLeaveCard = () => {
    setHoverIndex(-1);
  };
  const onDragOverCard = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDragStartItem = (e: React.DragEvent<HTMLDivElement>) => {
    const currentItem = e.currentTarget;
    currentItem.classList.add('hold');
    setTimeout(() => {
      currentItem.classList.remove('hold');
    });
  };
  const onDragEndItem = () => {
    setIsDragging(false);
  };

  return (
    <Wrapper>
      <Inner>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <Box
              key={idx}
              className={idx === hoverIndex ? 'hovered' : 'empty'}
              onDragOver={onDragOverCard}
              onDragEnter={() => onDragEnterCard(idx)}
              onDragLeave={onDragLeaveCard}
              onDrop={() => onDropCard(idx)}
            >
              <Item
                style={{
                  backgroundImage: idx === dragIndex && !isDragging ? url : '',
                }}
                draggable={idx === dragIndex}
                onDragStart={onDragStartItem}
                onDragEnd={onDragEndItem}
              />
            </Box>
          ))}
      </Inner>
    </Wrapper>
  );
}
