import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: 24vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  gap: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 0 8px;
  gap: 16px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  border-radius: 8px;
  margin-top: 16px;
`;
