const empleadoRepository = require('../repositories/empleadoRepository');

exports.obtenerActividadesEmpresaEmpleado = async (userId)=>{
    try{
        const actividadesEmpleado = await empleadoRepository.obtenerActividadesEmpresa(userId);
        return actividadesEmpleado;
    }catch(error){
        throw error;
    }
};

exports.agregar = async (userId, referenciaData) => {
    try {

        const empleadoActualizado = await empleadoRepository.agregarReferenciaFamiliar(userId, referenciaData);
        
        if (!empleadoActualizado) {
            throw new Error("No se pudo agregar la referencia familiar");
        }

        // Devolver la referencia agregada (la última del array)
        const nuevaReferencia = empleadoActualizado.ReferenciaFamiliar[empleadoActualizado.ReferenciaFamiliar.length - 1];

        return nuevaReferencia;
    } catch (error) {
        throw error;
    }
};

exports.actualizar = async (userId, referenciaId, referenciaData) => {
    try {
        // Validar que exista la referencia
        const referencias = await this.obtenerTodos(userId);
        const referenciaExiste = referencias[0]?.ReferenciaFamiliar.some(
            ref => ref._id.toString() === referenciaId
        );
        
        if (!referenciaExiste) {
            throw new Error("Referencia familiar no encontrada");
        }

        // Actualizar la referencia
        const empleadoActualizado = await empleadoRepository.actualizarReferenciaFamiliar(
            userId, referenciaId, referenciaData
        );

        // Encontrar la referencia actualizada
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
        // Validar que exista la referencia
        const referencias = await this.obtenerTodos(userId);
        const referenciaExiste = referencias[0]?.ReferenciaFamiliar.some(
            ref => ref._id.toString() === referenciaId
        );
        
        if (!referenciaExiste) {
            throw new Error("Referencia familiar no encontrada");
        }

        // Eliminar la referencia
        const empleadoActualizado = await empleadoRepository.eliminarReferenciaFamiliar(
            userId, referenciaId
        );

        return { success: true, message: "Referencia familiar eliminada con éxito" };
    } catch (error) {
        throw error;
    }
};