import { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
import MenuContent from './MenuContent';
import OrderSummary from './OrderSummary';
import PayOrder from './PayOrder';

function MainContent({ onAddToOrder, orderItems, onRemoveItem, onUpdateQuantity }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPay, setShowPay] = useState(false);

  return (
    <div className="flex flex-1">
      <MenuContent onAddToOrder={onAddToOrder} disabled={showConfirm || showPay} />
      {!showConfirm && !showPay && (
        <OrderSummary
          orderItems={orderItems}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
          onConfirmOrder={() => setShowConfirm(true)}
        />
      )}
      {showConfirm && !showPay && (
        <ConfirmOrder
          orderItems={orderItems}
          onBack={() => setShowConfirm(false)}
          onPay={() => { setShowPay(true); setShowConfirm(false); }}
        />
      )}
      {showPay && (
        <PayOrder
          orderItems={orderItems}
          onBack={() => { setShowPay(false); setShowConfirm(true); }}
          onCancel={() => { setShowPay(false); setShowConfirm(false); }}
          onConfirmPayment={(method) => {
            // Recordatorio: Aqui puedo enviar el pago al backend
            alert(`Pago confirmado con: ${method === "card" ? "Tarjeta" : "Efectivo"}`);
            setShowPay(false);
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
}

export default MainContent;