const { matchedData } = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');
const authService = require("../services/authService");

exports.registrarusuario = async (req, res) => {
  try {
    const body = matchedData(req);

    const newUsuario = await authService.registrarUsuario(body);
    res.status(201).json({ message: `Usuario Creado con el rol de ${body.Rol}`, usuario: newUsuario });

  } catch (error) {
    handleHttpError(res, 'Error al registrar el usuario', 500, error);
  }
};
