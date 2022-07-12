import { projects } from 'mocks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export default function Home() {
  return (
    <Wrapper>
      {projects.map((p) => (
        <Card title={p.title} preview={p.preview} locked={p.locked} />
      ))}
    </Wrapper>
  );
}

interface CardProps {
  title: string;
  preview: string;
  locked?: boolean;
}

function Card({ title, preview, locked = false }: CardProps) {
  return (
    <Container locked={locked}>
      <img src={preview} alt={title} />
      <Content>
        <h4>{title}</h4>
        {!locked && (
          <LinkStyled to={title.toLowerCase().replaceAll(' ', '-')}>Live Demo</LinkStyled>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div<{
  locked?: boolean;
}>`
  min-width: 315px;
  width: 100%;
  min-height: 230px;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${({ locked }) => `
    opacity: ${locked ? 0.5 : 1};
  `}
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.3s ease-in-out;

  background-color: #0298db;
  width: 100%;
  transform: translateY(-100%);
  opacity: 0;
  border-radius: 10px;
  row-gap: 10px;

  ${Container}:hover & {
    cursor: pointer;
    background-color: #0298db;
    height: 100%;
    width: 100%;
    transform: translateY(-100%);
    opacity: 1;
    border-radius: 10px;
  }
  h4 {
    margin: 0;
  }
`;

const LinkStyled = styled(Link)`
  padding: 15px;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #8bc34a;
  font-size: 1.2rem;
`;
