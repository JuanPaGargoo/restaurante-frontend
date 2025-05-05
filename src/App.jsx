import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import OrderSummary from './components/OrderSummary';
import { useState } from 'react';

function App() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="flex h-screen bg-grisAcero text-white">
      <Sidebar />
      <MainContent onAddToOrder={handleAddToOrder} />
      <OrderSummary
        orderItems={orderItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;
