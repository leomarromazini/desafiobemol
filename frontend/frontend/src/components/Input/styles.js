import styled, { css } from "styled-components";

export const InputItem = styled.input`
  border-radius: 5px;
  border: 2px solid var(--purple);
  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--colorFocus-hover);
    `}
  color: var(--black);
  font-size: 16px;
  width: 100%;
  padding: 8px 16px;
  animation-name: ${(props) => props.errored && "error"};
  animation-duration: 0.075s;
  animation-iteration-count: 5;
  animation-direction: alternate;

  @media (min-width: 800px) {
    font-size: 20px;
    width: 100%;
    padding: 8px 16px;
  }

  @keyframes error {
    from {
      transform: translateX(-10px);
    }
    to {
      transform: translateX(10px);
    }
  }
`;
