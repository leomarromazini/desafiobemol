import axios from "axios";
import { createContext, useContext, useState } from "react";

const ValidateZipCodeContext = createContext([]);

export const ValidateZipCodeProvider = ({ children }) => {
  const [adressData, setAdressData] = useState([]);

  const validateZipCode = (zipCode) => {
    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`).then((response) => {
      setAdressData(response["data"]);
    });

    if (adressData.erro) {
      return false;
    }

    return true;
  };

  return (
    <ValidateZipCodeContext.Provider value={{ adressData, validateZipCode }}>
      {children}
    </ValidateZipCodeContext.Provider>
  );
};

export const useValidateZipCode = () => useContext(ValidateZipCodeContext);
