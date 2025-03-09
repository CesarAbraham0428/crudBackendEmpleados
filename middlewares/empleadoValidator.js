const {body, validationResult} = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const actualizarEmpleadoValidator = [
   
    body('CorreoElectronico').exists().notEmpty().isEmail().trim().withMessage('Correo requerido'),
    body('Telefono').exists().notEmpty().trim().withMessage('Telefono Requerido'),
    body('Ciudad').exists().notEmpty().trim().withMessage('Ciudad Requerido'),
    body('Calle').exists().notEmpty().trim().withMessage('Calle Requerido'),
    body('Numero Exterior').exists().notEmpty().trim().withMessage('No. Ext Requerido'),
    body('Numero Interior').exists().notEmpty().trim().withMessage('No. Int Requerido'),
    body('CodigoPostal').exists().notEmpty().trim().withMessage('CodigoPostal Requerido'),
    body('Colonia').exists().notEmpty().trim().withMessage('Colonia Requerido'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleHttpError(res, "Error de validación", 400, errors.array());
        }
        next();
    }
];


module.exports = {actualizarEmpleadoValidator}