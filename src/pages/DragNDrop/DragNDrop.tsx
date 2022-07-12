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
  background-image: url('https://images.unsplash.com/photo-1655747508339-7cc94a19ac2b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NzUxNTU5Mw&ixlib=rb-1.2.1&q=80&w=150');
`;
export default function DragNDrop() {
  const itemRef = useRef(null);
  const [data, setData] = useState([]);
  const [dragStartIndex, setDragStartIndex] = useState<number>();

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {};
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const idx = element.dataset.index;
    setDragStartIndex(Number(idx));
  };
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {};
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {};
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {};
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {};
  return (
    <Wrapper>
      <Inner>
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <Box key={idx} onDragStart={(idx) => onDragStart(idx)} onDrop={(idx) => onDrop(idx)}>
              <Item
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
