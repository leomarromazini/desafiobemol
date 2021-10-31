import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Content, Error } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect, useHistory } from "react-router-dom";

import { validStates } from "../../utils/validStates";
import { maskZipCode } from "../../utils/maskZipCode";

import InputCellPhone from "../../components/InputCellPhone";
import { useValidateZipCode } from "../../providers/ValidateZipCode";
import { useUser } from "../../providers/User";

const Signup = () => {
  const { validateZipCode } = useValidateZipCode();
  const { registerUser, authenticated } = useUser();

  yup.addMethod(yup.string, "validZipCode", function (errorMessage) {
    return this.test(`test-zip-code`, errorMessage, function (value) {
      const { path, createError } = this;
      if (value.length !== 9) {
        createError({ path, message: errorMessage });
      }
      return (
        validateZipCode(value) || createError({ path, message: errorMessage })
      );
    });
  });

  yup.addMethod(yup.string, "validState", function (errorMessage) {
    return this.test(
      `test-user-selected-one-option`,
      errorMessage,
      function (value) {
        const { path, createError } = this;
        console.log(value);
        return value === "Escolha seu estado"
          ? createError({ path, message: errorMessage })
          : value;
      }
    );
  });

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório!"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email")], "E-mails diferentes")
      .required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
      .required("Campo obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório!"),
    cell_phone: yup.string().required("Campo obrigatório!"),
    state: yup
      .string()
      .ensure()
      .required("Campo obrigatório!")
      .validState("Campo obrigatório!"),
    zip_code: yup
      .string()
      .required("Campo obrigatório!")
      .min(9, "cep deve conter 8 dígitos")
      .validZipCode("uhul"),
    city: yup.string().required("Campo obrigatório!"),
    street: yup.string().required("Campo obrigatório!"),
    number: yup.string().required("Campo obrigatório!"),
    complement: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selRef = register("state");

  const history = useHistory();

  const onSubmitFunction = (data) => {
    delete data["confirmPassword"];
    delete data["confirmEmail"];
    console.log(data);
    registerUser(data);
    history.push("/signin");
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container>
        <Content>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
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
                name="email"
                label="Email"
                placeholder="Digite seu email"
                error={errors.email?.message}
              />

              <Error>{errors.email?.message}</Error>
            </div>
            <div className="inputContainer">
              <Input
                register={register}
                name="confirmEmail"
                label="Confirme seu email"
                placeholder="Confirme seu e-mail"
                error={errors.confirmEmail?.message}
              />
              <Error>{errors.confirmEmail?.message}</Error>
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

            <div className="inputContainer">
              <Input
                register={register}
                type="password"
                label="Confirme sua senha"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                error={errors.confirmPassword?.message}
              />
              <Error>{errors.confirmPassword?.message}</Error>
            </div>
            <div className="inputContainer">
              <InputCellPhone
                className="input"
                label="Digite seu celular"
                placeholder="Digite seu celular"
                name="cell_phone"
                error={errors.cell_phone?.message}
                register={register}
              />
              <Error>{errors.cell_phone?.message}</Error>
            </div>
            <div className="inputContainer">
              <Input
                onChange={(e) => {
                  maskZipCode(e.target, e);
                }}
                label="Digite seu CEP"
                name="zip_code"
                placeholder="Digite seu CEP"
                error={errors.zip_code?.message}
                register={register}
              />
              <Error>{errors.zip_code?.message}</Error>
            </div>

            <div className="inputContainer">
              <select
                className="select"
                ref={selRef.ref}
                name={selRef.name}
                placeholder="Estado"
                onChange={(e) => {
                  selRef.onChange(e);
                  console.log(e.target.value);
                }}
              >
                {validStates.map((o) => {
                  return (
                    <option value={o.code} key={o.code}>
                      {o.name}
                    </option>
                  );
                })}
              </select>
              <Error>{errors.state?.message}</Error>
            </div>
            <div className="inputContainer">
              <Input
                label="Digite sua cidade"
                name="city"
                placeholder="Digite sua cidade"
                error={errors.city?.message}
                register={register}
              />
              <Error>{errors.city?.message}</Error>
            </div>
            <div className="inputContainer">
              <Input
                label="Digite sua rua"
                name="street"
                placeholder="Digite sua rua"
                error={errors.street?.message}
                register={register}
              />
              <Error>{errors.street?.message}</Error>
            </div>
            <div style={{ display: "flex" }}>
              <div className="inputContainer" style={{ marginRight: 5 }}>
                <Input
                  label="Número"
                  name="number"
                  placeholder="Número"
                  error={errors.number?.message}
                  register={register}
                />
                <Error>{errors.number?.message}</Error>
              </div>
              <div className="inputContainer">
                <Input
                  label="Complemento"
                  name="complement"
                  placeholder="Complemento"
                  error={errors.complement?.message}
                  register={register}
                />
                <Error>{errors.complement?.message}</Error>
              </div>
            </div>
            <p className="loginMessage">
              Já possui conta? <Link to="/signin">Faça login aqui.</Link>
            </p>
            <div>
              <Button type="submit">Cadastrar</Button>
            </div>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default Signup;
