const empleadoRepository = require('../repositories/empleadoRepository');

const referenciaFamiliarService = require('./referenciaFamiliarService');

exports.obtenerTodos = async () => {
    try {
        const empleados = await empleadoRepository.obtenerTodos();

        if (!empleados) {
            throw new Error("No hay empleados registrados");
        }

        return empleados;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};

exports.obtenerPorClave = async (empleadoData) => {
    try {
        const empleado = await empleadoRepository.obtenerPorClave(empleadoData);

        if (!empleado) {
            throw new Error("No hay un empleado registrado con esa Clave");
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};

exports.obtenerInfoPersonal = async (userId) => {
    try {

        const infoEmpleado = await empleadoRepository.obtenerInfoPersonal(userId);

        return infoEmpleado;
    } catch (error) {
        throw error;
    }
};

exports.actualizarEmpleado = async (userId) => {
    try {
        const body = req.body;
        const empleadoActualizado = await empleadoRepository.actualizarEmpleadoCompleto(userId, body)

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la información del empleado");
        }

        return empleadoActualizado;
    } catch (error) {
        throw error;
    }
};

exports.eliminar = async (empleadoData) => {
    try {
        const empleado = await empleadoRepository.eliminarPorClave(empleadoData.ClaveEmpleado);

        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};

// Operaciones con Arrays

exports.agregarCorreo = async (userId, correo) => {
    // Validación de formato de correo aquí
    const updateOperation = { $addToSet: { CorreoElectronico: correo } };
    return await empleadoRepository.actualizarEmpleadoCompleto(userId, updateOperation);
};

exports.actualizarCorreo = async (userId, correoAntiguo, correoNuevo) => {
    try {
        // Verificamos que el correo antiguo exista
        const empleado = await empleadoRepository.obtenerPorId(userId);
        if (!empleado.CorreoElectronico.includes(correoAntiguo)) {
            throw new Error("El correo que intenta actualizar no existe");
        }
        
        // Verificamos que el correo nuevo no exista ya
        if (empleado.CorreoElectronico.includes(correoNuevo)) {
            throw new Error("El nuevo correo ya existe en su lista");
        }
        
        // Realizamos la actualización en una sola operación atómica
        return await empleadoRepository.actualizarEmpleadoCompleto(
            userId,
            { 
                $pull: { CorreoElectronico: correoAntiguo },
                $push: { CorreoElectronico: correoNuevo }
            }
        );
    } catch (error) {
        throw error;
    }
};

exports.eliminarCorreo = async (userId, correo) => {
    const updateOperation = { $pull: { CorreoElectronico: correo } };
    return await empleadoRepository.actualizarEmpleadoCompleto(userId, updateOperation);
};

exports.actualizarTelefono = async (userId, telefonoAntiguo, telefonoNuevo) => {
    try {
        // Convertir a string para asegurar formato consistente
        telefonoAntiguo = String(telefonoAntiguo);
        telefonoNuevo = String(telefonoNuevo);
        
        // Verificamos que el teléfono antiguo exista
        const empleado = await empleadoRepository.obtenerPorId(userId);
        if (!empleado.Telefono.includes(telefonoAntiguo)) {
            throw new Error("El teléfono que intenta actualizar no existe");
        }
        
        // Verificamos que el teléfono nuevo no exista ya
        if (empleado.Telefono.includes(telefonoNuevo)) {
            throw new Error("El nuevo teléfono ya existe en su lista");
        }
        
        // Realizamos la actualización en una sola operación atómica
        return await empleadoRepository.actualizarEmpleadoCompleto(
            userId,
            { 
                $pull: { Telefono: telefonoAntiguo },
                $push: { Telefono: telefonoNuevo }
            }
        );
    } catch (error) {
        throw error;
    }
};

exports.agregarTelefono = async (userId, correo) => {
    // Validación de formato de correo aquí
    const updateOperation = { $addToSet: { CorreoElectronico: correo } };
    return await empleadoRepository.actualizarEmpleadoCompleto(userId, updateOperation);
};

exports.eliminarTelefono = async (userId, correo) => {
    const updateOperation = { $pull: { CorreoElectronico: correo } };
    return await empleadoRepository.actualizarEmpleadoCompleto(userId, updateOperation);
};

// Operaciones con subdocumentos
exports.agregarReferenciaFamiliar = async (userId, referenciaData) => {
    try {
        return await referenciaFamiliarService.agregar(userId, referenciaData);
    } catch (error) {
        throw error;
    }
};

exports.actualizarReferenciaFamiliar = async (userId, referenciaId, referenciaData) => {
    try {
        return await referenciaFamiliarService.actualizar(userId, referenciaId, referenciaData);
    } catch (error) {
        throw error;
    }
};

exports.eliminarReferenciaFamiliar = async (userId, referenciaId) => {
    try {
        return await referenciaFamiliarService.eliminar(userId, referenciaId);
    } catch (error) {
        throw error;
    }
};