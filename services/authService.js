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
        const claveEmpleado = await generarClaveEmpleado(userData.nombre, userData.apellidoPaterno, userData.apellidoMaterno);
        const hashedPassword = await hash(userData.Password);
        const nuevoUsuario = new Empleado({
            ...userData,
            ClaveEmpleado:claveEmpleado,
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

const generarClaveEmpleado = async (nombre, apellidoPaterno, apellidoMaterno) => {
    
    const nombres = nombre.split(" ");
    let iniciales = nombres.map(n => n.charAt(0)).join("").toUpperCase(); 
    
    // Primera letra del apellido paterno y materno
    const inicialApP = apellidoPaterno.charAt(0).toUpperCase();
    const inicialApM = apellidoMaterno.charAt(0).toUpperCase();

    // Formar el prefijo de la clave
    const prefijoClave = `${iniciales}${inicialApP}${inicialApM}`; 

    // Buscar el último usuario con el mismo prefijo en MongoDB
    const ultimoUsuario = await Usuario.aggregate([
        { 
            $match: { ClaveEmpleado: { $regex: `^${prefijoClave}-\\d{3}$` } } 
        },
        {
            $sort: { ClaveEmpleado: -1 } 
        },
        {
            $limit: 1 
        }
    ]);

    let consecutivo = 1;
    if (ultimoUsuario.length > 0) {
        // Extraer el número del último empleado registrado
        const claveSplit = ultimoUsuario[0].ClaveEmpleado.split('-');
        consecutivo = parseInt(claveSplit[1]) + 1;
    }

    // Formatear el consecutivo con 3 dígitos
    const claveFinal = `${prefijoClave}-${consecutivo.toString().padStart(3, '0')}`;

    return claveFinal;
};