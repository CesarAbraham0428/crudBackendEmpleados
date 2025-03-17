const express = require('express');
const router = express.Router();

const { getDepartamento, getCiudad, getParentesco, getPuesto } = require('../controllers/cargarDatosController');

router.get('/departamentos', getDepartamento);

router.get('/ciudades', getCiudad);

router.get('/puestos', getPuesto);

router.get('/parentescos', getParentesco);


module.exports = router