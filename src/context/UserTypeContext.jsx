import { createContext, useState, useContext } from "react";

export const UserTypeContext = createContext();

export function UserTypeProvider({ children }) {
  // Estados posibles: "cliente", "personal", "cocina"
  const [userType, setUserType] = useState("personal");
  const [numeroMesa, setNumeroMesa] = useState("0"); // Nuevo estado

  return (
    <UserTypeContext.Provider value={{ userType, setUserType, numeroMesa, setNumeroMesa }}>
      {children}
    </UserTypeContext.Provider>
  );
}

// Custom hook para usar el contexto fácilmente
export function useUserType() {
  return useContext(UserTypeContext);
}