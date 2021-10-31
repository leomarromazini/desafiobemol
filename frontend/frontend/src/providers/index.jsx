import { ValidateZipCodeProvider } from "./ValidateZipCode";
import { UserProvider } from "./User";
const Providers = ({ children }) => {
  return (
    <>
      <UserProvider>
        <ValidateZipCodeProvider>{children}</ValidateZipCodeProvider>
      </UserProvider>
    </>
  );
};

export default Providers;
