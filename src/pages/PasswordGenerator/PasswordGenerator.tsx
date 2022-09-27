import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import styled from 'styled-components';
import { objectKeys } from '~/utils';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #3b3b98;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Box = styled.div`
  background-color: #23235b;
  box-shadow: 0px 2px 10px rgb(255 255 255 / 20%);
  padding: 20px;
  width: 350px;
  max-width: 100%;
  color: #fff;
  h1 {
    margin: 10px 0 20px;
    text-align: center;
  }
`;
const Result = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
  span {
    flex: 1;
  }
`;
const Button = styled.button`
  border: none;
  background-color: #3b3b98;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  flex-shrink: 0;
  ${({ disabled }) => `
    opacity: ${disabled ? 0.5 : 1};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `}
`;
const Settings = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const Setting = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  input {
    color: #000;
    outline: none;
    width: 50px;
  }
`;

type OptionKey = 'lowercase' | 'uppercase' | 'numbers' | 'specialCharacters';
const OPTIONS: Record<OptionKey, string> = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  specialCharacters: '!@#$%^&*()',
};
type Option = Record<OptionKey, boolean>;

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(4);
  const [options, setOptions] = useState<Option>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    specialCharacters: true,
  });

  const [result, setResult] = useState('ABCD');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
  };

  const handleIncludeChange =
    (type: OptionKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'uppercase') {
        setOptions({
          ...options,
          uppercase: e.target.checked,
        });
      } else if (type === 'lowercase') {
        setOptions({
          ...options,
          lowercase: e.target.checked,
        });
      } else if (type === 'numbers') {
        setOptions({
          ...options,
          numbers: e.target.checked,
        });
      } else if (type === 'specialCharacters') {
        setOptions({
          ...options,
          specialCharacters: e.target.checked,
        });
      }
    };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(result);
    window.alert('Copied to clipboard');
  };

  const randomChar = (str: string) =>
    str[Math.floor(Math.random() * str.length)];

  const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

  const generatePassword = (length: number, options: Option) => {
    const optionsKeysLength = objectKeys(options).filter(
      (key) => options[key],
    ).length;

    const password: string[] = [];
    let characters = '';

    // random password has option true for each options
    objectKeys(options).forEach((key) => {
      if (options[key]) {
        characters += OPTIONS[key];
        const randomKey = randomChar(OPTIONS[key]);
        randomKey && password.push(randomKey);
      }
    });

    // random password to have length of passwordLength
    if (password.length < passwordLength) {
      for (let i = optionsKeysLength; i < length; i++) {
        const randomPass = randomChar(characters);
        randomPass && password.push(randomPass);
      }
    }

    return shuffleArray(password).join('');
  };

  const handleShuffle = () => {
    const result = generatePassword(passwordLength, options);
    setResult(result);
  };

  return (
    <Wrapper>
      <Box>
        <h1>Password generator</h1>
        <Result>
          <span>{result}</span>
          <Button onClick={handleCopy}>
            <FiClipboard />
          </Button>
        </Result>
        <Settings>
          <Setting>
            <label htmlFor='length'>Password Length</label>
            <input
              id='length'
              className='text-center'
              type='text'
              min={6}
              max={40}
              value={passwordLength}
              onChange={handlePasswordChange}
            />
          </Setting>
          <Setting>
            <label htmlFor='uppercase'>Include uppercase letters</label>
            <input
              type='checkbox'
              checked={options.uppercase}
              onChange={handleIncludeChange('uppercase')}
            />
          </Setting>
          <Setting>
            <label htmlFor='lowercase'>Include lowercase letters</label>
            <input
              type='checkbox'
              checked={options.lowercase}
              onChange={handleIncludeChange('lowercase')}
            />
          </Setting>
          <Setting>
            <label htmlFor='numbers'>Include numbers</label>
            <input
              type='checkbox'
              checked={options.numbers}
              onChange={handleIncludeChange('numbers')}
            />
          </Setting>
          <Setting>
            <label htmlFor='specialCharacters'>Include symbols</label>
            <input
              type='checkbox'
              checked={options.specialCharacters}
              onChange={handleIncludeChange('specialCharacters')}
            />
          </Setting>
        </Settings>
        <Button
          onClick={handleShuffle}
          style={{
            width: '100%',
          }}
          disabled={
            !(
              options.lowercase ||
              options.uppercase ||
              options.numbers ||
              options.specialCharacters
            ) || passwordLength < 4
          }
        >
          Generate Password
        </Button>
      </Box>
    </Wrapper>
  );
}
