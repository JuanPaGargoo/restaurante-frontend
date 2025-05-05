import { useState } from "react";

function OrderSummary({ orderItems, onRemoveItem, onUpdateQuantity }) {
  const apiBaseUrl = "http://localhost:3000"; // Cambia esto por tu base URL

  return (
    <aside className="w-[409px] bg-azulCarbon p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {/* Contenedor con alto fijo y scroll */}
      <div className="space-y-4 h-[380px] overflow-y-auto scrollbar">
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-800 p-4 rounded-lg"
            >
              {/* Imagen */}
              <img
                src={`${item.imagen_url.startsWith("http") ? item.imagen_url : `${apiBaseUrl}${item.imagen_url}`}`}
                alt={item.nombre}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              {/* Nombre, precio y cantidad */}
              <div className="flex-1">
                <h3 className="font-bold text-white">{item.nombre}</h3>
                <p className="text-gray-400">
                  ${typeof item.precio === "number" ? item.precio.toFixed(2) : "0.00"}
                </p>
                {/* Controles de cantidad */}
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-4 text-white">{item.quantity}</span>
                  <button
                    className="bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Botón para eliminar */}
              <button
                className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded hover:bg-red-700"
                onClick={() => onRemoveItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No hay platillos en el pedido.</p>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            $
            {orderItems
              .reduce((total, item) => total + item.precio * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">
            $
            {orderItems
              .reduce((total, item) => total + item.precio * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-rojoBrillante text-white py-2 mt-4 rounded">
          Confirm Order
        </button>
      </div>
    </aside>
  );
}

export default OrderSummary;