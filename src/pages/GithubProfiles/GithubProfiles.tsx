import styled from 'styled-components';

const Input = styled.input`
  border-radius: 10px;
  width: 100%;
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
  border: none;
  background-color: #4c2885;
  box-shadow: 0 5px 10px rgb(154 160 185 / 5%), 0 15px 40px rgb(0 0 0 / 10%);
`;

export default function GithubProfiles() {
  return (
    <div>
      <h1>Github Profiles</h1>
      <Input type="text" placeholder="Search a Github User" />
    </div>
  );
}
