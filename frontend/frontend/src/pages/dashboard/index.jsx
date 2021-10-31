import { useEffect, useState } from "react";
import { useUser } from "../../providers/User";
import { Container, Content } from "./styles";
import { Redirect } from "react-router-dom";
const Dashboard = () => {
  const [userData, setUserData] = useState();
  const { getUserData, authenticated } = useUser();

  useEffect(() => {
    const data = getUserData();
    if (!authenticated) {
      return <Redirect to="/signin" />;
    }
    setUserData(data["sub"]);
  }, [authenticated]);

  return (
    <>
      <Container>
        <Content>
          <h1>Bem vindo {userData?.name}</h1>
          <p>Cidade: {userData?.city}</p>
          <p>Celular: {userData?.cell_phone}</p>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
