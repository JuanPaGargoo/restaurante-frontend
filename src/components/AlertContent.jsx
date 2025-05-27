import { useState, useEffect } from "react";
import { useCuenta } from "../context/CuentaContext";

function AlertContent() {
  const { helpAlerts, limpiarAlerta, confirmarPago } = useCuenta();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [now, setNow] = useState(new Date());

  // Consumir la API al montar el componente
  useEffect(() => {
    fetch("http://localhost:3000/api/cuentas/dashboard")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  // Actualiza la fecha y hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtrado por status, que tengan al menos un pedido y mesa asociada
  const filteredOrders = filter === "all"
    ? orders.filter(order => order.status !== "Sin pedidos" && order.table !== null)
    : orders.filter(order => order.status === filter && order.status !== "Sin pedidos" && order.table !== null);

  // Fecha y hora en español
  const fecha = now.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const hora = now.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex gap-6 h-full p-6">
      {/* Contenido principal */}
      <div className="flex-1 bg-azulCarbon rounded-xl p-6 flex flex-col shadow-lg">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white">Panel</h1>
            <p className="text-gray-400 text-sm capitalize">{fecha}</p>
          </div>
          <div className="text-gray-400 text-sm">{hora}</div>
        </div>
        <hr className="border-gray-700 my-4" />

        {/* Reporte de órdenes */}
        <div className=" rounded-xl p-6  flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Reporte de Órdenes</h2>
            <button
              className="flex items-center border border-gray-500 rounded-lg px-4 py-2 text-gray-200 hover:bg-gray-700 transition"
              onClick={() => setFilter(filter === "all" ? "En preparación" : "all")}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h3.28a1 1 0 01.948.684l.326.98A1 1 0 009.447 6h5.106a1 1 0 00.948-.684l.326-.98A1 1 0 0116.72 3H20a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v13a2 2 0 002 2h12a2 2 0 002-2V7" />
              </svg>
              Filtrar por estado
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-2 font-semibold">Orden</th>
                  <th className="py-2 px-2 font-semibold">Hora de admisión</th>
                  <th className="py-2 px-2 font-semibold">Mesa</th>
                  <th className="py-2 px-2 font-semibold">Estado</th>
                  <th className="py-2 px-2 font-semibold">Total</th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-2 px-2">{order.id}</td>
                    <td className="py-2 px-2">{order.time}</td>
                    <td className="py-2 px-2">{order.table}</td>
                    <td className="py-2 px-2">
                      <span className={
                        order.status === "Entregado"
                          ? "font-bold text-white"
                          : order.status === "Listo"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-2">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold shadow-md transition"
                        onClick={async () => {
                          await confirmarPago(order.id, order.total, "cash");
                          alert("Pago confirmado");
                          // Opcional: recarga las órdenes
                          setOrders(orders => orders.filter(o => o.id !== order.id));
                        }}
                      >
                        Confirmar pago
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Sección de alertas */}
      <div className="w-[350px] bg-azulCarbon rounded-xl p-6 shadow-lg flex flex-col">
        <h2 className="text-lg font-bold text-white mb-2">Alertas</h2>
        <hr className="border-gray-700 mb-4" />
        <div className="flex flex-col gap-4">
          {helpAlerts.length === 0 ? (
            <div className="text-gray-400">No hay alertas de ayuda.</div>
          ) : (
            helpAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-start gap-4 bg-grisAcero rounded-lg p-4 shadow-md"
              >
                <svg
                  className="w-7 h-7 text-gray-300 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.73 21a2 2 0 01-3.46 0M12 19v-1m-6-5V9a6 6 0 1112 0v4a2 2 0 002 2h-1a2 2 0 01-2 2H7a2 2 0 01-2-2H4a2 2 0 002-2z"
                  />
                </svg>
                <div>
                  <div className="text-white font-medium">{alert.message}</div>
                  <div className="text-gray-400">{alert.detail}</div>
                  <button
                    className="mt-2 text-xs text-rojoBrillante underline"
                    onClick={() => limpiarAlerta(alert.id)}
                  >
                    Quitar alerta
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertContent;