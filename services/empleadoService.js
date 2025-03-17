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

exports.actualizarEmpleado = async (userId, body) => {
    try {
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

exports.manejarCorreos = async (userId, operacion, datos) => {
    const { correos } = datos;

    if (!correos || !Array.isArray(correos)) {
        throw new Error("Formato de correos no válido");
    }

    switch (operacion) {
        case "agregar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $addToSet: { CorreoElectronico: { $each: correos } } }
            );

        case "eliminar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $pull: { CorreoElectronico: { $in: correos } } }
            );

        default:
            throw new Error("Operación no válida para correos");
    }
};

exports.manejarTelefonos = async (userId, operacion, datos) => {
    const { telefonos } = datos;

    if (!telefonos || !Array.isArray(telefonos)) {
        throw new Error("Formato de teléfonos no válido");
    }

    switch (operacion) {
        case "agregar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $addToSet: { Telefono: { $each: telefonos } } }
            );

        case "eliminar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $pull: { Telefono: { $in: telefonos } } }
            );

        default:
            throw new Error("Operación no válida para teléfonos");
    }
};
