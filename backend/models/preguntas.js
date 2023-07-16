const { DataTypes } = require('sequelize')

const PreguntasAtributos = {
    IdPregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Pregunta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La pregunta es necesaria"
            }
        }
    },
    RespuestaCorrecta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La respuesta es necesaria"
            }
        }
    },
    RespuestaIncorrecta1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La respuesta es necesaria"
            }
        }
    },
    RespuestaIncorrecta2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La respuesta es necesaria"
            }
        }
    },
    RespuestaIncorrecta3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La respuesta es necesaria"
            }
        }
    },
    Ayuda: {
        type: DataTypes.STRING
    }
}

const PreguntasOpciones = {
    timestamps: false
}

const PreguntasModel = {
    PreguntasAtributos,
    PreguntasOpciones
}

module.exports = PreguntasModel