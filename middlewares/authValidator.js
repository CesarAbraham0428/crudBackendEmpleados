const {body, validationResult} = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const registroValidator = [
    body('ClaveEmpleado').exists().notEmpty().trim().withMessage('Clave Requerida'),
    body('RFC').exists().notEmpty().trim().withMessage('Rol Requerido'),
    body('Nombre').exists().notEmpty().trim().withMessage('Nombre Requerido'),
    body('ApP').exists().notEmpty().trim().withMessage('ApP Requerido'),
    body('ApM').exists().notEmpty().trim().withMessage('ApM Requerido'),
    body('Password').exists().notEmpty().trim().withMessage('Password Requerido'),
    body('Rol').exists().notEmpty().trim().withMessage('Rol Requerido'),

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