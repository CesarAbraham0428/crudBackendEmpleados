const empleadoRepository = require('../repositories/empleadoRepository');

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
    try{

        const infoEmpleado = await empleadoRepository.obtenerInfoPersonal(userId);

        return infoEmpleado;
    }catch(error){
        throw error;
    }
}

exports.actualizarInfoPersonal = async (userId, empleadoData, referenciaId) => {
    try {
        

        const empleadoActualizado = await Empleado.findOneAndUpdate(
            { _id: userId },
            { $set: updateQuery },
            { new: true, runValidators: true },
            { arrayFilters: [{ "elem._id": referenciaId }] } // Filtra por _id dentro del array
        );

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la información del empleado");
        }

        return empleadoActualizado;
    } catch (error) {
        throw error;
    }
};


exports.actualizar = async (claveEmpleado, empleadoData) => {
    try {

        const empleadoActualizado = await Empleado.findOneAndUpdate(
            { ClaveEmpleado: claveEmpleado },
            { $set: empleadoData },
            { new: true, runValidators: true }
        )

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar al empleado");
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