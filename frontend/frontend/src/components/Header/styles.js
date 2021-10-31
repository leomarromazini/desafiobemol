import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: var(--secondary);
  padding: 0px 25px 0px 0px;
  display: ${(props) =>
    props.location === "/" ||
    props.location === "/login" ||
    props.location === "/signup"
      ? "flex"
      : "none"};
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

  img {
    width: 180px;
    height: 90px;
  }

  @media screen and (min-width: 720px) {
    width: 100%;

    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0px 25px 10px 0px;
    img {
      width: 250px;
      height: 100px;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  button {
    margin-left: 8px;
  }
`;
