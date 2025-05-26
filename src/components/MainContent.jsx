import { useState } from "react";
import { useCuenta } from "../context/CuentaContext";
import ConfirmOrder from "./ConfirmOrder";
import MenuContent from './MenuContent';
import OrderSummary from './OrderSummary';
import PayOrder from './PayOrder';

function MainContent({ onAddToOrder, orderItems, onRemoveItem, onUpdateQuantity,onClearOrder }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const { addConfirmedOrder, confirmedOrders, clearConfirmedOrders } = useCuenta();

  const handleConfirmOrder = () => {
    addConfirmedOrder(orderItems); 
    setShowConfirm(true);
  };

  return (
    <div className="flex flex-1">
      <MenuContent onAddToOrder={onAddToOrder} disabled={showConfirm || showPay} />
      {!showConfirm && !showPay && (
        <OrderSummary
          orderItems={orderItems}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
          onConfirmOrder={handleConfirmOrder}
        />
      )}
      {showConfirm && !showPay && (
        <ConfirmOrder
          orderItems={confirmedOrders[confirmedOrders.length - 1] || []}
          onBack={() => {
            onClearOrder(); // Limpia la orden al regresar
            setShowConfirm(false);
          }}
          onPay={() => { setShowPay(true); setShowConfirm(false); }}
        />
      )}
      {showPay && (
        <PayOrder
          orderItems={confirmedOrders[confirmedOrders.length - 1] || []}
          onBack={() => { setShowPay(false); setShowConfirm(true);  onClearOrder();}}
          onCancel={() => { setShowPay(false); setShowConfirm(false); onClearOrder(); }}
          onConfirmPayment={(method) => {
            alert(`Pago confirmado con: ${method === "card" ? "Tarjeta" : "Efectivo"}`);
            clearConfirmedOrders();
            setShowPay(false);
            setShowConfirm(false);
            onClearOrder();
          }}
        />
      )}
    </div>
  );
}

export default MainContent;