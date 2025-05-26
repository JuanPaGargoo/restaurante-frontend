import React, { createContext, useState, useContext } from 'react';

export const CuentaContext = createContext();

export const CuentaProvider = ({ children }) => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  const addConfirmedOrder = (order) => {
    setConfirmedOrders((prevOrders) => [...prevOrders, order]);
    console.log("Orden confirmada:", order);
    console.log("Todas las ordenes confirmadas:", [...confirmedOrders, order]);
  };

  const clearConfirmedOrders = () => {
    console.log("Ordenes confirmadas:", confirmedOrders);
    setConfirmedOrders([]);
  };

  return (
    <CuentaContext.Provider value={{ confirmedOrders, addConfirmedOrder, clearConfirmedOrders }}>
      {children}
    </CuentaContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useCuenta = () => useContext(CuentaContext);