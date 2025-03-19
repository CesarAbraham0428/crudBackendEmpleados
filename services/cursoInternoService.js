const Curso = require('../models/curso');  

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
