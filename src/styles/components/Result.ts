import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: 24vh;
  background-color: ${({ theme }) => theme.colors.lightGreen};

  div.price {
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
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
