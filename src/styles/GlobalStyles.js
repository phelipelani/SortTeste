

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  textarea {
    width: 100%;
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 20px;
  }
`;

export default GlobalStyles;