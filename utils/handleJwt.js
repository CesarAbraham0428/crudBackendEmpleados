const jwt = require('jsonwebtoken');

const firmar = ()=>{
    jwt.sign()
}

const verificarToken = ()=>{
    jwt.verify()
}

module.exports = {firmar, verificarToken}