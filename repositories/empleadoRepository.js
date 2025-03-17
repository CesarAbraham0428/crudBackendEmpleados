const Empleado = require('../models/empleado');

exports.obtenerEmpleados = async()=>{
    return await Empleado.find({Rol:{$eq: "Empleado"}});
};

exports.obtenerEmpleadoPorClave = async(empleadoData)=>{
    return await Empleado.findOne({ ClaveEmpleado: empleadoData.ClaveEmpleado });

};

exports.obtenerPorId = async (userId) => {
    return await Empleado.findById(userId);
};

exports.obtenerInfoPersonal = async(userId)=>{
    return await Empleado.find(
        {_id:{$eq: userId}},
        {_id: 0, CorreoElectronico:1, Telefono:1, Direccion:1, ReferenciaFamiliar:1});
};

exports.actualizarEmpleadoCompleto = async (userId, updateOperations) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        updateOperations,
        { new: true, runValidators: true }
    );
};

exports.eliminarPorClave = async (empleadoData) => {
    return await Empleado.findOneAndDelete({ ClaveEmpleado: empleadoData.ClaveEmpleado });
};

// Telefono

exports.agregarTelefono = async (userId, telefono) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $addToSet: { Telefono: telefono } },
        { new: true }
    );
};

exports.eliminarTelefono = async (userId, telefono) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $pull: { Telefono: telefono } },
        { new: true }
    );
};


// Correo Electronico

exports.agregarCorreo = async (userId, correo) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $addToSet: { CorreoElectronico: correo } },
        { new: true }
    );
};

exports.eliminarCorreo = async (userId, correo) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $pull: { CorreoElectronico: correo } },
        { new: true }
    );
};

//Referencia familiar

exports.agregarReferenciaFamiliar = async (userId, referenciaData) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $push: { ReferenciaFamiliar: referenciaData } },
        { new: true, runValidators: true }
    );
};

exports.actualizarReferenciaFamiliar = async (userId, referenciaId, referenciaData) => {
    const updateQuery = {};

    // Construir los campos a actualizar
    Object.keys(referenciaData).forEach(key => {
        updateQuery[`ReferenciaFamiliar.$.${key}`] = referenciaData[key];
    });

    return await Empleado.findOneAndUpdate(
        { 
            _id: userId,
            'ReferenciaFamiliar._id': referenciaId 
        },
        { $set: updateQuery },
        { new: true, runValidators: true }
    );
};

exports.eliminarReferenciaFamiliar = async (userId, referenciaId) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $pull: { ReferenciaFamiliar: { _id: referenciaId } } },
        { new: true }
    );
};

//Cusos Externos

exports.obtenerCursosExternos = async(userId)=>{
    return await Empleado.find(
        {_id: {$eq: userId}},
        {_id:0, CursoExterno: 1}
    );
};

exports.agregarCursoExterno = async (userId, cursoExternoData) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $push: { CursoExterno: cursoExternoData } }, // Agregar al array CursoExterno
        { new: true, runValidators: true }
    );
};

// Actualizar un CursoExterno
exports.actualizarCursoExterno = async (userId, cursoExternoId, cursoExternoData) => {
    const updateQuery = {};

    // Construir los campos a actualizar
    Object.keys(cursoExternoData).forEach(key => {
        updateQuery[`CursoExterno.$.${key}`] = cursoExternoData[key];
    });

    return await Empleado.findOneAndUpdate(
        { 
            _id: userId,
            'CursoExterno._id': cursoExternoId 
        },
        { $set: updateQuery },
        { new: true, runValidators: true }
    );
};

exports.eliminarCursoExterno = async (userId, cursoExternoId) => {
    return await Empleado.findByIdAndUpdate(
        userId,
        { $pull: { CursoExterno: { _id: cursoExternoId } }}, // Eliminar del array CursoExterno
        { new: true }
    );
};

//Actividades

exports.obtenerActividadesEmpresa = async(userId)=>{
    return await Empleado.find(
        {_id: {$eq: userId}},
        {_id:0, ActividadEmpresa: 1}
    );
};