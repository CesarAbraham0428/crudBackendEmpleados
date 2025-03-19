const express = require('express');
const router = express.Router();

const { getDepartamento, getCiudad, getParentesco, getPuesto,getActividad,getTipoDocumento,getCurso} = require('../controllers/cargarDatosController');

router.get('/departamentos', getDepartamento);

router.get('/ciudades', getCiudad);

router.get('/puestos', getPuesto);

router.get('/parentescos', getParentesco);

router.get('/actividades', getActividad);

router.get('/documentos', getTipoDocumento);

router.get('/nombrecursos', getCurso);


module.exports = router