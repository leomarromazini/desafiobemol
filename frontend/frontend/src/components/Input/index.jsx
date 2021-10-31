import { InputItem, ErrorSpan } from "./styles";

const Input = ({ placeholder, error, register, name, ...rest }) => {
  return (
    <>
      <InputItem
        {...register(name)}
        isErrored={!!error}
        placeholder={placeholder}
        {...rest}
        errored={!!error}
      ></InputItem>
    </>
  );
};

export default Input;
