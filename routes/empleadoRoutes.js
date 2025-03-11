const express = require('express');

const router = express.Router();

const {actualizarEmpleadoValidator} = require('../middlewares/empleadoValidator')

const empleadoController = require('../controllers/empleadoController');

const autorizar = require('../middlewares/authMiddleware')

router.get('/obtenerEmpleados', empleadoController.obtenerEmpleados);

router.get('/obtenerEmpleadoClave/:ClaveEmpleado', empleadoController.obtenerEmpleado);

router.patch('/actualizarInfoPersonal', autorizar ,actualizarEmpleadoValidator, empleadoController.actualizarEmpleado);

router.delete('/eliminarEmpleado/:ClaveEmpleado', empleadoController.eliminarEmpleado);

module.exports = router;