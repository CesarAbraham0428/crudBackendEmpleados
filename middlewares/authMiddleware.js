const { verify } = require('../utils/handleJwt');

const autorizar = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Lee el token de la cookie

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const dataToken = verify(token);
        if (!dataToken || !dataToken._id) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        req.user = dataToken;
        next();
    } catch (error) {
        res.status(500).json({ message: `Error en la autenticación: ${error.message}` });
    }
};

module.exports = autorizar;