const { body, validationResult } = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const actualizarInfoPersonalEmpleadoValidator = [
    body('CorreoElectronico').optional().isEmail().withMessage('Correo inválido'),
    body('Telefono').optional().trim(),
    body('Domicilio.Calle').optional().trim(),
    body('Domicilio.NumeroExterior').optional().trim(),
    body('Domicilio.NumeroInterior').optional().trim(),
    body('Domicilio.Colonia').optional().trim(),
    body('Domicilio.CodigoPostal').optional().trim(),
    body('Domicilio.Ciudad').optional().trim(),
  
    // Para validar arrays de objetos dentro de "ReferenciaFamiliar"
    body('ReferenciaFamiliar.*.NombreFamiliar').optional().trim(),
    body('ReferenciaFamiliar.*.Parentesco').optional().trim(),
    body('ReferenciaFamiliar.*.Telefono').optional().trim(),
    body('ReferenciaFamiliar.*.CorreoElectronico').optional().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleHttpError(res, "Error de validación", 400, errors.array());
        }
        next();
    }
];

const actualizarEmpleadoValidator = [
    body('Nombre').optional().isEmail().withMessage('Correo inválido'),
    body('ApP').optional().isEmail().withMessage('Correo inválido'),
    body('ApM').optional().isEmail().withMessage('Correo inválido'),
    body('FechaNacimiento').optional().isEmail().withMessage('Correo inválido'),
    body('RFC').optional().isEmail().withMessage('Correo inválido'),
    body('Sexo').optional().isEmail().withMessage('Correo inválido'),
    body('Departamento').optional().isEmail().withMessage('Correo inválido'),
    body('Puesto').optional().isEmail().withMessage('Correo inválido'),
    body('Telefono').optional().isEmail().withMessage('Correo inválido'),
    body('CorreoElectronico').optional().isEmail().withMessage('Correo inválido'),
    body('Rol').optional().isEmail().withMessage('Correo inválido'),
    body('Domicilio.Calle').optional().trim(),
    body('Domicilio.NumeroExterior').optional().trim(),
    body('Domicilio.NumeroInterior').optional().trim(),
    body('Domicilio.Colonia').optional().trim(),
    body('Domicilio.CodigoPostal').optional().trim(),
    body('Domicilio.Ciudad').optional().trim(),
    body('ReferenciaFamiliar.NombreFamiliar').optional().trim(),
    body('ReferenciaFamiliar.Parentesco').optional().trim(),
    body('ReferenciaFamiliar.Telefono').optional().trim(),
    body('ReferenciaFamiliar.CorreoElectronico').optional().trim(),
]

module.exports = {
    actualizarInfoPersonalEmpleadoValidator,
    actualizarEmpleadoValidator
};