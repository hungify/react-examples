import { useRef, useState } from 'react';
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
  background-color: #fff;
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 3px solid #111;
`;

interface ItemProps {
  draggable: boolean;
}

const Item = styled.div<ItemProps>`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;
const url =
  "url('https://images.unsplash.com/photo-1655747508339-7cc94a19ac2b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NzUxNTU5Mw&ixlib=rb-1.2.1&q=80&w=150')";

export default function DragNDrop() {
  const itemRef = useRef(null);
  const [dragStartIndex, setDragStartIndex] = useState<number>(0);
  const [isOver, setIsOver] = useState(false);

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {};
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', target.id);
  };
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.classList.remove('dragging');
    e.dataTransfer.clearData();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {

  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.classList.remove('over');
    setIsOver(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.types.includes('text/plain')) {
      e.preventDefault();
      setIsOver(true);
    }
  };

  return (
    <Wrapper>
      <Inner>
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <Box key={idx} onDragStart={(idx) => onDragStart(idx)} onDrop={(idx) => onDrop(idx)}>
              <Item
                style={{
                  backgroundImage: idx === dragStartIndex ? url : '',
                }}
                ref={itemRef}
                draggable={true}
                onDrag={onDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            </Box>
          ))}
      </Inner>
    </Wrapper>
  );
}
