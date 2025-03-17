const express = require('express');
const router = express.Router();

const { registroValidator, loginValidator} = require('../middlewares/authValidator')

const authController = require('../controllers/authController');

router.post('/registrar', registroValidator ,authController.registrarUsuario);

router.post('/login', loginValidator, authController.loginUsuario);

router.get('/logout', authController.logoutUsuario);

module.exports = router