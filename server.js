const app = require('./index')

const conectarDB = require('./config/mongo');

conectarDB();

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})