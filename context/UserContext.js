// contexts/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const { data: dataMe, isLoading: isLoadingMe, error } = useSWR(
    isUserLogin ? "user/client/me" : null
  );

  return (
    <UserContext.Provider value={{ dataMe, isLoadingMe, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
