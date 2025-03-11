const {body, validationResult} = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const registroValidator = [
    body('ClaveEmpleado').exists().notEmpty().trim().withMessage('Clave Requerida'),
    body('RFC').exists().notEmpty().trim().withMessage('Rol Requerido'),
    body('Nombre').exists().notEmpty().trim().withMessage('Nombre Requerido'),
    body('ApP').exists().notEmpty().trim().withMessage('ApP Requerido'),
    body('ApM').exists().notEmpty().trim().withMessage('ApM Requerido'),
    body('FechaNacimiento').exists().notEmpty().trim().withMessage('FechaNacimiento Requerido'),
    body('CorreoElectronico').exists().notEmpty().isEmail().trim().withMessage('Correo Requerido'),
    body('Password').exists().notEmpty().trim().withMessage('Password Requerido'),
    body('Rol').exists().notEmpty().trim().withMessage('Rol Requerido'),
    body('Sexo').exists().notEmpty().trim().withMessage('Sexo Requerido'),
    body('Departamento').exists().notEmpty().trim().withMessage('Departamento Requerido'),
    body('Puesto').exists().notEmpty().trim().withMessage('Puesto Requerido'),
    body('Telefono').exists().notEmpty().trim().withMessage('Telefono Requerido'),
    body('Domicilio.Calle').exists().notEmpty().trim().withMessage('Calle Requerido'),
    body('Domicilio.NumeroExterior').exists().notEmpty().trim().withMessage('NumeroExterior Requerido'),
    body('Domicilio.NumeroInterior').exists().optional({ nullable: true }).trim().withMessage('NumeroInterior Requerido'),
    body('Domicilio.Colonia').exists().notEmpty().trim().withMessage('Colonia Requerido'),
    body('Domicilio.CodigoPostal').exists().notEmpty().trim().withMessage('CodigoPostal Requerido'),
    body('Domicilio.Ciudad').exists().notEmpty().trim().withMessage('Ciudad Requerido'),
    body('CursoExterno.Nombre').exists().notEmpty().trim().withMessage('Nombre Requerido'),
    body('CursoExterno.TipoCurso').exists().notEmpty().trim().withMessage('TipoCurso Requerido'),
    body('CursoExterno.FechaInicio').exists().notEmpty().trim().withMessage('FechaInicio Requerido'),
    body('CursoExterno.FechaFin').exists().notEmpty().trim().withMessage('FechaFin Requerido'),
    body('ActividadEmpresa.NombreActividad').exists().notEmpty().trim().withMessage('NombreActividad Requerido'),
    body('ActividadEmpresa.Estatus').exists().notEmpty().trim().withMessage('Estatus Requerido'),
    body('ReferenciaFamiliar.NombreFamiliar').exists().notEmpty().trim().withMessage('NombreFamiliar Requerido'),
    body('ReferenciaFamiliar.Parentesco').exists().notEmpty().trim().withMessage('Parentesco Requerido'),
    body('ReferenciaFamiliar.Telefono').exists().notEmpty().trim().withMessage('Telefono Requerido'),
    body('ReferenciaFamiliar.CorreoElectronico').exists().notEmpty().trim().withMessage('CorreoElectronico Requerido'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleHttpError(res, "Error de validación", 400, errors.array());
        }
        next();
    }
];

const loginValidator = [
    body('CorreoElectronico').exists().notEmpty().isEmail().trim().withMessage('Correo requerido'),
    body('Password').exists().notEmpty().trim().withMessage('Password requerido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleHttpError(res, "Error de validación", 400, errors.array());
        }
        next();
    }
];

module.exports = {registroValidator, loginValidator}