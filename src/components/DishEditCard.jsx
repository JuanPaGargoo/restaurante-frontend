import React from "react";

function DishEditCard({ dish, apiBaseUrl }) {
  return (
    <div
      className="bg-azulCarbon border border-gray-700 rounded-2xl flex flex-col items-center h-[250px] w-[190px] relative transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="h-[210px] w-[190px] rounded-2xl overflow-hidden p-2 flex items-center justify-center">
        <img
          src={
            dish.imagen_url
              ? `${apiBaseUrl}${dish.imagen_url}`
              : "https://via.placeholder.com/80"
          }
          alt={dish.nombre}
          className="object-cover h-full w-full rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1.5 h-full w-full px-2 -mt-6">
        <h3 className="text-md font-bold text-center truncate">
          {dish.nombre}
        </h3>
        <p className="text-md text-gray-400 text-center truncate">
          ${dish.precio && !isNaN(dish.precio) ? Number(dish.precio).toFixed(2) : "N/A"}
        </p>
        <button className="mt-2 w-full bg-red-900/80 hover:bg-red-700 text-red-200 font-semibold py-2 rounded-lg transition">
          Edit dish
        </button>
      </div>
    </div>
  );
}

export default DishEditCard;