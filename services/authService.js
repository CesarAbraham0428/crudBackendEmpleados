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
        const claveEmpleado = await generarClaveEmpleado(userData.Nombre, userData.ApP, userData.ApM);
        // Validación de la clave generada
        if (!claveEmpleado) {
            throw new Error('No se pudo generar la clave de empleado');
        }

        const { FotoEmpleado, ...restoDeDatos } = userData;
        console.log(FotoEmpleado);

        // Convertir FotoEmpleado a Buffer si es válido
        let fotoBuffer = null;
        if (FotoEmpleado && typeof FotoEmpleado === "string" && FotoEmpleado.startsWith("data:")) {
            const base64Data = FotoEmpleado.split(",")[1];
            if (base64Data) {
                fotoBuffer = Buffer.from(base64Data, "base64");
                console.log("fotoBuffer:", fotoBuffer);
            } else {
                console.error("La cadena base64 no es válida.");
            }
        } else {
            console.error("FotoEmpleado no es válida:", FotoEmpleado);
        }


        const hashedPassword = await hash(userData.Password);
        const nuevoUsuario = new Empleado({
            ...restoDeDatos,
            ClaveEmpleado:claveEmpleado,
            Password: hashedPassword,
            FotoEmpleado: fotoBuffer
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

const generarClaveEmpleado = async (Nombre, ApP, ApM) => {
    console.log("Datos recibidos en generarClaveEmpleado:", { Nombre, ApP, ApM });

    if (!Nombre || !ApP || !ApM) {
        throw new Error("Faltan datos para generar la clave de empleado");
    }

    const nombres = Nombre.split(" ");
    let iniciales = '';
    if (nombres.length > 1) {
      iniciales = nombres.map((n) => n.charAt(0)).join("").toUpperCase(); // Ejemplo: "José Antonio" -> "JA"
    } else {
      iniciales = nombres[0].substring(0, 2).toUpperCase(); // Ejemplo: "Camila" -> "CA"
    }
    
    const inicialApP = ApP.charAt(0).toUpperCase();
    const inicialApM = ApM.charAt(0).toUpperCase();
    
    // Formar prefijo de la clave
    const prefijoClave = `${iniciales}${inicialApP}${inicialApM}`;
    
    try {
        // Buscar el último usuario con el mismo prefijo en MongoDB
        const ultimoUsuario = await Empleado.aggregate([
            {
                $match: { ClaveEmpleado: { $regex: "^[A-Za-z]{3,4}-\\d{3}$" } }
            },
            {
                $project: {
                    ClaveEmpleado: 1,
                    numero: {
                        $toInt: {
                            $substr: ["$ClaveEmpleado", 5, 3] 
                        }
                    }
                }
            },
            { $sort: { ClaveEmpleado: -1 } },
            { $limit: 1 }
        ]);
    
        console.log("Último usuario encontrado:", ultimoUsuario); // Depuración
    
        let consecutivo = 1;
        if (ultimoUsuario.length > 0) {
            consecutivo = ultimoUsuario[0].numero + 1;  // Sumar 1 al último número encontrado
        }
    
        // Formatear el consecutivo con 3 dígitos
        const claveFinal = `${prefijoClave}-${consecutivo.toString().padStart(3, "0")}`;
    
        return claveFinal;
    } catch (error) {
        console.error("Error al generar la clave de empleado:", error);
        throw new Error("Error al generar la clave de empleado");
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