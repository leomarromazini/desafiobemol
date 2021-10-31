import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  position: relative;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 95vw;
  max-width: 300px;

  h1 {
    font-size: 32px;
    font-weight: bold;
    align-self: center;
    margin: 120px 0 20px 0;
  }
`;
