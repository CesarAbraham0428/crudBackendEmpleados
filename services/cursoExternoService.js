const empleadoRepository = require('../repositories/empleadoRepository');

exports.obtnerCursoExternoEmpleado = async (userId)=>{
    try{
        const cursosExternos = await empleadoRepository.obtenerCursosExternos(userId);
        return cursosExternos;
    }catch(error){
        throw error;
    }
};

exports.agregar = async (userId, cursoExternoData) => {
    try {
        const empleadoActualizado = await empleadoRepository.agregarCursoExterno(userId, cursoExternoData);

        if (!empleadoActualizado) {
            throw new Error("No se pudo agregar el curso externo");
        }

        // Devolver el último curso externo agregado
        const nuevoCursoExterno = empleadoActualizado.CursoExterno[empleadoActualizado.CursoExterno.length - 1];
        return nuevoCursoExterno;
    } catch (error) {
        throw error;
    }
};

exports.actualizar = async (userId, cursoExternoId, cursoExternoData) => {
    try {
        const empleadoActualizado = await empleadoRepository.actualizarCursoExterno(userId, cursoExternoId, cursoExternoData);

        if (!empleadoActualizado) {
            throw new Error("No se pudo actualizar el curso externo");
        }

        // Encontrar el curso externo actualizado
        const cursoExternoActualizado = empleadoActualizado.CursoExterno.find(
            curso => curso._id.toString() === cursoExternoId
        );

        return cursoExternoActualizado;
    } catch (error) {
        throw error;
    }
};

exports.eliminar = async (userId, cursoExternoId) => {
    try {
        const empleadoActualizado = await empleadoRepository.eliminarCursoExterno(userId, cursoExternoId);

        if (!empleadoActualizado) {
            throw new Error("No se pudo eliminar el curso externo");
        }

        return { message: "Curso externo eliminado con éxito" };
    } catch (error) {
        throw error;
    }
};