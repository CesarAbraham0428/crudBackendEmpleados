const empleadoRepository = require('../repositories/empleadoRepository');

exports.agregar = async (userId, referenciaData) => {
    try {
        const empleadoActualizado = await empleadoRepository.agregarReferenciaFamiliar(userId, referenciaData);
        
        if (!empleadoActualizado) {
            throw new Error("No se pudo agregar la referencia familiar");
        }

        const nuevaReferencia = empleadoActualizado.ReferenciaFamiliar[empleadoActualizado.ReferenciaFamiliar.length - 1];

        return nuevaReferencia;
    } catch (error) {
        throw error;
    }
};

exports.actualizar = async (userId, referenciaId, referenciaData) => {
    try {
        const empleadoActualizado = await empleadoRepository.actualizarReferenciaFamiliar(userId, referenciaId, referenciaData);

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la referencia familiar");
        }

        const referenciaActualizada = empleadoActualizado.ReferenciaFamiliar.find(
            ref => ref._id.toString() === referenciaId
        );

        return referenciaActualizada;
    } catch (error) {
        throw error;
    }
};

exports.eliminar = async (userId, referenciaId) => {
    try {
        const empleadoActualizado = await empleadoRepository.eliminarReferenciaFamiliar(userId, referenciaId);

        if (!empleadoActualizado) {
            throw new Error("No se pudo eliminar la referencia familiar");
        }

        return { message: "Referencia familiar eliminada con éxito" };
    } catch (error) {
        throw error;
    }
};