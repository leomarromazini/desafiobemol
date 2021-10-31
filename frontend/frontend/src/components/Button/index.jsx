import { ButtonType } from "./styles";

const Button = ({ onClickFunc, children, whiteSchema = false, ...rest }) => {
  return (
    <ButtonType
      type="button"
      whiteSchema={whiteSchema}
      onClick={onClickFunc}
      {...rest}
    >
      {children}
    </ButtonType>
  );
};

export default Button;
