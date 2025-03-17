const Empleado = require('../models/empleado');

exports.getAllEmpleados = async () => {
    try {
        const empleados = await Empleado.find({ Rol: { $eq: "Empleado" } })

        if (!empleados) {
            throw new Error("No hay empleados registrados");
        }

        return empleados;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};

exports.getEmpleadoPorClave = async (empleadoData) => {
    try {
        const empleado = await Empleado.findOne({ ClaveEmpleado: empleadoData.ClaveEmpleado });

        if (!empleado) {
            throw new Error("No hay un empleado registrado con esa Clave");
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};

exports.updateEmpleado = async (userId, empleadoData) => {
    try {
        const empleadoActualizado = await Empleado.findOneAndUpdate(
            { _id: userId },  // Busca por el ID del usuario del token
            { $set: empleadoData }, // Solo actualiza los campos que se envíen
            { new: true, runValidators: true } // Retorna el nuevo documento y valida
        );

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la información del empleado");
        }

        return empleadoActualizado;
    } catch (error) {
        throw error;
    }
};

exports.deleteEmpleado = async (empleadoData) => {
    try {
        const empleado = await Empleado.findOneAndDelete({ ClaveEmpleado: empleadoData.ClaveEmpleado });

        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};