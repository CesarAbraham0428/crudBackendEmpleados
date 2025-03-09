const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const sign = (usuario) => {
    const token = jwt.sign(
        {
            _id: usuario._id,
            role: usuario.Rol
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

const verify = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = { sign, verify };