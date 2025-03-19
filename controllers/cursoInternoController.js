const cursoInternoService = require('../services/cursoInternoService');
const handleHttpError = require('../utils/handleHttpError');  


exports.crearCurso = async (req, res) => {
  try {
    const { actividad, tipoDocumento, fechaInicio, fechaTermino, empleados } = req.body;


    const nuevoCurso = await cursoInternoService.crearCurso(actividad, tipoDocumento, fechaInicio, fechaTermino, empleados);

    res.status(201).json({ mensaje: 'Curso creado con éxito', curso: nuevoCurso });
  } catch (error) {
    
    handleHttpError(res, 'Error al crear el curso', 500, error);
  }
};
