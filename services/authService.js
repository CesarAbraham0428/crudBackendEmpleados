const Empleado = require('../models/empleado');
const { sign } = require('../utils/handleJwt');
const { hash, compare } = require('../utils/handlePassword');

exports.registrarUsuario = async (userData) => {
    try {
        const userExist = await Empleado.findOne({ RFC: { $eq: userData.RFC } });
        const userEmailExist = await Empleado.findOne({ CorreoElectronico: { $eq: userData.CorreoElectronico } });

        if (userExist) {
            throw new Error('El usuario ya existe');
        } else if (userEmailExist) {
            throw new Error('El correo ya está siendo ocupado por otro usuario');
        }

        const hashedPassword = await hash(userData.Password);
        const nuevoUsuario = new Empleado({
            ...userData,
            Password: hashedPassword
        });

        return await nuevoUsuario.save();
    } catch (error) {
        throw error;
    }
};

exports.loginUsuario = async (userData) => {
    try {
        const usuario = await Empleado.findOne({ CorreoElectronico: { $eq: userData.CorreoElectronico } });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const PasswordValida = await compare(userData.Password, usuario.Password);
        if (!PasswordValida) {
            throw new Error('Contraseña incorrecta');
        }

        const token = sign(usuario); // Genera el token
        return { token, usuario: { _id: usuario._id, rol: usuario.Rol } }; // Retorna el token y datos básicos
    } catch (error) {
        throw error;
    }
};