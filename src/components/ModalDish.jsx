import React from 'react';

function ModalDish({ isOpen, onClose, dish, apiBaseUrl, onAddToOrder }) {
  if (!isOpen) return null;

  const handleAdd = () => {
    if (dish && dish.id) {
      onAddToOrder(dish); // Asegúrate de que `dish` tiene los datos correctos
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      <div
        className="bg-grisAcero rounded-lg p-6 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
      >
        <h2 className="text-xl font-bold mb-4">{dish.nombre}</h2>
        <img
          src={`${apiBaseUrl}${dish.imagen_url}`}
          alt={dish.nombre}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-6">{dish.descripcion || 'Descripción no disponible.'}</p>
        <div className="flex justify-between">
          <button
            className="bg-azulCarbon text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Atrás
          </button>
          <button
            className="bg-rojoBrillante text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleAdd}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDish;