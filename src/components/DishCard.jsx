import React, { useState } from 'react';
import ModalDish from './ModalDish';

function DishCard({ dish, apiBaseUrl, onAddToOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Tarjeta */}
      <div
        className="bg-azulCarbon rounded-2xl flex flex-col items-center h-[230px] w-[190px] relative transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="h-[200px] w-[190px] rounded-2xl overflow-hidden">
          <img
            src={`${apiBaseUrl}${dish.imagen_url}`}
            alt={dish.nombre}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 h-full w-full px-2 -mt-6">
          <h3 className="text-md font-bold text-center truncate">{dish.nombre}</h3>
          <p className="text-md text-gray-400 text-center truncate">${dish.precio}</p>
        </div>
      </div>

      {/* Modal */}
      <ModalDish
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dish={dish}
        apiBaseUrl={apiBaseUrl}
        onAddToOrder={onAddToOrder}
      />
    </>
  );
}

export default DishCard;