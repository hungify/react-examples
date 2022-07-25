import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { capitalize } from 'utils/string';

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

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

type Type = keyof typeof colors;

interface Pokemon {
  name: string;
  type: Type;
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [size, setSize] = useState(1);

  useEffect(() => {
    const fetchPokemon = async (id: number) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setPokemons([
        ...pokemons,
        {
          name: data.name,
          type: data.types[0].type.name,
        },
      ]);
    };
    let timer: NodeJS.Timer | null = null;
    if (size < 150) {
      timer = setInterval(() => {
        fetchPokemon(size);
        setSize(size + 1);
      }, 500);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [pokemons, size]);

  return (
    <Wrapper>
      <h1>Pokedex</h1>
      <Inner>
        {pokemons.map(({ name, type }, i) => (
          <Card cardinalNumber={i} name={name} type={type} key={name} />
        ))}
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
  color: #000;
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
  span {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.8em;
  }
  h2 {
    margin: 15px 0 7px;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

interface CardProps {
  cardinalNumber: number;
  name: string;
  img?: string;
  type: Type;
}

function Card({ cardinalNumber, name, img, type }: CardProps) {
  return (
    <CardContainer
      style={{
        backgroundColor: colors[type],
      }}
    >
      <Image />
      <Info>
        <span>{cardinalNumber}</span>
        <h2>{capitalize(name)}</h2>
        <small>Type: {type}</small>
      </Info>
    </CardContainer>
  );
}
