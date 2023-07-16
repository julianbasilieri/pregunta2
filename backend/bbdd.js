const { Sequelize } = require('sequelize');
const PreguntasModel = require('./models/preguntas');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/databaseFile.db'
});

sequelize.define(
    "Preguntas",
    PreguntasModel.PreguntasAtributos,
    PreguntasModel.PreguntasOpciones
)

module.exports = sequelize;