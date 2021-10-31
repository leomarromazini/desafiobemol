import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Content, Error } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect, useHistory } from "react-router-dom";

import { useUser } from "../../providers/User";

const SignIn = () => {
  const { userLogin, authenticated } = useUser();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    userLogin(data);
    // history.push("/dashboard");
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container>
        <Content>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Entrar</h1>
            <div className="inputContainer">
              <Input
                register={register}
                name="name"
                label="Nome"
                placeholder="Nome de usuário"
                error={errors.name?.message}
              />
              <Error>{errors.name?.message}</Error>
            </div>

            <div className="inputContainer">
              <Input
                register={register}
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                error={errors.password?.message}
              />
              <Error>{errors.password?.message}</Error>
            </div>

            <p className="loginMessage">
              Não possui conta? <Link to="/signup">Registre-se aqui</Link>
            </p>
            <div>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
