import { useCuenta } from "../context/CuentaContext";
import { useUserType } from "../context/UserTypeContext"; // Importa el hook
import { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";

function agrupaPlatillos(platillos) {
  const agrupados = {};
  platillos.forEach((item) => {
    if (agrupados[item.id]) {
      agrupados[item.id].quantity += item.quantity;
    } else {
      agrupados[item.id] = { ...item };
    }
  });
  return Object.values(agrupados);
}

function PayOrder({ orderItems, onBack, onCancel, onConfirmPayment }) {
  const { confirmedOrders, clearConfirmedOrders, cuentaId } = useCuenta();
  const { numeroMesa } = useUserType(); // Obtén el número de mesa del contexto
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  // Aplana y agrupa todos los platillos de todos los pedidos confirmados
  const allItems = agrupaPlatillos(confirmedOrders.flat());

  // Calcula el total
  const total = allItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  // Función para manejar el pago
  const handleConfirmPayment = async () => {
    if (!cuentaId) {
      alert("No hay cuenta activa para pagar.");
      return;
    }
    try {
      // Payload para el pago
      const pagoPayload = {
        monto: total,
        metodo: paymentMethod,
        fecha: new Date().toISOString(),
      };

      // Actualiza la cuenta agregando el pago
      const res = await fetch(
        `http://localhost:3000/api/cuentas/${cuentaId}/pago`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagoPayload),
        }
      );

      if (!res.ok) throw new Error("Error al registrar el pago");

      // Limpia la cuenta y pedidos para iniciar una nueva cuenta
      clearConfirmedOrders();

      // Puedes mostrar feedback o cerrar el modal
      onConfirmPayment(paymentMethod);
    } catch (err) {
      alert("Hubo un error al registrar el pago");
    }
  };

  return (
    <aside className="fixed inset-0 bg-black/75 flex justify-end z-50">
      <div className="w-[800px] h-full bg-azulCarbon flex overflow-y-scroll scrollbar">
        {/* Resumen de la orden */}
        <div className="w-[409px] border-r border-[#35354a]">
          <ConfirmOrder orderItems={allItems} onBack={onBack} hidePayButton />
        </div>
        {/* Sección de pago */}
        <div className="flex-1 flex flex-col p-4 border-l border-[#35354a]">
          <h2 className="text-white  font-bold mb-2 ">Pago</h2>
          <div className="border-y border-[#35354a]">
            <span className="text-white font-semibold mb-2 block pt-4">
              Método de Pago
            </span>
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-3 rounded border ${
                  paymentMethod === "card"
                    ? "border-rojoBrillante bg-[#23232f]"
                    : "border-gray-600 bg-transparent"
                } text-white font-semibold`}
                onClick={() => setPaymentMethod("card")}
              >
                Tarjeta
              </button>
              <button
                className={`flex-1 py-3 rounded border ${
                  paymentMethod === "cash"
                    ? "border-rojoBrillante bg-[#23232f]"
                    : "border-gray-600 bg-transparent"
                } text-white font-semibold`}
                onClick={() => setPaymentMethod("cash")}
              >
                Efectivo
              </button>
            </div>
            {/* Formulario de tarjeta */}
            {paymentMethod === "card" && (
              <form className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                    placeholder="Ej: Juan Pérez"
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData({ ...cardData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Numero de tarjeta
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                    placeholder="Ej: 2564 1421 0897 1244"
                    value={cardData.number}
                    onChange={(e) =>
                      setCardData({ ...cardData, number: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm mb-1">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                      placeholder="Ej: 12/25"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({ ...cardData, expiry: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm mb-1">CVV</label>
                    <input
                      type="password"
                      className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                      placeholder="•••"
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({ ...cardData, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-rojoBrillante text-white py-2 rounded mt-2 hover:bg-red-700 transition-colors font-semibold"
                  onClick={() => alert("Solicitando terminal...")}
                >
                  Pedir Terminal
                </button>
              </form>
            )}
            {paymentMethod === "cash" && (
              <p className="text-gray-400 mb-4">
                Porfavor ten listo el dinero. Cuando confirmes, llegara un mesero
                para recibir el pago
              </p>
            )}
          </div>
          <div className="flex gap-4 my-10">
            <button
              className="flex-1 border border-rojoBrillante text-rojoBrillante py-3 rounded hover:bg-red-900/20 transition-colors"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className="flex-1 bg-rojoBrillante text-white py-3 rounded hover:bg-red-900/20 transition-colors font-bold"
              onClick={handleConfirmPayment}
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PayOrder;