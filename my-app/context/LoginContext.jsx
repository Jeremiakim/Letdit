import { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggIn, setIsLoggIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <LoginContext.Provider value={{ isLoggIn, setIsLoggIn, userId, setUserId }}>
      {children}
    </LoginContext.Provider>
  );
};
