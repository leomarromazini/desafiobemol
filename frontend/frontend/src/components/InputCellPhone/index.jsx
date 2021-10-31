import { CustomInput } from "./styles";
const InputCellPhone = ({
  placeholder,
  error,
  register,
  name,
  value,
  onChange,
  ...rest
}) => (
  <CustomInput
    mask="(99)99999-9999"
    value={value}
    onChange={onChange}
    {...register(name)}
    isErrored={!!error}
    placeholder={placeholder}
    {...rest}
    errored={!!error}
  />
);

export default InputCellPhone;
