import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.palette?.background?.default};
    color: ${props => props.theme.palette?.text?.primary};
    font: 400 16px Roboto, sans-serif;
  }

  h1,h2,h3,h4,h5,p {
    color:  ${props => props.theme.palette?.text?.primary};
  }
`;
