import KineticLoader from 'pages/KineticLoader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  background-color: #22254b;
  font-family: 'Poppins', sans-serif;
`;
const Form = styled.form`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background-color: #373b69;
`;
const InputSearch = styled.input`
  border: 2px solid #22254b;
  background-color: transparent;
  border-radius: 30px;
  font-size: 16px;
  color: #fff;
  padding: 8px 16px;
  &:focus {
    outline: none;
    background-color: #22254b;
  }
`;
const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
`;

const CardMovie = styled.div`
  width: 300px;
  margin: 16px;
  position: relative;
  border-radius: 3px;
  background-color: #373b69;
  box-shadow: 0 4px 5px rgb(0 0 0 / 20%);
  overflow: hidden;
`;
const Image = styled.div`
  img {
    width: 100%;
    object-fit: cover;
  }
`;
const Info = styled.div`
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 0.5px;
  span {
    background-color: #22254b;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-weight: bold;
    color: orange;
  }
`;
const Overview = styled.div`
  background-color: #fff;
  padding: 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100%;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
  h3 {
    margin: 0;
  }
  p {
    letter-spacing: 0.5px;
  }
  ${CardMovie}:hover & {
    transform: translateY(0);
  }
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
`;

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c';
interface Movie {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
}

export default function MovieApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${SEARCH_API}&query=${searchTerm}`);
    const data = await response.json();
    setMovies(data.results);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSearch}>
        <InputSearch value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
      </Form>
      {movies.length > 0 ? (
        <MovieList>
          {movies.map((movie) => (
            <CardMovie key={movie.id}>
              <Image>
                <img src={`${IMG_PATH}${movie.poster_path}`} alt={movie.title} />
              </Image>
              <Info>
                <h3>{movie.title}</h3>
                <span>{movie.vote_average}</span>
              </Info>
              <Overview>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </Overview>
            </CardMovie>
          ))}
        </MovieList>
      ) : loading ? (
        <KineticLoader />
      ) : (
        <Empty>
          <span>Empty</span>
        </Empty>
      )}
    </Wrapper>
  );
}
