const empleadoRepository = require('../repositories/empleadoRepository');

exports.obtenerActividadesEmpresaEmpleado = async (userId)=>{
    try{
        const actividadesEmpleado = await empleadoRepository.obtenerActividadesEmpresa(userId);
        return actividadesEmpleado;
    }catch(error){
        throw error;
    }
};

exports.agregar = async (userId, referenciaData) => {
    try {

    } catch (error) {
        throw error;
    }
};

exports.actualizar = async (userId, referenciaId, referenciaData) => {
    try {
       
    } catch (error) {
        throw error;
    }
};

exports.eliminar = async (userId, referenciaId) => {
    try {
        
    } catch (error) {
        throw error;
    }
};