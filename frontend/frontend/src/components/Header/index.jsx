import { ButtonsWrapper, HeaderContainer } from "./styles";
import { useHistory, useLocation } from "react-router";
import Button from "../Button";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/2.png";

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLocation = (location) => {
    history.push(location);
  };

  return (
    <HeaderContainer location={pathname}>
      <Link to="/" style={{ height: 90 }}>
        <img src={Logo} alt="myStoreName" />
      </Link>
      <ButtonsWrapper location={pathname}>
        <>
          <Button
            whiteSchema={pathname === "/signin" ? true : false}
            className="btb-login"
            onClickFunc={() => handleLocation("/signin")}
          >
            Login
          </Button>
          <Button
            whiteSchema={pathname === "/signup" ? true : false}
            className="btb-signup"
            onClickFunc={() => handleLocation("/signup")}
          >
            Cadastro
          </Button>
        </>
      </ButtonsWrapper>
    </HeaderContainer>
  );
};

export default Header;
