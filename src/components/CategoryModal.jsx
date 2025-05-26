import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal"; // Importa la nueva modal

const API_URL = "http://localhost:3000/api/categorias";

function CategoryModal({ isOpen, onClose, categories, onSave }) {
    const [localCategories, setLocalCategories] = useState(categories);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    React.useEffect(() => {
        setLocalCategories(categories);
    }, [categories]);

    // Crear o editar categoría
    const handleNameChange = async (idx, value) => {
        const updated = [...localCategories];
        updated[idx].nombre = value;
        setLocalCategories(updated);

        // Si la categoría ya existe (tiene id del backend), actualiza
        if (updated[idx].id && value.trim() !== "") {
            setLoading(true);
            await fetch(`${API_URL}/${updated[idx].id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: value }),
            });
            setLoading(false);
        }
    };

    // Eliminar categoría (solo se ejecuta tras confirmar)
    const handleDeleteConfirmed = async () => {
        if (categoryToDelete?.id) {
            setLoading(true);
            await fetch(`${API_URL}/${categoryToDelete.id}`, { method: "DELETE" });
            setLoading(false);
            setLocalCategories(localCategories.filter(cat => cat.id !== categoryToDelete.id));
        }
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    // Guardar cambios (opcional, puedes recargar categorías aquí)
    const handleSave = () => {
        onSave(localCategories);
        onClose();
    };

    // Cuando se crea una nueva categoría desde el modal secundario
    const handleCategoryCreated = (nueva) => {
        // Evita duplicados por id
        if (!localCategories.some(cat => cat.id === nueva.id)) {
            setLocalCategories([...localCategories, nueva]);
        }
    };

    // Actualiza la categoría en el array local después de editar
    const handleCategoryUpdated = (updatedCat) => {
        setLocalCategories(localCategories.map(cat =>
            cat.id === updatedCat.id ? updatedCat : cat
        ));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
            <div className="bg-azulCarbon p-8 rounded-lg w-96 max-h-[32rem] flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-white">Editar categorías</h2>
                <div className="space-y-3 mb-4 overflow-y-auto flex-1 scrollbar">
                    {localCategories.map((cat, idx) => (
                        <div key={cat.id || idx} className="flex gap-2 items-center">
                            <span className="p-2 rounded bg-grisAcero text-white border border-gray-600 w-50 block truncate">
                                {cat.nombre}
                            </span>
                            <button
                                className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                                onClick={() => {
                                    setCategoryToEdit(cat);
                                    setShowEditModal(true);
                                }}
                                disabled={loading}
                            >
                                Editar
                            </button>
                            <button
                                className="text-red-500 font-bold px-2 flex items-center justify-center"
                                onClick={() => {
                                    setCategoryToDelete(cat);
                                    setShowDeleteModal(true);
                                }}
                                title="Eliminar"
                                disabled={loading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-gray-700 text-white px-3 py-1 rounded mr-2"
                    onClick={() => setShowAddModal(true)}
                    disabled={loading}
                >
                    + Agregar categoría
                </button>
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Salir
                    </button>
                    
                </div>
                <AddCategoryModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onCategoryCreated={handleCategoryCreated}
                />
                <EditCategoryModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    category={categoryToEdit}
                    onCategoryUpdated={handleCategoryUpdated}
                />
                <DeleteCategoryModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirmed}
                    category={categoryToDelete}
                />
            </div>
        </div>
    );
}

export default CategoryModal;