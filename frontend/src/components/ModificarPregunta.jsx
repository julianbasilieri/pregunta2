import React, { useState } from 'react';
import Preguntas from './Preguntas';
import { Edit } from '../services/preguntas.service';

const ModificarPregunta = ({ pregunta }) => {
    const [IdPregunta, setIdPregunta] = useState(pregunta.IdPregunta);
    const [Pregunta, setPregunta] = useState(pregunta.Pregunta);
    const [RespuestaCorrecta, setRespuestaCorrecta] = useState(pregunta.RespuestaCorrecta);
    const [RespuestaIncorrecta1, setRespuestaIncorrecta1] = useState(pregunta.RespuestaIncorrecta1);
    const [RespuestaIncorrecta2, setRespuestaIncorrecta2] = useState(pregunta.RespuestaIncorrecta2);
    const [RespuestaIncorrecta3, setRespuestaIncorrecta3] = useState(pregunta.RespuestaIncorrecta3);
    const [Ayuda, setAyuda] = useState(pregunta.Ayuda);
    const [showBack, setShowBack] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const preguntaData = {
            IdPregunta,
            Pregunta,
            RespuestaCorrecta,
            RespuestaIncorrecta1,
            RespuestaIncorrecta2,
            RespuestaIncorrecta3,
            Ayuda
        };
        Edit(preguntaData)
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
        <div className="container-center">
            <button className="button button-back" onClick={handleBack}>&#60;</button>
            <fieldset>
                <legend className="form-title"><strong>Modificar Pregunta</strong></legend>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">Id Pregunta:</label>
                        <input
                            type="text"
                            id="id"
                            value={IdPregunta}
                            onChange={(event) => setIdPregunta(event.target.value)}
                            required
                            disabled
                        />
                    </div>
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
                        <button className='button' type="submit">Aceptar</button>
                        <button className='button' type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
};

export default ModificarPregunta;
