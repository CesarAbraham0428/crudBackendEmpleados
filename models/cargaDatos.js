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


module.exports = {
    Departamento,
    Puesto,
    Ciudad,
    Parentesco
};
