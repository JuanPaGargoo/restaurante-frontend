import React, { useState } from "react";

const API_URL = "http://localhost:3000/api/categorias";

function EditCategoryModal({ isOpen, onClose, category, onCategoryUpdated }) {
    const [nombre, setNombre] = useState(category?.nombre || "");
    const [descripcion, setDescripcion] = useState(category?.descripcion || "");
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setNombre(category?.nombre || "");
        setDescripcion(category?.descripcion || "");
    }, [category]);

    const handleSave = async () => {
        if (!nombre.trim()) return;
        setLoading(true);
        const res = await fetch(`${API_URL}/${category.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion }),
        });
        const updated = await res.json();
        setLoading(false);
        onCategoryUpdated(updated);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
            <div className="bg-azulCarbon p-6 rounded-lg w-80 flex flex-col">
                <h2 className="text-lg font-bold mb-4 text-white">Editar categoría</h2>
                <input
                    className="p-2 rounded bg-grisAcero text-white border border-gray-600 mb-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    disabled={loading}
                />
               
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
                        disabled={loading || !nombre.trim()}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCategoryModal;