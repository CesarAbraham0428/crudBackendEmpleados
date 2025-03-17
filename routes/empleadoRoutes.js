const express = require('express');

const router = express.Router();

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

// Arrays Correo y Telefono

router.post('/agregarCorreo', autorizar, empleadoController.agregarCorreo);
router.put('/actualizarCorreo', autorizar, empleadoController.actualizarCorreo);
router.delete('/eliminarCorreo/:correo', autorizar, empleadoController.eliminarCorreo);

router.post('/agregarTelefono', autorizar, empleadoController.agregarTelefono);
router.put('/actualizarTelefono', autorizar, empleadoController.actualizarTelefono);
router.delete('/eliminartelefono/:telefono', autorizar, empleadoController.eliminarTelefono);

// Referencia Familiar

router.post('/agregarReferenciaFamiliar', empleadoController.agregarReferenciaFamiliar);
router.patch('/actualizarReferenciaFamiliar', empleadoController.actualizarReferenciaFamiliar);
router.delete('/eliminarReferenciaFamiliar', empleadoController.eliminarReferenciaFamiliar);

// Curso Externo

router.post('/agregarCursoExterno', empleadoController.agregarCursoExterno);
router.patch('/actualizarCursoExterno', empleadoController.actualizarCursoExterno);
router.delete('/eliminarCursoExterno', empleadoController.eliminarCursoExterno);

// ActividadEmpresa

router.get('/obtenerActividadesEmpleado', autorizar, empleadoController.obtenerActividadesEmpresa);

module.exports = router;