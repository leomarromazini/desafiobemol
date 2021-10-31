import styled from "styled-components";

export const ButtonType = styled.button`
  border-radius: 5px;
  background-color: ${(props) =>
    props.whiteSchema ? "var(--white)" : "var(--button)"};
  color: ${(props) =>
    props.whiteSchema ? "var(--secondary)" : "var(--white)"};
  font-size: 12px;
  font-weight: 600;
  transition: 300ms;
  padding: 6px 1px;
  border: 1px solid
    ${(props) => (props.whiteSchema ? "var(--primary)" : "transparent")};
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  :hover {
    background-color: ${(props) =>
      props.whiteSchema ? "#88ffff" : "var(--secondary)"};
    color: ${(props) =>
      props.whiteSchema ? "var(--primary)" : "var(--white)"};
  }

  @media (min-width: 310px) {
    padding: 6px 8px;
  }

  @media (min-width: 500px) {
    font-size: 14px;
    padding: 6px 20px;
  }
`;
