const express = require('express');
const cors = require('cors');
const sequelize = require('./bbdd');

// Routers
const preguntasRouter = require('./routers/preguntas.router');

// Config y Server
const app = express();

app.use(cors());

// Requerido para interpretar el body de los request como objetos JSON
app.use(express.json());
// Para tomar el valor del form
// app.use(express.urlencoded({ extended: true }));

// Logs

app.use("/api/preguntas/", preguntasRouter)

async function start() {
    const PORT = process.env.PORT || 3001;

    try {
        // Probar la conexión
        await sequelize.authenticate();

        console.log('Base de Datos conectada y sincronizada...');
    }
    catch (error) {
        console.error('Error en la conexión a la base de datos: ', error);
    }

    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}

start();

module.exports = app;
