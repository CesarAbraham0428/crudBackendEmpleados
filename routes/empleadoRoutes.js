const express = require('express');

const router = express.Router();

const {actualizarEmpleadoValidator} = require('../middlewares/empleadoValidator')

const empleadoController = require('../controllers/empleadoController');

router.patch('/actualizarInfoPersonal', actualizarEmpleadoValidator, empleadoController.actualizarEmpleado);

module.exports = router;