const express = require('express');
const router = express.Router();

const { registroValidator, loginValidator} = require('../middlewares/authValidator')

const authController = require('../controllers/authController');

const autorizar = require('../middlewares/authMiddleware');

const upload = require("../middlewares/uploadMiddleware");

router.post('/registrar', registroValidator,authController.registrarUsuario);

router.post('/login', loginValidator, authController.loginUsuario);

router.patch('/actualizarPassword', autorizar, authController.cambiarPassword);

router.get('/logout', authController.logoutUsuario);

module.exports = router