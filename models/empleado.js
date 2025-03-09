const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmpleadoSchema = new Schema(
  {
    ClaveEmpleado: {
      type: String,
      required: true,
      unique: true,
    },
    Nombre: {
      type: String,
      required: true
    },
    ApP: {
      type: String,
      required: true
    },
    ApM: {
      type: String,
      required: true
    },
    FechaNacimiento: {
      type: Date,
    },
    RFC: {
      type: String,
      required: true,
      unique: true,
    },
    Sexo: {
      type: String,
      enum: ["M", "F"],
      required: true
    },
    FotoEmpleado: {
      type: String, // Cambiarlo a Buffer si se almacenan imágenes en base64
    },
    Departamento: {
      type: String,
    },
    Puesto: {
      type: String,
    },
    Telefono: {
      type: [String], // Un array de strings
    },
    CorreoElectronico: {
      type: [String], // También un array de strings
      required: true
    },
    Password: {
      type: String,
      required: true,
    },
    Rol: {
      type: String,
      required: true,
      enum: ["empleado", "RH"],
      default: "empleado",
    },
    Domicilio: {
      Calle: {
        type: String,
        required: true
      },
      NumeroExterior: {
        type: String,
        required: true
      },
      NumeroInterior: {
        type: String,
        required: false
      },
      Colonia: {
        type: String,
        required: true
      },
      CodigoPostal: {
        type: String,
        required: true
      },
      Ciudad: {
        type: String,
        required: true
      }
    },
    CursoExterno: [
      {
          Nombre: { type: String, required: true },
          TipoCurso: { type: String, required: true },
          FechaInicio: { type: Date, required: true },
          FechaFin: { type: Date, required: true }
      }
  ]
  
  },
  {
    timestamps: true,
  }
);

const Empleado = mongoose.model("Empleado", EmpleadoSchema, "Empleado");

module.exports = Empleado;
