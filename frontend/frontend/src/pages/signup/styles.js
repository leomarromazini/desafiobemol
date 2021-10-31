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

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .inputContainer {
      height: 60px;
      display: flex;
      flex-direction: column;
    }

    h1 {
      font-size: 32px;
      font-weight: bold;
      align-self: center;
      margin: 120px 0 20px 0;
    }

    input {
      font-size: 16px;
    }
    .loginMessage {
      font-size: 16px;
      margin: 10px 0 20px 0;

      a {
        font-weight: 700;

        &:hover {
          color: var(--secondary);
        }
      }
    }

    div > button {
      margin-left: auto;
      margin-right: 0;
    }

    .select {
      width: 300px;
      height: 34px;
      border: 0;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      line-height: 1.1;
      background-color: #fff;
      outline: none;
      color: #333333;
    }
  }
`;

export const Error = styled.p`
  color: var(--error);
  margin: 2px 0 0 6px;
  font-size: 13px;
  font-weight: 600;
`;
