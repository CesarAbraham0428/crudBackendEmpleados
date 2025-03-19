const { body, validationResult } = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');

const registroValidator = [
    body("RFC").exists().notEmpty().trim().withMessage("RFC requerido"),
    body("Nombre").exists().notEmpty().trim().withMessage("Nombre requerido"),
    body("ApP").exists().notEmpty().trim().withMessage("Apellido paterno requerido"),
    body("ApM").optional(),
    body("FechaNacimiento").exists().notEmpty().withMessage("Fecha de nacimiento requerida"),

    // Validación para que sea un array con elementos tipo string (teléfonos)
    body("Telefono")
        .isArray({ min: 1 }).withMessage("Debe proporcionar al menos un teléfono")
        .custom((telefonos) => {
            if (!telefonos.every(tel => typeof tel === "string" && tel.trim() !== "")) {
                throw new Error("Todos los teléfonos deben ser strings válidos");
            }
            return true;
        }),

    // Validación para que sea un array con emails válidos
    body("CorreoElectronico")
        .isArray({ min: 1 }).withMessage("Debe proporcionar al menos un correo electrónico")
        .custom((correos) => {
            if (!correos.every(correo => typeof correo === "string" && correo.trim() !== "" && /\S+@\S+\.\S+/.test(correo))) {
                throw new Error("Todos los correos electrónicos deben ser válidos");
            }
            return true;
        }),

    body("Password").exists().notEmpty().trim().withMessage("Contraseña requerida"),
    body("Rol").exists().notEmpty().isIn(["Empleado", "RH"]).withMessage("Rol requerido y debe ser 'Empleado' o 'RH'"),
    body("Sexo").exists().notEmpty().isIn(["M", "F"]).withMessage("Sexo requerido y debe ser 'M' o 'F'"),
    body("Departamento").exists().notEmpty().trim().withMessage("Departamento requerido"),
    body("Puesto").exists().notEmpty().trim().withMessage("Puesto requerido"),

    // Validaciones para el domicilio
    body("Domicilio.Calle").exists().notEmpty().trim().withMessage("Calle requerida"),
    body("Domicilio.NumeroExterior").exists().notEmpty().trim().withMessage("Número exterior requerido"),
    body("Domicilio.NumeroInterior").optional(),
    body("Domicilio.Colonia").exists().notEmpty().trim().withMessage("Colonia requerida"),
    body("Domicilio.CodigoPostal").exists().notEmpty().withMessage("Código postal requerido y debe ser válido"),
    body("Domicilio.Ciudad").exists().notEmpty().trim().withMessage("Ciudad requerida"),

    // Validación para ReferenciaFamiliar
    body("ReferenciaFamiliar")
        .isArray({ min: 1 }).withMessage("Debe proporcionar al menos un familiar")
        .custom((referencias) => {
            if (!referencias.every(familiar => {
                return (
                    typeof familiar.NombreFamiliar === "string" && familiar.NombreFamiliar.trim() !== "" &&
                    typeof familiar.Parentesco === "string" && familiar.Parentesco.trim() !== "" &&
                    Array.isArray(familiar.Telefono) && familiar.Telefono.length > 0 &&
                    familiar.Telefono.every(tel => typeof tel === "string" && tel.trim() !== "") &&
                    typeof familiar.CorreoElectronico === "string" && /\S+@\S+\.\S+/.test(familiar.CorreoElectronico)
                );
            })) {
                throw new Error("Los datos de los familiares no son válidos");
            }
            return true;
        }),

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

module.exports = { registroValidator, loginValidator }