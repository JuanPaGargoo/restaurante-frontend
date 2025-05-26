import React, { useEffect, useState } from "react";

function ViewKitchen() {
  // Ejemplo de órdenes (puedes reemplazar por datos reales)
  const orders = [
    {
      id: 12345,
      time: "03:34 pm",
      items: [
        { qty: 1, name: "Spicy seasoned seafood noodles", notes: "Sin camarón y sin picante" },
        { qty: 2, name: "Healthy noodle with spinach leaf", notes: "" },
      ],
    },
    {
      id: 12346,
      time: "03:40 pm",
      items: [
        { qty: 1, name: "Pollo a la plancha", notes: "Sin sal" },
        { qty: 1, name: "Ensalada fresca", notes: "" },
      ],
    },
    {
      id: 12347,
      time: "03:45 pm",
      items: [
        { qty: 2, name: "Tacos de pescado", notes: "Sin cebolla" },
      ],
    },
    {
      id: 12348,
      time: "03:50 pm",
      items: [
        { qty: 1, name: "Hamburguesa clásica", notes: "Sin tomate" },
        { qty: 1, name: "Papas fritas", notes: "" },
      ],
    },
    {
      id: 12349,
      time: "03:55 pm",
      items: [
        { qty: 3, name: "Pizza margarita", notes: "" },
      ],
    },
    {
      id: 12350,
      time: "04:00 pm",
      items: [
        { qty: 2, name: "Sopa de verduras", notes: "Sin apio" },
      ],
    },
    {
      id: 12351,
      time: "04:05 pm",
      items: [
        { qty: 1, name: "Enchiladas verdes", notes: "Extra queso" },
      ],
    },
  ];

  // Estado para fecha y hora
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
    <div className="min-h-screen  text-white p-10 ml-7">
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
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-azulCarbon rounded-xl shadow-lg p-6 flex flex-col min-w-[320px] max-w-xs flex-shrink-0"
              >
                <div className="font-bold text-center mb-4 text-gray-200">
                  ORDEN #{order.id}
                </div>
                <div className="mb-4">
                  {/* Encabezados */}
                  <div className="flex justify-between px-1 mb-2">
                    <span className="font-semibold text-gray-400 mr-2.5">Platillo</span>
                    <span className="font-semibold text-gray-400">Cant</span>
                  </div>
                  {/* Items */}
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
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded transition shadow">
                    LISTO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewKitchen;