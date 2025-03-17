const empleadoRepository = require('../repositories/empleadoRepository');

exports.agregar = async (userId, referenciaData) => {
    try {
        // Validar que tenga al menos un teléfono
        if (!referenciaData.Telefono || !Array.isArray(referenciaData.Telefono) || referenciaData.Telefono.length === 0) {
            throw new Error("Se requiere al menos un número de teléfono");
        }

        // Validar que tenga correo electrónico
        if (!referenciaData.CorreoElectronico) {
            throw new Error("Se requiere un correo electrónico");
        }

        const empleadoActualizado = await empleadoRepository.agregarReferenciaFamiliar(userId, referenciaData);

        if (!empleadoActualizado) {
            throw new Error("No se pudo agregar la referencia familiar");
        }

        // Obtener la referencia recién agregada (la última del array)
        const nuevaReferencia = empleadoActualizado.ReferenciaFamiliar[empleadoActualizado.ReferenciaFamiliar.length - 1];

        return nuevaReferencia;
    } catch (error) {
        throw error;
    }
};

exports.actualizar = async (userId, referenciaId, referenciaData) => {
    try {
        // Validaciones básicas
        if (referenciaData.Telefono && (!Array.isArray(referenciaData.Telefono) || referenciaData.Telefono.length === 0)) {
            throw new Error("Si se proporciona teléfono, debe ser un array con al menos un número");
        }

        const empleadoActualizado = await empleadoRepository.actualizarReferenciaFamiliar(userId, referenciaId, referenciaData);

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la referencia familiar");
        }

        // Buscar la referencia actualizada por su ID
        const referenciaActualizada = empleadoActualizado.ReferenciaFamiliar.find(
            ref => ref._id.toString() === referenciaId
        );

        if (!referenciaActualizada) {
            throw new Error("No se encontró la referencia familiar después de actualizar");
        }

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

exports.manejarTelefonosFamiliar = async (userId, referenciaId, operacion, telefonos) => {
    if (!telefonos || !Array.isArray(telefonos) || telefonos.length === 0) {
        throw new Error("Se requiere al menos un número de teléfono");
    }

    let empleadoActualizado;

    switch (operacion) {
        case "agregar":
            // Agregar teléfonos
            empleadoActualizado = await empleadoRepository.agregarTelefonoReferenciaFamiliar(
                userId, referenciaId, telefonos
            );
            break;

        case "eliminar":
            // Validar que no se eliminen todos los teléfonos
            const empleado = await empleadoRepository.obtenerPorId(userId);
            const referencia = empleado?.ReferenciaFamiliar?.find(ref => ref._id.toString() === referenciaId);

            if (!referencia) {
                throw new Error("No se encontró la referencia familiar");
            }

            // Verificar que no se eliminen todos los teléfonos
            const telefonosRestantes = referencia.Telefono.filter(tel => !telefonos.includes(tel));
            if (telefonosRestantes.length === 0) {
                throw new Error("No se pueden eliminar todos los teléfonos. La referencia familiar debe tener al menos un teléfono");
            }

            // Eliminar teléfonos
            empleadoActualizado = await empleadoRepository.eliminarTelefonoReferenciaFamiliar(
                userId, referenciaId, telefonos
            );
            break;

        default:
            throw new Error("Operación no válida para teléfonos. Use 'agregar' o 'eliminar'");
    }

    if (!empleadoActualizado) {
        throw new Error("No se pudo actualizar los teléfonos de la referencia familiar");
    }

    // Encontrar la referencia actualizada
    const referenciaActualizada = empleadoActualizado.ReferenciaFamiliar.find(
        ref => ref._id.toString() === referenciaId
    );

    if (!referenciaActualizada) {
        throw new Error("No se encontró la referencia familiar después de actualizar teléfonos");
    }

    return referenciaActualizada;
};