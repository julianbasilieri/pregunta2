import axios from "axios"

export async function GetAll() {
    const res = await axios.get("http://localhost:3001/api/preguntas/")
    return res.data
}

export async function GetById(id) {
    const res = await axios.get(`http://localhost:3001/api/preguntas/${id}`)
    return res.data
}

export async function Insert(pregunta) {
    const res = await axios.post("http://localhost:3001/api/preguntas/", pregunta)
    return res.data
}

export async function Edit(pregunta) {
    const res = await axios.put("http://localhost:3001/api/preguntas/", pregunta)
    return res.data
}

export async function Delete(id) {
    const res = await axios.delete(`http://localhost:3001/api/preguntas/${id}`)
    return res.data
}

export async function GetAllId() {
    const preguntas = await GetAll()
    return preguntas.map(pregunta => pregunta.IdPregunta)
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};