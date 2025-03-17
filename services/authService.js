const Empleado = require('../models/empleado');

const empleadoRepository = require('../repositories/empleadoRepository');

const { sign } = require('../utils/handleJwt');
const { hash, compare } = require('../utils/handlePassword');

exports.registrarUsuario = async (userData) => {
    try {
        const userExist = await empleadoRepository.obtenerPorRFC(userData.RFC);
        const userEmailExist = await empleadoRepository.obtenerPorEmail(userData.CorreoElectronico);

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
        const usuario = await empleadoRepository.obtenerPorEmail(userData.CorreoElectronico);

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

exports.cambiarPassword = async (userId, Password, NuevaPassword) => {
    try {
        // Obtener el usuario por su ID
        const usuario = await empleadoRepository.obtenerPorId(userId);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        // Verificar que la contraseña actual sea correcta
        const passwordValida = await compare(Password, usuario.Password);
        if (!passwordValida) {
            throw new Error("Contraseña incorrecta");
        }

        // Encriptar la nueva contraseña
        const nuevaPasswordEncriptada = await hash(NuevaPassword, 10);

        // Actualizar la contraseña en la base de datos
        await empleadoRepository.actualizarEmpleadoCompleto(userId, {
            Password: nuevaPasswordEncriptada
        });

        return;
    } catch (error) {
        throw error;
    }
};