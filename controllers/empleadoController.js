const empleadoService = require('../services/empleadoService');
const handleHttpError = require('../utils/handleHttpError')

exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoService.getAllEmpleados();
        res.status(200).json({ message: `Empleados Obtenidos:`, empleados })
    } catch (error) {
        handleHttpError(res, 'No se encontraron empleados registrados', 404, error)
    }
}

exports.obtenerEmpleado = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado; // Extrae la clave desde params
        const empleado = await empleadoService.getEmpleadoPorClave({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ message: "Empleado obtenido exitosamente", empleado });
    } catch (error) {
        handleHttpError(res, 'Error al obtener el empleado especifico', 404, error);
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token
        const datosEmpleado = req.body;

        const empleadoActualizado = await empleadoService.updateEmpleado(userId, datosEmpleado);
        res.status(200).json({ message: 'Información actualizada', empleadoActualizado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar el empleado', 500, error);
    }
};

exports.eliminarEmpleado = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado;

        const empleado = await empleadoService.deleteEmpleado({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ message: `Empleado eliminado`, empleado });
    } catch (error) {
        handleHttpError(res, 'Error al eliminar el empleado', 500, error);
    }
};