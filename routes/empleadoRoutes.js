const express = require('express');

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");

const {
    actualizarInfoPersonalEmpleadoValidator,
    actualizarEmpleadoValidator

} = require('../middlewares/empleadoValidator')

const empleadoController = require('../controllers/empleadoController');

const autorizar = require('../middlewares/authMiddleware');

router.get('/obtenerEmpleados', empleadoController.obtenerTodos);
router.get('/obtenerEmpleadoClave/:ClaveEmpleado', empleadoController.obtenerPorClave);
router.get('/obtenerInfoPersonal', autorizar, empleadoController.obtenerInfoPersonal);
router.patch('/actualizarEmpleado', autorizar ,actualizarEmpleadoValidator, empleadoController.actualizarEmpleado);
router.delete('/eliminarEmpleado/:ClaveEmpleado', empleadoController.eliminar);

// Rutas para la foto del empleado
router.post("/agregarFoto", autorizar, upload.single("foto"), empleadoController.agregarFotoEmpleado);
router.delete("/eliminarFoto", autorizar, empleadoController.eliminarFotoEmpleado);

// Arrays Correo y Telefono

router.patch('/actualizarContactos', autorizar, empleadoController.actualizarContactos);

// Referencia Familiar

router.post('/agregarReferenciaFamiliar', autorizar, empleadoController.agregarReferenciaFamiliar);
router.patch('/actualizarReferenciaFamiliar/:referenciaId', autorizar, empleadoController.actualizarReferenciaFamiliar);
router.delete('/eliminarReferenciaFamiliar/:referenciaId', autorizar, empleadoController.eliminarReferenciaFamiliar);

router.patch('/actualizarTelefonosFamiliar/:referenciaId', autorizar, empleadoController.actualizarTelefonosFamiliar);

// Curso Externo

router.post('/agregarCursoExterno', autorizar, empleadoController.agregarCursoExterno);
router.patch('/actualizarCursoExterno/:cursoExternoId', autorizar, empleadoController.actualizarCursoExterno);
router.delete('/eliminarCursoExterno/:cursoExternoId', autorizar, empleadoController.eliminarCursoExterno);

// ActividadEmpresa

router.get('/obtenerActividadesEmpleado', autorizar, empleadoController.obtenerActividadesEmpresa);

module.exports = router;