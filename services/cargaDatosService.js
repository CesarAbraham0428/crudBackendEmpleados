const {Departamento,Ciudad,Puesto,Parentesco,Actividad,Documento,Curso} = require('../models/cargaDatos');


exports.getDepartamento = async () => {
    try {
        const departamentos = await Departamento.find()

        return departamentos;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};


//Puesto 
exports.getPuesto = async () => {
    try {
        const puestos = await Puesto.find()

        return puestos;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};


//Ciudad
exports.getCiudad = async () => {
    try {
        const ciudades = await Ciudad.find()

        return ciudades;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};

//Parentesco
exports.getParentesco = async () => {
    try {
        const parentesco = await Parentesco.find()

        return parentesco;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};


exports.getActividad = async () => {
    try {
        const actividad = await Actividad.find()

        return actividad;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};


exports.getTipoDocumento = async () => {
    try {
        const tipodocumento = await Documento.find()

        return tipodocumento;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};



exports.getCurso = async () => {
    try {
        const nombrecurso = await Curso.find()

        return nombrecurso;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};




