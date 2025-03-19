const mongoose = require('mongoose');
const { Schema } = mongoose;

// Modelo de Departamento
const departamentoSchema = new Schema({
    NombreDepartamento: {
        type: String,
        required: true
    }
});
const Departamento = mongoose.model("Departamento", departamentoSchema, "Departamento");

// Modelo de Puesto
const puestoSchema = new Schema({
    NombrePuesto: {
        type: String,
        required: true
    }
});
const Puesto = mongoose.model("Puesto", puestoSchema, "Puesto");

// Modelo de Ciudad
const ciudadSchema = new Schema({
    NombreCiudad: {
        type: String,
        required: true
    }
});
const Ciudad = mongoose.model("Ciudad", ciudadSchema, "Ciudad");

// Modelo de Parentesco
const parentescoSchema = new Schema({
    Parentesco: {
        type: String,
        required: true
    }
});
const Parentesco = mongoose.model("Parentesco", parentescoSchema, "Parentesco");



const actividadSchema = new Schema({
    NombreActividad: {
        type: String,
        required: true
    }
});
const Actividad = mongoose.model("Actividad",actividadSchema, "Actividad");


const tipoDocumentoSchema = new Schema({
    TipoDocumento: {
        type: String,
        required: true
    }
});
const Documento = mongoose.model("Documento",tipoDocumentoSchema, "Documento");


const cursoSchema = new Schema({
    NombreCurso: {
        type: String,
        required: true
    }
});
const Curso = mongoose.model("Curso",tipoDocumentoSchema, "Curso");



module.exports = {
    Departamento,
    Puesto,
    Ciudad,
    Parentesco,
    Actividad,
    Documento,
    Curso
};
