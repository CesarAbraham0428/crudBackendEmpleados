require('dotenv').config()

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const empleadoRoutes = require('./routes/empleadoRoutes');

const cargaDatosRoutes = require ('./routes/cargaDatosRoutes');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Middlewares

app.use('/auth', authRoutes);

app.use('/empleado', empleadoRoutes);

app.use('/datos', cargaDatosRoutes);


module.exports = app