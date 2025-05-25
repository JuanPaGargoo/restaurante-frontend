import { useState } from "react";

function OrderSummary({ orderItems, onRemoveItem, onUpdateQuantity, onConfirmOrder }) {
  const apiBaseUrl = "http://localhost:3000"; // Cambia esto por tu base URL

  const handleAddToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        { ...dish, quantity: 1, precio: dish.precio || 0 }, // Asegúrate de que dish.precio esté definido
      ];
    });
  };

  return (
    <aside className="w-[409px] bg-azulCarbon p-4 flex flex-col ">
      <h2 className="text-base font-bold text-white">Orders</h2>
      
      {/* Contenedor con alto fijo y scroll */}
      <div className="space-y-4 h-[380px] overflow-y-auto scrollbar">
      <div className="flex text-gray-400 text-xs font-semibold px-2 mb-1 pt-7">
        <div className="flex-1">Platillo</div>
        <div className="w-16 text-center">Cant.</div>
        <div className="w-20 text-right">Precio</div>
      </div>

        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <div
              key={item.id}
              className="bg-azulCarbon p-4 rounded-lg mb-2"
            >
              <div className="flex items-center">
                <div className="flex items-center flex-1 min-w-0">
                  <img
                      src={`${item.imagen_url.startsWith("http") ? item.imagen_url : `${apiBaseUrl}${item.imagen_url}`}`}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{item.nombre}</div>
                    <div className="text-gray-400 text-xs">${item.precio.toFixed(2)}</div>
                  </div>
                </div>
                {/* Cantidad y total */}
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value > 0) {
                        onUpdateQuantity(item.id, value);
                      }
                    }}
                    className="no-spinner bg-[#23232f] text-white w-12 h-10 flex items-center justify-center rounded-lg text-lg font-medium text-center outline-none"
                  />
                  <span className="flex justify-between text-white text-lg font-semibold">
                    ${ (item.precio * item.quantity).toFixed(2) }
                  </span>
                </div>
              </div>
              {/* Comentario (puedes conectar esto a tu estado si lo necesitas) */}
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  placeholder="Comentario para cocina..."
                  className="bg-[#23232f] text-white text-sm rounded-lg px-4 py-2 w-full outline-none"
                />
                <button
                  className="cursor-pointer ml-4 border border-rojoBrillante text-rojoBrillante w-12 h-9 flex items-center justify-center rounded-lg hover:bg-pink-900/20 transition-colors"
                  onClick={() => onRemoveItem(item.id)}
                  title="Eliminar"
                >
                  {/* Ícono bote de basura SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No hay platillos en el pedido.</p>
        )}
      </div>

      <div className="mt-6 border-t border-[#35354a] pt-4">
        <div className="flex justify-between text-gray-400 text-sm mb-2">
          <span>Subtotal</span>
          <span>
            $
            {orderItems
              .reduce((total, item) => total + item.precio * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-white text-lg font-bold">
          <span>Total</span>
          <span className="font-bold">
            $
            {orderItems
              .reduce((total, item) => total + item.precio * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <button
          className="cursor-pointer w-full bg-rojoBrillante text-white py-2 mt-4 rounded hover:bg-red-700 transition-colors"
          onClick={() => {
            if (orderItems.length === 0) {
              alert("Debes incluir al menos un platillo en tu orden.");
              return;
            }
            onConfirmOrder();
          }}
        >
          Confirmar Orden
        </button>
      </div>
    </aside>
  );
}

export default OrderSummary;