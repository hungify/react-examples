import { cards } from 'mocks/cards';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  column-gap: 10px;
  padding: 20px;
  justify-content: center;
`;

export default function ExpandingCards() {
  const [indexActive, setIndexActive] = useState(cards[0].id);

  const handleExpand = (id: number) => {
    if (id !== indexActive) {
      setIndexActive(id);
    }
  };

  return (
    <Wrapper>
      {cards.map(({ id, url, title }) => (
        <Card
          key={id}
          active={indexActive === id}
          id={id}
          url={url}
          title={title}
          onClick={handleExpand}
        />
      ))}
    </Wrapper>
  );
}

interface CardProps {
  url: string;
  title: string;
  active: boolean;
  id: number;
  onClick: (id: number) => void;
}
function Card({ active, url, title, onClick, id }: CardProps) {
  return (
    <CardStyled
      onClick={() => onClick(id)}
      active={active}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <h2>{title}</h2>
    </CardStyled>
  );
}

interface CardStyledProps {
  active: boolean;
}

const CardStyled = styled.div<CardStyledProps>`
  border-radius: 50px;
  height: 80vh;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: flex 0.7s ease-in;

  @media screen and (max-width: 768px) {
    &:nth-child(4),
    &:nth-child(5) {
      display: none;
    }
  }
  ${({ active }) => `
    flex: ${active ? '5' : '0.5'};
  `}

  h2 {
    margin: 0;
    ${({ active }) => `
    transition:${active ? 'opacity 0.2s ease-in 1s' : 'opacity 0.2s ease-in 0.2s'};
    opacity: ${active ? '1' : '0'};
  `}
    position: absolute;
    bottom: 20px;
    margin-left: 20px;
    color: #fff;
  }
`;
