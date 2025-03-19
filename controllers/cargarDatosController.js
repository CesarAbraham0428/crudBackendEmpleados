const cargarDatosService = require ('../services/cargaDatosService');
const handleHttpError = require('../utils/handleHttpError');

exports.getDepartamento = async (req, res) => {
    try {
        const departamentos = await cargarDatosService.getDepartamento();
        res.status(200).json({departamentos})
    } catch (error) {
        handleHttpError(res, 'No se encontraron departamentos registrados', 404, error)
    }
}


exports.getPuesto = async (req, res) => {
    try {
        const puestos = await cargarDatosService.getPuesto();
        res.status(200).json({puestos})
    } catch (error) {
        handleHttpError(res, 'No se encontraron puestos registrados', 404, error)
    }
}


exports.getCiudad = async (req, res) => {
    try {
        const ciudades = await cargarDatosService.getCiudad();
        res.status(200).json({ciudades})
    } catch (error) {
        handleHttpError(res, 'No se encontraron ciudades registradas', 404, error)
    }
}

exports.getParentesco = async (req, res) => {
    try {
        const parentesco = await cargarDatosService.getParentesco();
        res.status(200).json({parentesco})
    } catch (error) {
        handleHttpError(res, 'No se encontraron parentescos registrados', 404, error)
    }
}


exports.getActividad = async (req, res) => {
    try {
        const actividades = await cargarDatosService.getActividad();
        res.status(200).json({actividades})
    } catch (error) {
        handleHttpError(res, 'No se encontraron parentescos registrados', 404, error)
    }
}


exports.getTipoDocumento = async (req, res) => {
    try {
        const tipodocumento = await cargarDatosService.getTipoDocumento();
        res.status(200).json({tipodocumento})
    } catch (error) {
        handleHttpError(res, 'No se encontraron tipos de documentos registrados', 404, error)
    }
}

exports.getCurso = async (req, res) => {
    try {
        const nombrecurso = await cargarDatosService.getCurso();
        res.status(200).json({nombrecurso})
    } catch (error) {
        handleHttpError(res, 'No se encontraron tipos de documentos registrados', 404, error)
    }
}