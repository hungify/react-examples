import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import styled from 'styled-components';

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

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [result, setResult] = useState('wN6(yG7*nW3=oO9(dO4^');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
  };

  const handleIncludeChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'uppercase') {
      setIncludeUppercase(e.target.checked);
    } else if (type === 'lowercase') {
      setIncludeLowercase(e.target.checked);
    } else if (type === 'numbers') {
      setIncludeNumbers(e.target.checked);
    } else if (type === 'symbols') {
      setIncludeSymbols(e.target.checked);
    }
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigator.clipboard.writeText(result);
    window.alert('Copied to clipboard');
  };

  const handleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let words = '';
    if (includeUppercase) {
      words += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (includeLowercase) {
      words += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (includeNumbers) {
      words += '0123456789';
    }
    if (includeSymbols) {
      words += '!@#$%^&*(){}[]=<>/,.';
    }
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += words[Math.floor(Math.random() * words.length)];
    }
    setResult(result);
  };

  return (
    <Wrapper>
      <Box>
        <h3>Password generator</h3>
        <Result>
          <span>{result}</span>
          <Button onClick={handleCopy}>
            <FiClipboard />
          </Button>
        </Result>
        <Settings>
          <Setting>
            <label>Password Length</label>
            <input
              type="text"
              min={6}
              max={40}
              value={passwordLength}
              onChange={handlePasswordChange}
            />
          </Setting>
          <Setting>
            <label>Include uppercase letters</label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={handleIncludeChange('uppercase')}
            />
          </Setting>
          <Setting>
            <label>Include lowercase letters</label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={handleIncludeChange('lowercase')}
            />
          </Setting>
          <Setting>
            <label>Include numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={handleIncludeChange('numbers')}
            />
          </Setting>
          <Setting>
            <label>Include symbols</label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={handleIncludeChange('symbols')}
            />
          </Setting>
        </Settings>
        <Button
          onClick={handleShuffle}
          style={{
            width: '100%',
          }}
          disabled={!(includeUppercase || includeLowercase || includeNumbers || includeSymbols)}
        >
          Generate Password
        </Button>
      </Box>
    </Wrapper>
  );
}
