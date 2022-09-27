import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2b88f0;
`;
const Inner = styled.div`
  width: 500px;
  h3 {
    color: white;
    margin: 10px 0 20px;
    text-align: center;
  }
`;
const TextArea = styled.textarea`
  border: none;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  resize: none;
  margin-bottom: 10px;
  border-radius: 5px;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

const Tags = styled.ul`
  list-style-type: none;
  margin: 0;
  width: 100%;
`;
const Tag = styled.li`
  display: inline-block;
  background-color: #f0932b;
  color: #fff;
  padding: 10px 20px;
  margin: 0 15px 20px 0;
  border-radius: 50px;
  font-size: 14px;
`;

export default function RandomChoicePicker() {
  const [choices, setChoices] = useState<string[]>([]);

  const handleChoiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newChoices = e.target.value.split(',').filter((item) => item.trim());
    setChoices([...newChoices]);
  };

  return (
    <Wrapper>
      <Inner>
        <h3>
          Enter all of the choices divided by a comma (&apos;,&apos;).
          <br />
          Press enter when you&apos;re done
        </h3>
        <TextArea
          placeholder='Enter choices here...'
          onChange={handleChoiceChange}
          spellCheck={false}
        />
        {choices.length > 0 && (
          <Tags>
            {choices.map((choice, index) => (
              <Tag key={index}>{choice}</Tag>
            ))}
          </Tags>
        )}
      </Inner>
    </Wrapper>
  );
}
