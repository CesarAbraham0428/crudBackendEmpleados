const express = require('express');

const router = express.Router();

const {
    actualizarInfoPersonalEmpleadoValidator,
    actualizarEmpleadoValidator

} = require('../middlewares/empleadoValidator')

const empleadoController = require('../controllers/empleadoController');

const autorizar = require('../middlewares/authMiddleware')

router.get('/obtenerEmpleados', empleadoController.obtenerTodos);

router.get('/obtenerEmpleadoClave/:ClaveEmpleado', empleadoController.obtenerPorClave);

router.patch('/actualizarInfoPersonal', autorizar ,actualizarInfoPersonalEmpleadoValidator, empleadoController.actualizarInfoPersonal);

//router.patch('/actualizarEmpleado', actualizarEmpleadoValidator, empleadoController.)

router.delete('/eliminarEmpleado/:ClaveEmpleado', empleadoController.eliminar);

module.exports = router;