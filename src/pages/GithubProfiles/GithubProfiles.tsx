import { useDeferredValue, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2a2a72;
`;

const Input = styled.input`
  border-radius: 10px;
  display: block;
  width: 100%;
  max-width: 700px;
  font-size: 18px;
  margin-bottom: 20px;
  padding: 15px;
  border: none;
  background-color: #4c2885;
  box-shadow: 0 5px 10px rgb(154 160 185 / 5%), 0 15px 40px rgb(0 0 0 / 10%);
  outline: none;
  color: #fff;
  &::placeholder {
    color: #ddd;
  }
`;
const Card = styled.div`
  max-width: 800px;
  background-color: #4c2885;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgb(154 160 185 / 5%), 0 15px 40px rgb(0 0 0 / 10%);
  display: flex;
  padding: 3rem;
  margin: 0 1.5rem;
  color: #fff;
`;
const Avatar = styled.div`
  border-radius: 50%;
  border: 10px solid #2a2a72;
  height: 150px;
  width: 150px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const UL = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  max-width: 400px;
`;

const LI = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  strong {
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
`;

const Info = styled.div`
  margin-left: 20px;
`;
const Repositories = styled.div``;

const TagLink = styled.a`
  text-decoration: none;
  color: #fff;
  background-color: #212a72;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
  font-weight: 500;
  display: inline-block;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

interface Profile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repository {
  name: string;
  html_url: string;
}

export default function GithubProfiles() {
  const [searchText, setSearchText] = useState('');
  const [profile, setProfile] = useState<Profile>();
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const searchValue = useDeferredValue(searchText);

  useEffect(() => {
    const getGithubProfile = async (searchText: string) => {
      const response = await fetch(`https://api.github.com/users/${searchText}`);
      const data = await response.json();
      setProfile(data);
    };

    if (searchValue) {
      getGithubProfile(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const getRepos = async (loginName: string) => {
      const response = await fetch(`https://api.github.com/users/${loginName}/repos?sort=created`);
      const data = await response.json();
      setRepositories(data.slice(0, 5));
    };
    if (profile) {
      getRepos(profile.login);
    }
  }, [profile]);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Search a Github User"
        onChange={handleSearch}
        value={searchText}
      />
      {profile && (
        <Card>
          <Avatar>
            <img src={profile.avatar_url} alt="avatar" />
          </Avatar>
          <Info>
            <h1>{profile.name}</h1>
            <p>{profile.bio}</p>
            <UL>
              <LI>
                <span>{profile.followers}</span>
                <strong>Followers</strong>
              </LI>
              <LI>
                <span>{profile.following}</span>
                <strong>Following</strong>
              </LI>
              <LI>
                <span>{profile.public_repos}</span>
                <strong>Repos</strong>
              </LI>
            </UL>
            <Repositories>
              {repositories.map((repo) => (
                <TagLink href={repo.html_url} target="_blank">
                  {repo.name}
                </TagLink>
              ))}
            </Repositories>
          </Info>
        </Card>
      )}
    </Wrapper>
  );
}
