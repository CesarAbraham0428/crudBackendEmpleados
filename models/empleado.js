const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmpleadoSchema = new Schema(
  {
    ClaveEmpleado: {
      type: String,
      required: false,
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
      required: true
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
      type: Buffer, // Cambiarlo a Buffer si se almacenan imágenes en base64
      required: false
    },
    Departamento: {
      type: String,
      required: true
    },
    Puesto: {
      type: String,
      required: true
    },
    Telefono: {
      type: [String], // Un array de strings
      required: true
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
      enum: ["Empleado", "RH"],
      default: "Empleado",
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
  ],
  ActividadEmpresa:[
    {
      NombreActividad:{type: String, required: true},
      Estatus: {type: Number, enum: [0, 1], required: true}
    }
  ],
  ReferenciaFamiliar:[
    {
      NombreFamiliar: {type: String, required: true},
      Parentesco: {type: String, required: true},
      Telefono: {type: [String], required: true},
      CorreoElectronico: {type: String, required: true}
    }
  ]
  
  },
  {
    timestamps: true,
  }
);

const Empleado = mongoose.model("Empleado", EmpleadoSchema, "Empleado");

module.exports = Empleado;
