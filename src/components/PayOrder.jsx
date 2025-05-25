import { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";

function PayOrder({ orderItems, onBack, onCancel, onConfirmPayment }) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  return (
    <aside className="fixed inset-0 bg-black/75 flex justify-end z-50">
      <div className="w-[800px] h-full bg-azulCarbon flex overflow-y-scroll scrollbar">
        {/* Resumen de la orden */}
        <div className="w-[409px] border-r border-[#35354a]">
          <ConfirmOrder orderItems={orderItems} onBack={onBack} hidePayButton />
        </div>
        {/* Sección de pago */}
        <div className="flex-1 flex flex-col p-4 border-l border-[#35354a]">
          <h2 className="text-white  font-bold mb-2 ">Pago</h2>
          <div className="border-y border-[#35354a]">
            <span className="text-white font-semibold mb-2 block pt-4">Método de Pago</span>
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-3 rounded border ${paymentMethod === "card" ? "border-rojoBrillante bg-[#23232f]" : "border-gray-600 bg-transparent"} text-white font-semibold`}
                onClick={() => setPaymentMethod("card")}
              >
                Tarjeta
              </button>
              <button
                className={`flex-1 py-3 rounded border ${paymentMethod === "cash" ? "border-rojoBrillante bg-[#23232f]" : "border-gray-600 bg-transparent"} text-white font-semibold`}
                onClick={() => setPaymentMethod("cash")}
              >
                Efectivo
              </button>
            </div>
            {/* Formulario de tarjeta */}
            {paymentMethod === "card" && (
              <form className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Nombre del titular</label>
                  <input
                    type="text"
                    className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                    placeholder="Ej: Juan Pérez"
                    value={cardData.name}
                    onChange={e => setCardData({ ...cardData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Numero de tarjeta</label>
                  <input
                    type="text"
                    className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                    placeholder="Ej: 2564 1421 0897 1244"
                    value={cardData.number}
                    onChange={e => setCardData({ ...cardData, number: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm mb-1">Fecha de expiración</label>
                    <input
                      type="text"
                      className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                      placeholder="Ej: 12/25"
                      value={cardData.expiry}
                      onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm mb-1">CVV</label>
                    <input
                      type="password"
                      className="w-full bg-[#23232f] text-white rounded px-4 py-2 outline-none text-sm"
                      placeholder="•••"
                      value={cardData.cvv}
                      onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
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
              onClick={() => onConfirmPayment(paymentMethod)}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PayOrder;