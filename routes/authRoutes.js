const express = require('express');
const router = express.Router();

const { registroValidator, loginValidator} = require('../middlewares/authValidator')

const authController = require('../controllers/authController');

router.post('/registrar', registroValidator ,authController.registrarusuario);

//router.post('/login', loginValidator, authController)

module.exports = router