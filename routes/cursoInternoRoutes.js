const express = require('express');
const router = express.Router();
const cursoInternoController = require('../controllers/cursoInternoController');  


router.post('/crear', cursoInternoController.crearCurso);

module.exports = router;    