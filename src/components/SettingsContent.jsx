import { useState, useEffect } from "react";
import DishEditCard from "./DishEditCard";
import { useUserType } from "../context/UserTypeContext"; // Importa el contexto
import CategoryModal from "./CategoryModal";
import AddDishModal from "./AddDishModal"; // Asegúrate de importar el componente
import EditDishModal from "./EditDishModal"; // Importa la nueva modal

function SettingsContent() {
    const { userType, setUserType, numeroMesa, setNumeroMesa } = useUserType(); // Usa el contexto
    const [selectedMenu, setSelectedMenu] = useState("Products Management");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showAddDishModal, setShowAddDishModal] = useState(false); // Estado para controlar la modal de agregar platillo
    const [selectedDish, setSelectedDish] = useState(null);
    const [showEditDishModal, setShowEditDishModal] = useState(false);

    // Estado local para el tipo de dispositivo (sincronizado con el contexto)
    const [tipoDispositivo, setTipoDispositivo] = useState(userType || "personal");
    const [mesaLocal, setMesaLocal] = useState(numeroMesa || "0");

    const API_BASE_URL = "http://localhost:3000";

    // Sincroniza el estado local con el contexto al cargar
    useEffect(() => {
        setTipoDispositivo(userType);
        if (userType === "cliente") {
            setMesaLocal(numeroMesa || "1");
        } else {
            setMesaLocal("0");
        }
    }, [userType, numeroMesa]);

    // Fetch categories
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/categorias`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener categorías");
                return res.json();
            })
            .then((data) => {
                setCategories(data);
                setSelectedCategory(data[0]?.id || null);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Fetch dishes for selected category
    useEffect(() => {
        if (!selectedCategory) return;
        setLoading(true);
        setError(null);
        fetch(`${API_BASE_URL}/api/platillos/categoria/${selectedCategory}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener platillos");
                return res.json();
            })
            .then((data) => {
                const dishesWithDefaultPrice = data.map((dish) => ({
                    ...dish,
                    precio: parseFloat(dish.precio) || 0,
                }));
                setDishes(data.mensaje ? [] : dishesWithDefaultPrice);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [selectedCategory]);

    // Guardar cambios de tipo de usuario y número de mesa en el contexto
    const handleGuardarDispositivo = () => {
        setUserType(tipoDispositivo);
        if (tipoDispositivo === "cliente") {
            setNumeroMesa(mesaLocal);
        } else {
            setNumeroMesa("0");
            setMesaLocal("0");
        }
    };

    // Guardar categorías (puedes hacer un fetch aquí para actualizar en el backend)
    const handleSaveCategories = (newCategories) => {
        setCategories(newCategories);
        // Aquí puedes hacer un fetch para guardar en el backend si lo deseas
    };

    const handleSave = async () => {
        if (!nombre.trim() || !precio || !categoryId || !imagen) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);

        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", parseFloat(precio));
        formData.append("descripcion", descripcion);
        formData.append("categoriaId", categoryId);
        formData.append("imagen", imagen);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: formData, // Enviar el FormData
            });

            if (!res.ok) {
                throw new Error("Error al guardar el platillo");
            }

            const nuevo = await res.json();
            onDishCreated(nuevo);
            setNombre("");
            setPrecio("");
            setDescripcion("");
            setImagen(null);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar el platillo.");
        } finally {
            setLoading(false);
        }
    };

    const handleDishUpdated = (updatedDish) => {
        setDishes((prevDishes) =>
            prevDishes.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))
        );
    };

    const handleDishDeleted = (deletedDishId) => {
        setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== deletedDishId));
    };

    return (
        <div className="flex h-full text-white rounded-xl justify-center pt-5 pb-5 pl-6">
            {/* Sidebar */}
            <div className="w-64 bg-azulCarbon rounded-2xl p-6 flex flex-col  mr-4">
                <h2 className="text-2xl font-bold mb-8">Configuración</h2>
                <div>
                    {/* Solo muestra Gestión de productos si es personal */}
                    {userType === "personal" && (
                        <button
                            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                                selectedMenu === "Products Management"
                                    ? "bg-grisAcero text-red-500"
                                    : "text-gray-300 hover:bg-grisAcero"
                            }`}
                            onClick={() => setSelectedMenu("Products Management")}
                        >
                            <div className="font-semibold">Gestión de productos</div>
                            <div className="text-xs text-gray-400">
                                Administra tus productos, precios, etc.
                            </div>
                        </button>
                    )}
                    <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            selectedMenu === "Device"
                                ? "bg-grisAcero text-red-500"
                                : "text-gray-300 hover:bg-grisAcero"
                        }`}
                        onClick={() => setSelectedMenu("Device")}
                    >
                        <div className="font-semibold">Dispositivo</div>
                        <div className="text-xs text-gray-400">
                            Configura el tipo de dispositivo y número de mesa.
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className=" w-3xl flex-1 p-8 bg-azulCarbon rounded-2xl">
                {selectedMenu === "Products Management" && userType === "personal" && (
                    <div>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Gestión de productos</h3>
                            <button
                                className="border border-gray-500 rounded-lg px-4 py-2 text-gray-200 hover:bg-gray-700 transition"
                                onClick={() => setShowCategoryModal(true)}
                            >
                                Gestionar categorías
                            </button>
                        </div>
                        {/* Tabs */}
                        <div className="flex gap-6 border-b border-gray-700 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`pb-2 font-semibold transition ${
                                        selectedCategory === cat.id
                                            ? "border-b-2 border-red-500 text-red-500"
                                            : "text-gray-300 hover:text-red-400"
                                    }`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.nombre}
                                </button>
                            ))}
                        </div>
                        {/* Dishes Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-8 overflow-y-auto h-[400px] gap-y-7 scrollbar rounded-lg p-8">
                            {/* Add new dish card */}
                            <div
                                className="flex flex-col items-center justify-center border-2 border-dashed border-red-500 rounded-lg h-[250px] cursor-pointer hover:bg-[#282830] transition col-span-1 w-full max-w-xs"
                                onClick={() => setShowAddDishModal(true)} // Abre la modal
                            >
                                <span className="text-4xl text-red-500 mb-2">+</span>
                                <span className="text-red-500 font-semibold">
                                    Agregar nuevo platillo
                                </span>
                            </div>
                            {/* Dish cards */}
                            {loading ? (
                                <p className="text-white col-span-3 text-center">
                                    Cargando...
                                </p>
                            ) : dishes.length > 0 ? (
                                dishes.map((dish) => (
                                    <div
                                        key={dish.id}
                                        className="card cursor-pointer"
                                        onClick={() => {
                                            setSelectedDish(dish);
                                            setShowEditDishModal(true);
                                        }}
                                    >
                                        <DishEditCard
                                            dish={dish}
                                            apiBaseUrl={API_BASE_URL}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 col-span-3 text-center">
                                    No hay platillos en esta categoría.
                                </p>
                            )}
                        </div>
                        <CategoryModal
                            isOpen={showCategoryModal}
                            onClose={() => setShowCategoryModal(false)}
                            categories={categories}
                            onSave={handleSaveCategories}
                        />
                        <AddDishModal
                            isOpen={showAddDishModal}
                            onClose={() => setShowAddDishModal(false)}
                            categoryId={selectedCategory} // Aquí se pasa el ID de la categoría seleccionada
                            onDishCreated={(nuevoPlatillo) => setDishes([...dishes, nuevoPlatillo])}
                        />
                        <EditDishModal
                            isOpen={showEditDishModal}
                            onClose={() => setShowEditDishModal(false)}
                            dish={selectedDish}
                            onDishUpdated={handleDishUpdated}
                            onDishDeleted={handleDishDeleted}
                        />
                    </div>
                )}
                {selectedMenu === "Device" && (
                    <div>
                        <h3 className="text-xl font-bold mb-4">Configuración de dispositivo</h3>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-300 font-semibold">
                                Tipo de dispositivo
                            </label>
                            <select
                                className="w-full p-2 rounded bg-grisAcero text-white border border-gray-600"
                                value={tipoDispositivo}
                                onChange={(e) => {
                                    setTipoDispositivo(e.target.value);
                                    if (e.target.value !== "cliente") {
                                        setMesaLocal("0");
                                    }
                                }}
                            >
                                <option value="personal">Personal</option>
                                <option value="cocina">Cocina</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>
                        {/* Solo muestra número de mesa si es cliente */}
                        {tipoDispositivo === "cliente" && (
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-300 font-semibold">
                                    Número de mesa
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 rounded bg-grisAcero text-white border border-gray-600"
                                    value={mesaLocal}
                                    onChange={(e) => setMesaLocal(e.target.value)}
                                    min="1"
                                />
                            </div>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition"
                            onClick={handleGuardarDispositivo}
                        >
                            Guardar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SettingsContent;