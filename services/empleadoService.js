const empleadoRepository = require('../repositories/empleadoRepository');

const referenciaFamiliarService = require('./referenciaFamiliarService');

const Empleado = require('../models/empleado');



exports.obtenerTodos = async () => {
    try {
        console.log(empleadoRepository);

        const empleados = await empleadoRepository.obtenerEmpleados();

        if (!empleados) {
            throw new Error("No hay empleados registrados");
        }

        return empleados;

    } catch (error) {
        throw error; // En los Servicios solo lanzamos el error para que el controlador lo maneje
    }
};

exports.obtenerPorClave = async (empleadoData) => {
    try {
        const empleado = await empleadoRepository.obtenerPorClave(empleadoData);

        if (!empleado) {
            throw new Error("No hay un empleado registrado con esa Clave");
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};

exports.obtenerInfoPersonal = async (userId) => {
    try {

        const infoEmpleado = await empleadoRepository.obtenerInfoPersonal(userId);

        return infoEmpleado;
    } catch (error) {
        throw error;
    }
};

exports.actualizarEmpleado = async (userId, body) => {
    try {
        const empleadoActualizado = await empleadoRepository.actualizarEmpleadoCompleto(userId, body)

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar la información del empleado");
        }

        return empleadoActualizado;
    } catch (error) {
        throw error;
    }
};

exports.eliminar = async (empleadoData) => {
    try {
        const empleado = await empleadoRepository.eliminarPorClave(empleadoData.ClaveEmpleado);

        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }

        return empleado;
    } catch (error) {
        throw error;
    }
};

// Foto Empleado

exports.agregarFotoEmpleado = async (userId, foto) => {
  if (!foto) throw new Error("No se recibió ninguna imagen.");
  return await empleadoRepository.actualizarFotoEmpleado(userId, foto.buffer);
};

exports.eliminarFotoEmpleado = async (userId) => {
  return await empleadoRepository.eliminarFotoEmpleado(userId);
};

// Operaciones con Arrays

exports.manejarCorreos = async (userId, operacion, datos) => {
    const { correos } = datos;

    if (!correos || !Array.isArray(correos)) {
        throw new Error("Formato de correos no válido");
    }

    switch (operacion) {
        case "agregar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $addToSet: { CorreoElectronico: { $each: correos } } }
            );

        case "eliminar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $pull: { CorreoElectronico: { $in: correos } } }
            );

        default:
            throw new Error("Operación no válida para correos");
    }
};

exports.manejarTelefonos = async (userId, operacion, datos) => {
    const { telefonos } = datos;

    if (!telefonos || !Array.isArray(telefonos)) {
        throw new Error("Formato de teléfonos no válido");
    }

    switch (operacion) {
        case "agregar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $addToSet: { Telefono: { $each: telefonos } } }
            );

        case "eliminar":
            return await empleadoRepository.actualizarEmpleadoCompleto(
                userId,
                { $pull: { Telefono: { $in: telefonos } } }
            );

        default:
            throw new Error("Operación no válida para teléfonos");
    }
};


exports.obtenerEmpleadosFiltrados = async (NombreActividad, NombreDepartamento) => {
    try {
      const empleados = await Empleado.find({
        Departamento: NombreDepartamento  // Filtramos por departamento
      });
  
      // Filtramos a los empleados que tengan la actividad y los que no
      return empleados.map(emp => {
        // Buscar la actividad en el empleado
        const actividad = emp.ActividadEmpresa.find(act => act.NombreActividad === NombreActividad);
  
        // Si la actividad no está presente, se agrega con Estatus 0 (No Participa)
        if (!actividad) {
          emp.ActividadEmpresa.push({
            NombreActividad: NombreActividad,
            Estatus: 0 // Establecemos que no participa si no tiene la actividad
          });
        }
  
        return emp;
      });
  
    } catch (error) {
      throw new Error('Error al obtener empleados: ' + error.message);
    }
  };
  // EmpleadoService.js

    exports.actualizarParticipacion = async (ClaveEmpleado, NombreActividad, participacion) => {
        try {
        // Buscar al empleado por su ClaveEmpleado
        const empleado = await Empleado.findOne({ ClaveEmpleado });
    
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
    
        // Buscar la actividad dentro de "ActividadEmpresa" y actualizar el estado
        const actividad = empleado.ActividadEmpresa.find(act => act.NombreActividad === NombreActividad);
    
        if (!actividad) {
            // Si no tiene la actividad, la agregamos con Estatus 0 (no participa)
            empleado.ActividadEmpresa.push({
            NombreActividad: NombreActividad,  // Asegúrate de que el valor de NombreActividad esté presente
            Estatus: participacion === 0 ? 0 : 1
            });
        } else {
            // Si ya tiene la actividad, actualizamos el estado de participación
            actividad.Estatus = participacion === 0 ? 0 : 1;
        }
    
        // Guardamos los cambios en la base de datos
        await empleado.save();
        return empleado;  // Retornamos el empleado actualizado
        } catch (error) {
        throw new Error('Error al actualizar la participación: ' + error.message);
        }
    };
    