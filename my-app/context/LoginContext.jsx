import { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggIn, setIsLoggIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggIn, setIsLoggIn }}>
      {children}
    </LoginContext.Provider>
  );
};
