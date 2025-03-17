const empleadoService = require('../services/empleadoService');
const referenciaFamiliarService = require('../services/referenciaFamiliarService');

const handleHttpError = require('../utils/handleHttpError');

const { matchedData } = require('express-validator');

exports.obtenerTodos = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerTodos();
        res.status(200).json({ empleados })
    } catch (error) {
        handleHttpError(res, 'No se encontraron empleados registrados', 404, error)
    }
};

exports.obtenerPorClave = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado; // Extrae la clave desde params
        const empleado = await empleadoService.obtenerPorClave({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ empleado });
    } catch (error) {
        handleHttpError(res, 'Error al obtener el empleado especifico', 404, error);
    }
};

// Información Basica del Empleado

exports.obtenerInfoPersonal = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token

        const infoPersonalEmpleado = await empleadoService.obtenerInfoPersonal(userId);
        res.status(200).json({ infoPersonalEmpleado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar el empleado', 500, error);
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token
        const empleadoData = req.body;

        const empleadoActualizado = await empleadoService.actualizarEmpleado(userId, empleadoData);
        res.status(200).json({ empleadoActualizado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar la información Personal del Empleado', 500, error);
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

// Correos y Telefonos del Empleado

exports.actualizarContactos = async (req, res) => {
    try {
        const userId = req.user._id;
        const { operaciones } = req.body;

        if (!operaciones || !Array.isArray(operaciones)) {
            throw new Error("Formato de operaciones no válido");
        }

        const resultados = [];
        for (const opera of operaciones) {
            const { tipo, operacion, datos } = opera;

            let resultado;
            if (tipo === "correo") {
                resultado = await empleadoService.manejarCorreos(userId, operacion, datos);
            } else if (tipo === "telefono") {
                resultado = await empleadoService.manejarTelefonos(userId, operacion, datos);
            } else {
                throw new Error("Tipo de contacto no válido");
            }

            resultados.push(resultado);
        }

        res.status(200).json({ mensaje: "Operaciones realizadas correctamente", resultados });
    } catch (error) {
        handleHttpError(res, 'Error al realizar las operaciones', 500, error);
    }
};

// Información de Referencia Familiar del empleado

exports.agregarReferenciaFamiliar = async (req, res) => {
    try {
        const empleadoData = req.body;
        const referenciaActualizada = await referenciaFamiliarService.agregar(empleadoData);

        res.status(200).json({message: `Referencia Agregada`, referenciaActualizada});
    } catch (error) {
        handleHttpError(res, 'Error al agregar Referencia Familiar',500, error);
    }
};

exports.actualizarReferenciaFamiliar = async () => {
    try {

    } catch (error) {
        handleHttpError(res, 'Error al actualizar Referencia Familiar',500, error);
    }
};

exports.eliminarReferenciaFamiliar = async () => {

};

// Información de CursosExternos del empleado

exports.agregarCursoExterno = async () => {

};

exports.actualizarCursoExterno = async () => {

};

exports.eliminarCursoExterno = async () => {

};

// Información de ActividadesEmpresa del empleado

exports.obtenerActividadesEmpresa = async (req, res)=>{
    //const actividadesEmpresa = await empleadoService.
};

exports.agregarActividadEmpresa = async () => {

};

exports.actualizarActividadEmpresa = async () => {

};

exports.eliminarActividadEmpresa = async () => {

};