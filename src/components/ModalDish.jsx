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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      <div
        className="bg-grisAcero rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">{dish.nombre}</h2>

        {/* Imagen */}
        <img
          src={`${apiBaseUrl}${dish.imagen_url}`}
          alt={dish.nombre}
          className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
        />

        {/* Descripción */}
        <p className="text-gray-300 text-center mb-6">
          {dish.descripcion || 'Descripción no disponible.'}
        </p>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            className="bg-gray-700 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
            onClick={onClose}
          >
            Atrás
          </button>
          <button
            className="bg-rojoBrillante text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
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