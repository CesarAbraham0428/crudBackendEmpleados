const { body, validationResult } = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const actualizarEmpleadoValidator = [
    body('CorreoElectronico').optional().isEmail().withMessage('Correo inválido'),

    body('Telefono').optional().trim(),

    body('Domicilio.Calle').optional().trim(),

    body('Domicilio.NumeroExterior').optional().trim(),

    body('Domicilio.NumeroInterior').optional().trim(),

    body('Domicilio.Colonia').optional().trim(),

    body('Domicilio.CodigoPostal').optional().trim(),

    body('Domicilio.Ciudad').optional().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleHttpError(res, "Error de validación", 400, errors.array());
        }
        next();
    }
];

module.exports = { actualizarEmpleadoValidator };