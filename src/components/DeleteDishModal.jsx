import React from "react";

function DeleteDishModal({ isOpen, onClose, onConfirm, dish }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
            <div className="bg-azulCarbon p-6 rounded-lg w-96 flex flex-col items-center">
                <h2 className="text-xl font-bold text-white mb-4">¿Seguro que quieres eliminar el platillo?</h2>
                <p className="text-gray-300 mb-6 text-center">
                    El platillo <span className="font-semibold text-red-400">{dish?.nombre}</span> se eliminará <span className="font-bold text-red-500">permanentemente</span>.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                        disabled={dish?.loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                        disabled={dish?.loading}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteDishModal;