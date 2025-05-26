import React, { useState } from "react";
import DishEditCard from "./DishEditCard"; // Agrega este import si lo necesitas

const API_URL = "http://localhost:3000/api/platillos";

function AddDishModal({ isOpen, onClose, categoryId, onDishCreated }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

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
        formData.append("categoria_id", categoryId); // Cambiar a "categoria_id"
        formData.append("imagen", imagen);

        // Log del contenido del FormData
        console.log("Contenido del FormData:");
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

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
            setPreview(null);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar el platillo.");
        } finally {
            setLoading(false);
        }
    };

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-azulCarbon p-6 rounded-lg w-96 flex flex-col">
                <h2 className="text-lg font-bold mb-4 text-white">Agregar platillo</h2>
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
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={loading}
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mb-2 text-center transition"
                >
                    {imagen ? "Cambiar imagen" : "Cargar imagen"}
                </label>
                {preview && (
                    <img
                        src={preview}
                        alt="Previsualización"
                        className="mb-4 rounded-lg object-cover w-full h-40 border border-gray-600"
                    />
                )}
                <div className="flex justify-center gap-2">
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
                        disabled={loading || !nombre.trim() || !precio || !imagen}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDishModal;