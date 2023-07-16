import React, { useState } from 'react';
import Preguntas from './Preguntas';
import { Insert } from '../services/preguntas.service';

const AgregarPregunta = () => {
    const [Pregunta, setPregunta] = useState('');
    const [RespuestaCorrecta, setRespuestaCorrecta] = useState('');
    const [RespuestaIncorrecta1, setRespuestaIncorrecta1] = useState('');
    const [RespuestaIncorrecta2, setRespuestaIncorrecta2] = useState('');
    const [RespuestaIncorrecta3, setRespuestaIncorrecta3] = useState('');
    const [Ayuda, setAyuda] = useState('');
    const [showBack, setShowBack] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const preguntaData = {
            Pregunta,
            RespuestaCorrecta,
            RespuestaIncorrecta1,
            RespuestaIncorrecta2,
            RespuestaIncorrecta3,
            Ayuda
        };
        if (preguntaData.Pregunta[0] !== '¿') {
            preguntaData.Pregunta = '¿' + preguntaData.Pregunta
        }
        if (preguntaData.Pregunta[preguntaData.Pregunta.length - 1] !== '?') {
            preguntaData.Pregunta += '?'
        }
        Insert(preguntaData)
        // Reiniciar el formulario
        setPregunta('');
        setRespuestaCorrecta('');
        setRespuestaIncorrecta1('');
        setRespuestaIncorrecta2('');
        setRespuestaIncorrecta3('');
        setAyuda('');
    };

    const handleBack = () => {
        setShowBack(true)
    }

    if (showBack) {
        return <Preguntas />
    }

    const handleCancel = () => {
        handleBack()
    };

    return (
        <div className="container">
            <button className="button button-back" onClick={handleBack}>&#60;</button>
            <fieldset>
                <legend className="form-title"><strong>Insertar Pregunta</strong></legend>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="pregunta">Pregunta:</label>
                        <input
                            type="text"
                            id="pregunta"
                            value={Pregunta}
                            onChange={(event) => setPregunta(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuestaCorrecta">Respuesta Correcta:</label>
                        <input
                            type="text"
                            id="respuestaCorrecta"
                            value={RespuestaCorrecta}
                            onChange={(event) => setRespuestaCorrecta(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuestaIncorrecta1">
                            Respuesta Incorrecta 1:
                        </label>
                        <input
                            type="text"
                            id="respuestaIncorrecta1"
                            value={RespuestaIncorrecta1}
                            onChange={(event) => setRespuestaIncorrecta1(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuestaIncorrecta2">
                            Respuesta Incorrecta 2:
                        </label>
                        <input
                            type="text"
                            id="respuestaIncorrecta2"
                            value={RespuestaIncorrecta2}
                            onChange={(event) => setRespuestaIncorrecta2(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuestaIncorrecta3">
                            Respuesta Incorrecta 3:
                        </label>
                        <input
                            type="text"
                            id="respuestaIncorrecta3"
                            value={RespuestaIncorrecta3}
                            onChange={(event) => setRespuestaIncorrecta3(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ayuda">Ayuda:</label>
                        <input
                            type="text"
                            id="ayuda"
                            value={Ayuda}
                            onChange={(event) => setAyuda(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className='button'>Aceptar</button>
                        <button type="button" onClick={handleCancel} className='button'>Cancelar</button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
};

export default AgregarPregunta;
