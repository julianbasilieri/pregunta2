const { ValidationError } = require("sequelize");
const sequelize = require("../bbdd");

const atributos = [
    "IdPregunta",
    "Pregunta",
    "RespuestaCorrecta",
    "RespuestaIncorrecta1",
    "RespuestaIncorrecta2",
    "RespuestaIncorrecta3",
    "Ayuda"
]

const getAllPreguntas = async () => {
    const res = await sequelize.models.Preguntas.findAll({
        attributes: atributos,
        order: [["IdPregunta", "ASC"]]
    })
    return res
}

const getPreguntaById = async (id) => {
    const res = await sequelize.models.Preguntas.findOne({
        attributes: atributos,
        where: { IdPregunta: id }
    })
    if (res == null)
        return { message: `No se encontro ninguna pregunta con el id: ${id}` }
    else
        return res
}

const insertPregunta = async (pregunta) => {
    try {
        const res = await sequelize.models.Preguntas.create({
            Pregunta: pregunta.Pregunta,
            RespuestaCorrecta: pregunta.RespuestaCorrecta,
            RespuestaIncorrecta1: pregunta.RespuestaIncorrecta1,
            RespuestaIncorrecta2: pregunta.RespuestaIncorrecta2,
            RespuestaIncorrecta3: pregunta.RespuestaIncorrecta3,
            Ayuda: pregunta.Ayuda
        })
        return res
    }
    catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        }
        else {
            throw err
        }
    }
}

const deletePregunta = async (id) => {
    try {
        const res = await sequelize.models.Preguntas.destroy({
            where: { IdPregunta: id }
        })
        if (res == 1)
            return { message: `Se elimino correctamente la pregunta con el id: ${id}` }
        else
            return { message: `No se encontro ninguna pregunta con el id: ${id}` }
    }
    catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        }
        else {
            throw err
        }
    }
}

const updatePregunta = async (pregunta) => {
    try {
        const res = await sequelize.models.Preguntas.update({
            Pregunta: pregunta.Pregunta,
            RespuestaCorrecta: pregunta.RespuestaCorrecta,
            RespuestaIncorrecta1: pregunta.RespuestaIncorrecta1,
            RespuestaIncorrecta2: pregunta.RespuestaIncorrecta2,
            RespuestaIncorrecta3: pregunta.RespuestaIncorrecta3,
            Ayuda: pregunta.Ayuda
        },
            { where: { IdPregunta: pregunta.IdPregunta } }
        )
        if (res == 1)
            return { message: `Se modifico correctamente la pregunta con el id: ${pregunta.IdPregunta}` }
        else
            return { message: `No se encontro ninguna pregunta con el id: ${pregunta.IdPregunta}` }
    }
    catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        }
        else {
            throw err
        }
    }
}

const preguntasServices = {
    getAllPreguntas,
    getPreguntaById,
    insertPregunta,
    deletePregunta,
    updatePregunta
}

module.exports = preguntasServices