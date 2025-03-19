const mongoose = require('mongoose');

const {Schema} = mongoose;

const cursoSchema = new Schema (

    {
        Nombre:{
            type: String,
            required : true
        },
        TipoCurso:{
            type: String,
            required: true
        },
        FechaInicio:{
            type: Date,
            required: true
        },
        FechaFin:{
            type: Date,
            required: true
        },
        InfoEmpleado:{
            type: [
                {
                    ClaveEmpleado: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    },
);

const Curso = mongoose.model("CursoInterno", cursoSchema, "CursoInterno");

module.exports = Curso;