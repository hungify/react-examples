import { createGlobalStyle } from 'styled-components';

interface GlobalStylesProps {
  theme: {
    body: string;
    text: string;
  };
}

const GlobalStyle = createGlobalStyle<GlobalStylesProps>`
body {
 background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
}
`;

export default GlobalStyle;
