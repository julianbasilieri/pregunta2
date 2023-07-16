const appExpress = require('express');
const sequelize = require('../bbdd');
const preguntasServices = require('../services/preguntas.service');

const preguntasRouter = appExpress.Router();

preguntasRouter.get('/', async (req, res) => {
    const data = await preguntasServices.getAllPreguntas();
    res.json(data);
});

preguntasRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const data = await preguntasServices.getPreguntaById(id);
    res.json(data);
});

preguntasRouter.post('/', async (req, res) => {
    const pregunta = req.body
    const data = await preguntasServices.insertPregunta(pregunta);
    res.json(data)
});

preguntasRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const data = await preguntasServices.deletePregunta(id);
    res.json(data)
})

preguntasRouter.put('/', async (req, res) => {
    const pregunta = req.body
    const data = await preguntasServices.updatePregunta(pregunta);
    res.json(data)
})

module.exports = preguntasRouter;
