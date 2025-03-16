const Empleado = require('../models/empleado');

exports.obtenerTodos = async()=>{
    return await Empleado.find({Rol:{$eq: "Empleado"}});
}

exports.obtenerPorClave = async(empleadoData)=>{
    return await Empleado.findOne({ ClaveEmpleado: empleadoData.ClaveEmpleado });

}

exports.obtenerInfoPersonal = async(userId)=>{
    return await Empleado.find(
        {_id:{$eq: userId}},
        {_id: 0, Nombre:1, ApP:1, ApM:1,  });
}

exports.eliminarPorClave = async (empleadoData) => {
    return await Empleado.findOneAndDelete({ ClaveEmpleado: empleadoData.ClaveEmpleado });
}