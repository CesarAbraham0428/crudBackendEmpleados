const Empleado = require('../models/empleado');
const {hash} = require('../utils/handlePassword');

exports.registrarUsuario = async (userData)=>{
    try {
        const userExist = await Empleado.findOne({RFC: {$eq : userData.RFC}});
    
        const userEmailExist = await Empleado.findOne({CorreoElectronico : {$eq: userData.CorreoElectronico}});
    
        if(userExist){
            throw new Error("El usuario ya existe");
        }else if(userEmailExist){
            throw new Error("El correo ya esta siendo ocupado por otro usurio");
        }
        const hashedPassword = await hash(userData.Password)
    
        const nuevoUsuario = new Empleado({
            ...userData,
            Password: hashedPassword
        });

        return await nuevoUsuario.save();
    } catch (error) {
        console.log(error)
        throw new Error(`Error al registrar ${userData.Rol}: ${error.message}`);
    }
};