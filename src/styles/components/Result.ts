import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: 24vh;
  background-color: ${props => props.theme.palette.secondary.light};

  div.price {
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.primary?.light};
    font-weight: 700;
    border-radius: 24px;
    padding: 8px 16px;
    font-size: 24px;
    margin: 16px 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 300;
  }
`;
