
import MenuContent from './MenuContent';
import OrderSummary from './OrderSummary';

function MainContent({ onAddToOrder, orderItems, onRemoveItem, onUpdateQuantity }) {
  return (
    <div className="flex flex-1">
      <MenuContent onAddToOrder={onAddToOrder} />
      <OrderSummary
        orderItems={orderItems}
        onRemoveItem={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
}

export default MainContent;