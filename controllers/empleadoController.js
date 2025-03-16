const empleadoService = require('../services/empleadoService');
const handleHttpError = require('../utils/handleHttpError')

const {matchedData} = require('express-validator');

exports.obtenerTodos = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerTodos();
        res.status(200).json({ empleados })
    } catch (error) {
        handleHttpError(res, 'No se encontraron empleados registrados', 404, error)
    }
}

exports.obtenerPorClave = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado; // Extrae la clave desde params
        const empleado = await empleadoService.obtenerPorClave({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ empleado });
    } catch (error) {
        handleHttpError(res, 'Error al obtener el empleado especifico', 404, error);
    }
};

exports.actualizarInfoPersonal = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token
        const datosEmpleado = matchedData(req.body);

        const empleadoActualizado = await empleadoService.obtenerInfoPersonal(userId, datosEmpleado, referenciaId);
        res.status(200).json({empleadoActualizado});
    } catch (error) {
        handleHttpError(res, 'Error al actualizar el empleado', 500, error);
    }
};

exports.actualizar = async (req, res) => {
    try {
        const claveEmpleado = req.params;
        const body = matchedData(req.body);

        const empleadoActualizado = await empleadoService.actualizar(claveEmpleado, body);

        res.status(200).json({empleadoActualizado});
    } catch (error) {
        handleHttpError(res, '')
    }

};

exports.eliminar = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado;

        const empleado = await empleadoService.eliminar({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ message: `Empleado eliminado`, empleado });
    } catch (error) {
        handleHttpError(res, 'Error al eliminar el empleado', 500, error);
    }
};