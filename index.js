require('dotenv').config()

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const empleadoRoutes = require('./routes/empleadoRoutes');

const app = express();

// Configura CORS para permitir el origen del frontend y credenciales
app.use(
    cors({
      origin: 'http://localhost:4200', // Especifica el origen permitido
      credentials: true, // Permite el envío de credenciales (cookies)
    })
  );
  

app.use(cookieParser());
app.use(express.json());

//Middlewares

app.use('/auth', authRoutes);

app.use('/empleado', empleadoRoutes);

module.exports = app