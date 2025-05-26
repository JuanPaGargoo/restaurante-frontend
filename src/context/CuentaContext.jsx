import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { useUserType } from "./UserTypeContext";

export const CuentaContext = createContext();

export const CuentaProvider = ({ children }) => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [cuentaId, setCuentaId] = useState(null);
  const { numeroMesa } = useUserType();
  const isFirstOrder = useRef(true);

  // Efecto para crear la cuenta solo la primera vez que se agrega un pedido
  useEffect(() => {
    if (isFirstOrder.current && confirmedOrders.length > 0) {
      const total = confirmedOrders[0].reduce((acc, item) => acc + item.precio * item.quantity, 0);
      createCuentaInDatabase(total);
      isFirstOrder.current = false;
    }
  }, [confirmedOrders]);

  const createCuentaInDatabase = async (total) => {
    try {
      const payload = {
        total,
        pagada: false,
        mesas: [
          {
            id: Number(numeroMesa),
            estado: "ocupada",
          },
        ],
        
        pedidos: confirmedOrders.map((order) => ({
          estado: "En preparación",
          fecha: new Date().toISOString(),
          pedido_platillo: order.map((item) => ({
            platillo_id: item.id,
            cantidad: item.quantity,
            precio_unit: item.precio,
          })),
        })),
      };

      const res = await fetch("http://localhost:3000/api/cuentas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear la cuenta en la base de datos");
      const data = await res.json();

      setCuentaId(data.id);
    } catch (err) {
      console.error("Error al crear la cuenta:", err);
    }
  };

  const addConfirmedOrder = async (order) => {
    if (cuentaId) {
      // Si la cuenta ya existe, agrega el nuevo pedido a la base de datos
      const nuevoPedido = {
        estado: "En preparación",
        fecha: new Date().toISOString(),
        pedido_platillo: order.map((item) => ({
          platillo_id: item.id,
          cantidad: item.quantity,
          precio_unit: item.precio,
        })),
      };

      try {
        const res = await fetch(`http://localhost:3000/api/cuentas/${cuentaId}/pedido`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPedido),
        });
        if (!res.ok) throw new Error("Error al agregar el pedido a la cuenta");
        const data = await res.json();
        // Opcional: puedes actualizar el estado local si quieres reflejar el cambio inmediatamente
        setConfirmedOrders((prevOrders) => [...prevOrders, order]);
      } catch (err) {
        console.error("Error al agregar el pedido:", err);
      }
    } else {
      // Si es el primer pedido, solo actualiza el estado local
      setConfirmedOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  const clearConfirmedOrders = () => {
    setConfirmedOrders([]);
    setCuentaId(null);
    isFirstOrder.current = true;
  };

  const confirmarPago = async (monto, metodo) => {
    if (!cuentaId) return;
    monto = parseFloat(monto);
    try {
      // 1. Registrar el pago y marcar la cuenta como pagada
      const pagoPayload = {
        monto,
        metodo,
      };
      const resPago = await fetch(`http://localhost:3000/api/cuentas/${cuentaId}/pago`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagoPayload),
      });
      if (!resPago.ok) throw new Error("Error al registrar el pago");


      // 2. Cambiar la mesa a "libre" y pedidos a "finalizado"
      const resFinalizar = await fetch(`http://localhost:3000/api/cuentas/${cuentaId}/finalizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}) 
      });
      if (!resFinalizar.ok) throw new Error("Error al finalizar la cuenta");

      if (!resPago.ok) {
            const errorData = await resPago.json();
            throw new Error(errorData.error || "Error al registrar el pago");
        }
        if (!resFinalizar.ok) {
            const errorData = await resFinalizar.json();
            throw new Error(errorData.error || "Error al finalizar la cuenta");
        }
      // 3. Limpiar el contexto
      clearConfirmedOrders();
    } catch (err) {
      console.error("Error al confirmar el pago:", err);
    }
  };

  return (
    <CuentaContext.Provider
      value={{ confirmedOrders, cuentaId, addConfirmedOrder, clearConfirmedOrders, confirmarPago }}
    >
      {children}
    </CuentaContext.Provider>
  );
};

export const useCuenta = () => useContext(CuentaContext);