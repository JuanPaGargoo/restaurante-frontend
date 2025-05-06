import { useState, useEffect } from 'react';
import DishCard from './DishCard'; // Importa el componente DishCard

function MainContent({ onAddToOrder }) {
  const [categories, setCategories] = useState([]); // Categorías
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoría seleccionada
  const [dishes, setDishes] = useState([]); // Platillos de la categoría seleccionada
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const API_BASE_URL = 'http://localhost:3000'; // URL base de la API

  // Obtener categorías al montar el componente
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categorias`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]?.id); // Selecciona la primera categoría por defecto
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Obtener platillos de la categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setError(null); // Reinicia el estado de error antes de la nueva solicitud
      fetch(`${API_BASE_URL}/api/platillos/categoria/${selectedCategory}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener los platillos');
          }
          return response.json();
        })
        .then((data) => {
          // Asegúrate de que cada platillo tenga un precio válido y sea un número
          const dishesWithDefaultPrice = data.map((dish) => ({
            ...dish,
            precio: parseFloat(dish.precio) || 0, // Convierte a número o asigna 0 si no es válido
          }));
          console.log('Platillos procesados:', dishesWithDefaultPrice); // Log para depuración
          setDishes(data.mensaje ? [] : dishesWithDefaultPrice);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message); // Solo errores críticos se manejan aquí
          setLoading(false);
        });
    }
  }, [selectedCategory]); // Se ejecuta cada vez que cambia la categoría seleccionada

  // Obtener la fecha actual
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="flex-1 p-6">
      {/* Header */}
      <header className="flex flex-col items-start mb-6">
        <h1 className="text-2xl font-bold mb-4">Restaurante</h1>
        <p className="text-sm text-gray-400">{formattedDate}</p>
      </header>

      {/* Categories Navigation */}
      <nav className="mb-6">
        <ul className="flex space-x-8 border-b border-gray-700">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`pb-2 cursor-pointer ${
                selectedCategory === category.id
                  ? 'text-rojoBrillante font-bold border-b-2 border-rojoBrillante'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category.id)} // Cambia la categoría seleccionada
            >
              {category.nombre}
            </li>
          ))}
        </ul>
      </nav>

      {/* Dishes Grid */}
      <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[400px] gap-y-7 scrollbar rounded-lg p-8">
        {loading ? (
          <p className="text-white col-span-3 text-center">Cargando...</p>
        ) : dishes.length > 0 ? (
          dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              apiBaseUrl={API_BASE_URL}
              onAddToOrder={onAddToOrder}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-3 text-center">
            No hay platillos disponibles en esta categoría.
          </p>
        )}
      </div>
    </main>
  );
}

export default MainContent;