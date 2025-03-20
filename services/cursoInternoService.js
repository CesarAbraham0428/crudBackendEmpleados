const Curso = require('../models/curso');  
const Empleado = require('../models/empleado');

exports.crearCurso = async (actividad, tipoDocumento, fechaInicio, fechaTermino, empleados) => {
  try {

        // Validación: verificar que el array de empleados no está vacío
        if (!empleados || empleados.length === 0) {
          throw new Error('El array de empleados está vacío');
        }
    
        // Validación: verificar que cada empleado tiene la propiedad 'ClaveEmpleado'
        empleados.forEach((emp, index) => {
          if (!emp.ClaveEmpleado) {
            throw new Error(`El empleado en la posición ${index} no tiene la propiedad 'ClaveEmpleado'`);
          }
        });
        
    const nuevoCurso = new Curso({
      Nombre: actividad,
      TipoCurso: tipoDocumento,
      FechaInicio: fechaInicio,
      FechaFin: fechaTermino,
      InfoEmpleado: empleados.map(emp => ({ ClaveEmpleado: emp.ClaveEmpleado }))  
    });

    
    const cursoGuardado = await nuevoCurso.save();
    return cursoGuardado;  
  } catch (error) {
    throw error; 
  }
};


exports.obtenerCursosConEmpleados = async (filtros = {}) => {
  try {
    const { nombreCurso, fechaInicio, fechaTermino } = filtros;

    const pipeline = [];
    console.log(pipeline);
    console.log(filtros);

    // Crear un objeto para combinar los filtros
    const matchFilters = {};

    // Filtro por nombre del curso (si existe)
    if (nombreCurso) {
      matchFilters.Nombre = { $regex: nombreCurso, $options: 'i' }; // Filtra por nombre del curso (insensible a mayúsculas/minúsculas)
    }

    // Filtro por rango de fechas (si existen)
    if (fechaInicio && fechaTermino) {
      matchFilters.FechaInicio = { $gte: new Date(fechaInicio) }; // FechaInicio mayor o igual a la fecha de inicio
      matchFilters.FechaFin = { $lte: new Date(fechaTermino) }; // FechaFin menor o igual a la fecha de término
    }

    // Si hay filtros, agregarlos al pipeline
    if (Object.keys(matchFilters).length > 0) {
      pipeline.push({ $match: matchFilters });
    }

    // Unir con la colección de empleados (si es necesario)
    pipeline.push(
      {
        $lookup: {
          from: "Empleado",
          localField: "InfoEmpleado.ClaveEmpleado",
          foreignField: "ClaveEmpleado",
          as: "EmpleadoInfo"
        }
      },
      {
        $unwind: "$EmpleadoInfo" // Descompone el array de empleados
      },
      {
        $project: {
          Nombre: 1,
          TipoCurso: 1,
          FechaInicio: 1,
          FechaFin: 1,
          EmpleadoNombre: "$EmpleadoInfo.Nombre",
          EmpleadoApP: "$EmpleadoInfo.ApP",
          EmpleadoApM: "$EmpleadoInfo.ApM",
          ClaveEmpleado: "$EmpleadoInfo.ClaveEmpleado"
        }
      }
    );

    const cursos = await Curso.aggregate(pipeline);
    return cursos;
  } catch (error) {
    throw error;
  }
};