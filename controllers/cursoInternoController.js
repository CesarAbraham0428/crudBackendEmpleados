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

exports.obtenerCursos = async (req, res) => {
  try {
    const { nombreCurso, fechaInicio, fechaTermino } = req.query;

    const filtros = {};
    if (nombreCurso) filtros.nombreCurso = nombreCurso;
    if (fechaInicio) filtros.fechaInicio = fechaInicio;
    if (fechaTermino) filtros.fechaTermino = fechaTermino;

    const cursos = await cursoInternoService.obtenerCursosConEmpleados(filtros);
    res.status(200).json(cursos);
  } catch (error) {
    handleHttpError(res, 'Error al obtener los cursos', 500, error);
  }
};
