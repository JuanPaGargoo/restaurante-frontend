import { useCuenta } from "../context/CuentaContext";

function agrupaPlatillos(platillos) {
  const agrupados = {};
  platillos.forEach(item => {
    if (agrupados[item.id]) {
      agrupados[item.id].quantity += item.quantity;
    } else {
      agrupados[item.id] = { ...item };
    }
  });
  return Object.values(agrupados);
}

function ConfirmOrder({ orderItems, onBack, onPay, hidePayButton }) {
  const { confirmedOrders } = useCuenta();
  const apiBaseUrl = "http://localhost:3000";

  // Aplana y agrupa todos los platillos de todos los pedidos confirmados
  const allItems = agrupaPlatillos(confirmedOrders.flat());

  const total = allItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);


  return (
    <aside className="w-[409px] bg-azulCarbon p-4 flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">Confirmación de Orden</h2>
        {!hidePayButton && (
          <button className="bg-rojoBrillante text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors text-sm">
            Necesito Ayuda
          </button>
        )}
      </div>
      {/* Table header */}
      <div className="flex text-gray-400 text-xs font-semibold px-2 mb-2">
        <div className="flex-1">Platillo</div>
        <div className="w-16 text-center">Cant.</div>
        <div className="w-20 text-right">Precio</div>
      </div>
      {/* Items */}
      <div className="flex-1">
        {allItems.map(item => (
          <div key={item.id + '-' + Math.random()} className="flex items-center py-2">
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
            <div className="w-16 flex justify-center">
              <div className="bg-[#23232f] text-white w-10 h-10 flex items-center justify-center rounded-lg text-base font-medium">
                {item.quantity}
              </div>
            </div>
            <div className="w-20 text-right text-white font-semibold text-base">
              ${(item.precio * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* Totals */}
      <div className="mt-6 border-t border-[#35354a] pt-4">
        <div className="flex justify-between text-gray-400 text-sm mb-2">
          <span>Descuento</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between text-white text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex gap-4 mt-4">
        {!hidePayButton && (
          <button
            className="flex-1 bg-rojoBrillante text-white py-2 rounded  hover:bg-red-700 transition-colors"
            onClick={onBack}
          >
            Nueva Orden
          </button>
        )}
        {!hidePayButton && (
          <button
            className="flex-1 bg-rojoBrillante text-white py-2 rounded  hover:bg-red-700 transition-colors"
            onClick={onPay}
          >
            Pagar
          </button>
        )}
      </div>
    </aside>
  );
}

export default ConfirmOrder;