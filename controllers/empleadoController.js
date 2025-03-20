const empleadoService = require('../services/empleadoService');
const referenciaFamiliarService = require('../services/referenciaFamiliarService');
const ActividadEmpresaService = require('../services/actividadEmpresaService');
const cursoExternoService = require('../services/cursoExternoService');

const handleHttpError = require('../utils/handleHttpError');

const { matchedData } = require('express-validator');

exports.obtenerTodos = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerTodos();
        res.status(200).json({ empleados })
    } catch (error) {
        handleHttpError(res, 'No se encontraron empleados registrados', 404, error)
    }
};

exports.obtenerPorClave = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado; // Extrae la clave desde params
        const empleado = await empleadoService.obtenerPorClave({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ empleado });
    } catch (error) {
        handleHttpError(res, 'Error al obtener el empleado especifico', 404, error);
    }
};

// Información Basica del Empleado

exports.obtenerInfoPersonal = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token

        const infoPersonalEmpleado = await empleadoService.obtenerInfoPersonal(userId);
        res.status(200).json({ infoPersonalEmpleado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar el empleado', 500, error);
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const userId = req.user._id; // Extrae el ID del token
        const empleadoData = req.body;

        const empleadoActualizado = await empleadoService.actualizarEmpleado(userId, empleadoData);
        res.status(200).json({ empleadoActualizado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar la información Personal del Empleado', 500, error);
    }
};

exports.eliminar = async (req, res) => {
    try {
        const ClaveEmpleado = req.params.ClaveEmpleado;

        const empleado = await empleadoService.eliminar({ ClaveEmpleado: ClaveEmpleado });

        res.status(200).json({ message: `Empleado eliminado`, empleado });
    } catch (error) {
        handleHttpError(res, 'Error al eliminar el empleado', 500, error);
    }
};

// Foto Empleado

exports.agregarFotoEmpleado = async (req, res) => {
    try {
        const userId = req.user._id;
        const foto = req.file;
        const empleado = await empleadoService.agregarFotoEmpleado(userId, foto);
        res.json({ message: "Foto subida correctamente.", empleado });
    } catch (error) {
        handleHttpError(res, 'Error al agregar la foto del empleado', 500, error);
    }
};

exports.eliminarFotoEmpleado = async (req, res) => {
    try {
        const userId = req.user._id;
        const empleado = await empleadoService.eliminarFotoEmpleado(userId);
        res.json({ message: "Foto eliminada correctamente.", empleado });
    } catch (error) {
        handleHttpError(res, 'Error al eliminar la foto del empleado', 500, error);
    }
};

// Correos y Telefonos del Empleado

exports.actualizarContactos = async (req, res) => {
    try {
        const userId = req.user._id;
        const { operaciones } = req.body;

        if (!operaciones || !Array.isArray(operaciones)) {
            throw new Error("Formato de operaciones no válido");
        }

        const resultados = [];
        for (const opera of operaciones) {
            const { tipo, operacion, datos } = opera;

            let resultado;
            if (tipo === "correo") {
                resultado = await empleadoService.manejarCorreos(userId, operacion, datos);
            } else if (tipo === "telefono") {
                resultado = await empleadoService.manejarTelefonos(userId, operacion, datos);
            } else {
                throw new Error("Tipo de contacto no válido");
            }

            resultados.push(resultado);
        }

        res.status(200).json({ mensaje: "Operaciones realizadas correctamente", resultados });
    } catch (error) {
        handleHttpError(res, 'Error al realizar las operaciones', 500, error);
    }
};

// Información de Referencia Familiar del empleado

exports.agregarReferenciaFamiliar = async (req, res) => {
    try {
        const userId = req.user._id;
        const referenciaData = req.body;
        const referenciaActualizada = await referenciaFamiliarService.agregar(userId, referenciaData);

        res.status(200).json({ message: `Referencia Agregada`, referenciaActualizada });
    } catch (error) {
        handleHttpError(res, 'Error al agregar Referencia Familiar', 500, error);
    }
};

exports.actualizarReferenciaFamiliar = async (req, res) => {
    try {
        const userId = req.user._id;
        const referenciaId = req.params.referenciaId;
        const referenciaData = req.body;

        const referenciaActualizada = await referenciaFamiliarService.actualizar(userId, referenciaId, referenciaData);

        res.status(200).json({ message: `Referencia Familiar Actualizada`, referenciaActualizada });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar Referencia Familiar', 500, error);
    }
};

exports.eliminarReferenciaFamiliar = async (req, res) => {
    try {
        const userId = req.user._id;
        const referenciaId = req.params.referenciaId;
        const resultado = await referenciaFamiliarService.eliminar(userId, referenciaId);

        res.status(200).json(resultado);
    } catch (error) {
        handleHttpError(res, 'Error al eliminar Referencia Familiar', 500, error);
    }
};

// Manejo de Telefonos de Referencia Familiar

exports.actualizarTelefonosFamiliar = async (req, res) => {
    try {
        const userId = req.user._id;
        const referenciaId = req.params.referenciaId;
        const { operacion, telefonos } = req.body;

        if (!operacion || !telefonos) {
            return res.status(400).json({ error: "Operación y teléfonos son requeridos" });
        }

        const referenciaActualizada = await referenciaFamiliarService.manejarTelefonosFamiliar(
            userId, referenciaId, operacion, telefonos
        );

        res.status(200).json({
            message: `Teléfonos de referencia familiar ${operacion === 'agregar' ? 'agregados' : 'eliminados'} correctamente`,
            referenciaActualizada
        });
    } catch (error) {
        handleHttpError(res, `Error al ${req.body.operacion} teléfonos a referencia familiar`, 500, error);
    }
};

exports.obtnerCursoExternoEmpleado = async (req, res) => {
    try{
        const userId = req.user._id;

        const cursosExternos = await cursoExternoService.obtnerCursoExternoEmpleado(userId);

        res.status(200).json({ cursosExternos });        
    }catch(error){
        handleHttpError(res, 'Error al obtener los CursosExternos del Empleado', 500, error);
    }
};

exports.agregarCursoExterno = async (req, res) => {
    try {
        const userId = req.user._id; // Obtener el _id del usuario autenticado
        const cursoExternoData = req.body; // Datos del curso externo

        const cursoExternoAgregado = await cursoExternoService.agregar(userId, cursoExternoData);

        res.status(200).json({ message: "Curso Externo agregado", cursoExternoAgregado });
    } catch (error) {
        handleHttpError(res, 'Error al agregar Curso Externo', 500, error);
    }
};

exports.actualizarCursoExterno = async (req, res) => {
    try {
        const userId = req.user._id; // Obtener el _id del usuario autenticado
        const cursoExternoId = req.params.cursoExternoId; // Obtener el _id del curso externo
        const cursoExternoData = req.body; // Datos actualizados del curso externo

        const cursoExternoActualizado = await cursoExternoService.actualizar(userId, cursoExternoId, cursoExternoData);

        res.status(200).json({ message: "Curso Externo actualizado", cursoExternoActualizado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar Curso Externo', 500, error);
    }
};

exports.eliminarCursoExterno = async (req, res) => {
    try {
        const userId = req.user._id; // Obtener el _id del usuario autenticado
        const cursoExternoId = req.params.cursoExternoId; // Obtener el _id del curso externo

        const resultado = await cursoExternoService.eliminar(userId, cursoExternoId);

        res.status(200).json(resultado);
    } catch (error) {
        handleHttpError(res, 'Error al eliminar Curso Externo', 500, error);
    }
};

// Información de ActividadesEmpresa del empleado

exports.obtenerActividadesEmpresa = async (req, res) => {
    try {
        const userId = req.user._id;

        const actividadesEmpresa = await ActividadEmpresaService.obtenerActividadesEmpresaEmpleado(userId);
        res.status(200).json({ actividadesEmpresa });
    } catch (error) {
        handleHttpError(res, "Error al obtener las actividades del empleado", 500, error);
    }
};

exports.agregarActividadEmpresa = async () => {

};

exports.actualizarActividadEmpresa = async () => {

};

exports.eliminarActividadEmpresa = async () => {

};

exports.obtenerEmpleadosFiltrados = async (req, res) => {
    const { NombreActividad, NombreDepartamento } = req.query;

    try {
        const empleados = await empleadoService.obtenerEmpleadosFiltrados(NombreActividad, NombreDepartamento);

        // Asigna la actividad a todos los empleados (incluso a los que no tienen actividad asignada)
        const empleadosConActividad = empleados.map(emp => {
            
            // Si el empleado tiene la actividad, dejamos el Estatus tal cual
            const actividadEncontrada = emp.ActividadEmpresa.find(act => act.NombreActividad === NombreActividad);

            // Si no tiene la actividad, agregamos la actividad con Estatus 0 (no participa)
            if (!actividadEncontrada) {
                emp.ActividadEmpresa.push({
                    NombreActividad: NombreActividad,
                    Estatus: 0 
                });
            }

            // Agrega el Estatus a cada empleado
            emp.participacion = actividadEncontrada ? actividadEncontrada.Estatus : 0;

            return emp;
        });

        res.json(empleadosConActividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.actualizarParticipacion = async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body);  // Agrega esto para verificar los datos

    const { ClaveEmpleado, NombreActividad, participacion } = req.body; 

    const participacionValida = typeof participacion === 'boolean' ? (participacion ? 1 : 0) : participacion || 0;

  
    try {
     
      const empleado = await empleadoService.actualizarParticipacion(ClaveEmpleado, NombreActividad, participacionValida);
  
     
      res.json({ message: 'Participación actualizada correctamente', empleado });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.actualizarEmpleadoT = async (req, res) => {
    try {
        const ClaveEmpleado = String(req.params.ClaveEmpleado); // Extrae la ClaveEmpleado desde los parámetros de la URL
        const empleadoData = req.body;

        const empleadoActualizado = await empleadoService.actualizarEmpleado(ClaveEmpleado, empleadoData);
        res.status(200).json({ empleadoActualizado });
    } catch (error) {
        handleHttpError(res, 'Error al actualizar la información del Empleado', 500, error);
    }
};
