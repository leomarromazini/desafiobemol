import { createContext, useState, useContext } from "react";
import api from "../../services";
import "antd/dist/antd.css";
import { notification } from "antd";
import jwtDecode from "jwt-decode";
export const UserContext = createContext([]);

let authorized = localStorage.getItem("@bemol:Token") ? true : false;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@bemol:User")) || {}
  );
  const [authenticated, setAuthenticated] = useState(authorized);

  const registerUser = (data) => {
    api
      .post("user/signup", data)
      .then((r) => {
        notification["success"]({
          message: "Conta criada",
          description: "Parabéns, conta criada com sucesso!",
        });
      })
      .catch((er) => {
        notification["error"]({
          message: "Erro ao criar conta",
          description: "Verifique a conexão ou tente outro email",
        });
      });
  };

  const userLogin = async (data) => {
    console.log(data);
    api
      .post("user/signin", data)
      .then((response) => {
        console.log(response);
        let userToken = response.data.access_token;
        localStorage.setItem(`@bemol:Token`, JSON.stringify(userToken));

        setAuthenticated(true);
        notification["success"]({
          message: "Login feito com sucesso",
          description: "Seja bem vindo",
        });
      })
      .catch((e) => {
        notification["error"]({
          message: "Erro ao fazer login",
          description: "Verifique a conexão sua senha e email",
        });
      });
  };

  const getUserData = () => {
    const userToken = localStorage.getItem("@bemol:Token") || "";
    if (userToken) {
      return jwtDecode(userToken);
    }
  };

  const userLogoff = () => {
    localStorage.removeItem(`@bemol:Token`);
    localStorage.removeItem(`@bemol:User`);

    setUser([]);
    setUser({});
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authenticated,
        userLogin,
        userLogoff,
        registerUser,
        getUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
