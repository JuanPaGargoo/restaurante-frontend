import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SettingsContent from './components/SettingsContent';
import AlertContent from './components/AlertContent';
import ViewKitchen from './components/ViewKitchen';
// import MenuContent from './components/MenuContent'; // Ya no lo necesitas aquí
// import OrderSummary from './components/OrderSummary'; // Ya no lo necesitas aquí
import { useState } from 'react';

function App() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (dish) => {
    console.log("Platillo recibido:", dish); // Log para depuración

    if (!dish.precio || typeof dish.precio !== "number") {
      console.error(`El precio del platillo con id ${dish.id} no está definido o no es válido.`);
      return; // Evita agregar el platillo si no tiene un precio válido
    }

    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        { ...dish, quantity: 1 }, // dish.precio ya está validado
      ];
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
    <BrowserRouter>
      <div className="flex h-screen bg-grisAcero text-white">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                onAddToOrder={handleAddToOrder}
                orderItems={orderItems}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route path="/configuracion" element={<SettingsContent />} />
          <Route path="/alertas" element={<AlertContent />} />
          <Route path="/cocina" element={<ViewKitchen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
