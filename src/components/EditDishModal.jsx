import React, { useState } from "react";
import DeleteDishModal from "./DeleteDishModal";

const API_URL = "http://localhost:3000/api/platillos";
const API_BASE_URL = "http://localhost:3000"; // Ajusta si tu backend cambia

function EditDishModal({ isOpen, onClose, dish, onDishUpdated, onDishDeleted }) {
    const [nombre, setNombre] = useState(dish?.nombre || "");
    const [precio, setPrecio] = useState(dish?.precio || "");
    const [descripcion, setDescripcion] = useState(dish?.descripcion || "");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    React.useEffect(() => {
        if (dish) {
            setNombre(dish.nombre);
            setPrecio(dish.precio);
            setDescripcion(dish.descripcion);
            setImagen(null);
            setPreview(null);
        }
    }, [dish]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSave = async () => {
        if (!nombre.trim() || !precio) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", parseFloat(precio));
        formData.append("descripcion", descripcion);
        formData.append("categoria_id", dish.categoria_id);
        if (imagen) formData.append("imagen", imagen);

        try {
            const res = await fetch(`${API_URL}/${dish.id}`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Error al actualizar el platillo");
            }

            const actualizado = await res.json();
            onDishUpdated(actualizado);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar el platillo.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/${dish.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el platillo");
            }

            onDishDeleted(dish.id);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar el platillo.");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-azulCarbon p-6 rounded-lg w-96 flex flex-col">
                        <h2 className="text-lg font-bold mb-4 text-white">Editar platillo</h2>
                        <input
                            className="p-2 rounded bg-grisAcero text-white border border-gray-600 mb-3"
                            placeholder="Nombre del platillo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={loading}
                        />
                        <input
                            type="number"
                            className="p-2 rounded bg-grisAcero text-white border border-gray-600 mb-3"
                            placeholder="Precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            disabled={loading}
                            min="0"
                            step="0.01"
                        />
                        <textarea
                            className="p-2 rounded bg-grisAcero text-white border border-gray-600 mb-4 resize-none"
                            placeholder="Descripción (opcional)"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            disabled={loading}
                            rows={3}
                        />
                        <input
                            id="file-upload-edit"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            disabled={loading}
                        />
                        <label
                            htmlFor="file-upload-edit"
                            className="cursor-pointer bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white px-4 py-2 rounded mb-2 text-center font-semibold shadow transition"
                        >
                            {imagen ? "Cambiar imagen" : "Cargar imagen"}
                        </label>
                        {(preview || dish?.imagen_url) && (
                            <img
                                src={preview || `${API_BASE_URL}${dish.imagen_url}`}
                                alt="Previsualización"
                                className="mb-4 rounded-lg object-cover w-full h-40 border border-gray-600"
                            />
                        )}
                        <div className="flex justify-between gap-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleSave}
                                disabled={loading || !nombre.trim() || !precio}
                            >
                                Guardar
                            </button>
                        </div>
                        <button
                            className="bg-red-700 text-white px-4 py-2 rounded mt-4"
                            onClick={() => setShowDeleteModal(true)}
                            disabled={loading}
                        >
                            Eliminar platillo
                        </button>
                    </div>
                </div>
            )}
            <DeleteDishModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                dish={dish}
            />
        </>
    );
}

export default EditDishModal;