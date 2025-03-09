const { matchedData } = require('express-validator');
const handleHttpError = require('../utils/handleHttpError');
const authService = require('../services/authService');

exports.registrarUsuario = async (req, res) => {
    try {
        const body = matchedData(req);
        const newUsuario = await authService.registrarUsuario(body);
        res.status(201).json({ message: `Usuario creado con el rol de ${body.Rol}`, usuario: newUsuario });
    } catch (error) {
        handleHttpError(res, 'Error al registrar el usuario', 500, error);
    }
};

exports.loginUsuario = async (req, res) => {
    try {
        const body = matchedData(req);
        const { token, usuario } = await authService.loginUsuario(body);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hora
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario});
    } catch (error) {
        handleHttpError(res, 'Error al iniciar sesión', 500, error);
    }
};

exports.logoutUsuario = (req, res) => {
    res.clearCookie('jwt'); // Elimina la cookie llamada 'jwt'
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};