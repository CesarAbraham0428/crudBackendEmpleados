const express = require('express');
const router = express.Router();
const cursoInternoController = require('../controllers/cursoInternoController');  


router.post('/crear', cursoInternoController.crearCurso);
router.get('/obtenercursos', cursoInternoController.obtenerCursos);

module.exports = router;    