import React, { useEffect, useState } from "react";

function ViewKitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consumir la API al montar el componente
  useEffect(() => {
    fetch("http://localhost:3000/api/pedidos/con-platillos")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar solo los pedidos en preparación
        const filtered = data.filter((pedido) => pedido.estado === "En preparación");
        // Mapear a la estructura que usa el renderizado
        const mapped = filtered.map((pedido) => ({
          id: pedido.id,
          time: new Date(pedido.fecha).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          items: pedido.pedido_platillo.map((pp) => ({
            qty: pp.cantidad,
            name: pp.platillos.nombre,
            notes: pp.notas || "",
          })),
        }));
        setOrders(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Estado para fecha y hora actual
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
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
    <div className="min-h-screen text-white p-10 ml-7">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">Cocina</h1>
          <p className="text-gray-400 text-sm capitalize">{fecha}</p>
        </div>
        <div className="text-gray-400 text-lg">{hora}</div>
      </div>
      <hr className="border-gray-700 my-4" />
      <h2 className="text-xl font-semibold mb-6">Órdenes</h2>
      <div className="w-full">
        <div className="mx-auto scrollbar w-[1050px] max-w-full overflow-x-auto pb-4">
          <div className="flex gap-8">
            {loading ? (
              <div className="text-gray-400">Cargando órdenes...</div>
            ) : orders.length === 0 ? (
              <div className="text-gray-400">No hay órdenes en preparación.</div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-azulCarbon rounded-xl shadow-lg p-6 flex flex-col min-w-[320px] max-w-xs flex-shrink-0"
                >
                  <div className="font-bold text-center mb-4 text-gray-200">
                    ORDEN #{order.id}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between px-1 mb-2">
                      <span className="font-semibold text-gray-400 mr-2.5">Platillo</span>
                      <span className="font-semibold text-gray-400">Cant</span>
                    </div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="mb-6">
                        <div className="flex justify-between items-start gap-8">
                          <span
                            className="text-gray-200 break-words"
                            style={{ minWidth: "0", maxWidth: "200px", wordBreak: "break-word" }}
                          >
                            {item.name}
                          </span>
                          <span className="font-semibold text-gray-300 text-lg flex-shrink-0">
                            {item.qty}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 ml-1">
                          Notas: {item.notes ? item.notes : <span className="italic text-gray-600">Sin notas</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <div className="text-xs text-gray-400">Hora de admisión</div>
                      <div className="font-semibold">{order.time}</div>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded transition shadow"
                      onClick={async () => {
                        try {
                          // 1. Actualiza el estado del pedido en el backend
                          const res = await fetch(`http://localhost:3000/api/pedidos/${order.id}/estado`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ estado: "Listo" }),
                          });
                          if (!res.ok) throw new Error("No se pudo actualizar el estado");

                          // 2. Opcional: Actualiza el estado local para quitar la orden de la lista
                          setOrders((prev) => prev.filter((o) => o.id !== order.id));
                        } catch (err) {
                          alert("Error al marcar como listo");
                        }
                      }}
                    >
                      LISTO
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewKitchen;