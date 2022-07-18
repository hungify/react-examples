import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #efefbb;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;
const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
`;

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const id = 1;
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setPokemons(data);
    };
    fetchPokemon();
  }, []);

  return (
    <Wrapper>
      <h1>Pokedex</h1>
      <Inner>
        {/* {Array.from({ length: 151 }).map((_, i) => (
          <Card cardinalNumber={i} img={} name={name} />
        ))} */}
      </Inner>
    </Wrapper>
  );
}

const CardContainer = styled.div`
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgb(100 100 100 / 50%);
  margin: 10px;
  padding: 20px;
  text-align: center;
`;

const Image = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  text-align: center;
  img {
    max-width: 90%;
    height: 100%;
    margin-top: 20px;
  }
`;
const Info = styled.div`
  margin-top: 20px;
`;

interface CardProps {
  cardinalNumber: number;
  name: string;
  img: string;
  type: string;
}

function Card({ cardinalNumber, name, img, type }: CardProps) {
  return (
    <CardContainer>
      <Image />
      <Info>
        <span>{cardinalNumber}</span>
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </Info>
    </CardContainer>
  );
}
