import React, { useEffect, useState } from 'react';
import { GetById, shuffleArray } from '../services/preguntas.service';
import Welcome from './Welcome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Game = ({ array, posicion }) => {
    const [showBack, setShowBack] = useState(false);
    const [pregunta, setPregunta] = useState([])
    const [showNext, setShowNext] = useState(false)
    const [showAyuda, setShowAyuda] = useState(false); // Nuevo estado para mostrar la ayuda

    useEffect(() => {
        const consultarPregunta = async () => {
            try {
                const preg = await GetById(array[posicion]);
                const respuestas = [
                    preg.RespuestaCorrecta,
                    preg.RespuestaIncorrecta1,
                    preg.RespuestaIncorrecta2,
                    preg.RespuestaIncorrecta3,
                ];
                const respuestasDesordenadas = shuffleArray(respuestas);
                const preguntaData = {
                    ...preg,
                    respuestas: respuestasDesordenadas,
                    respondida: false
                };
                setPregunta(preguntaData);
            }
            catch (error) {
                console.error('Error al obtener las preguntas:', error);
            }
        };
        consultarPregunta();
    }, [array, posicion]);

    const toggleAyuda = () => {
        setShowAyuda((prevShowAyuda) => !prevShowAyuda);
    };

    const handleSeleccionarRespuesta = (respuesta) => {
        setPregunta((prevPregunta) => ({
            ...prevPregunta,
            respondida: true,
            respuestaSeleccionada: respuesta,
        }));
    };

    const handleContinuar = () => {
        if (array.length !== posicion + 1) {
            setShowNext(true)
        }
        else {
            handleBack()
        }
    };

    if (showNext) {
        return <Game array={array} posicion={posicion + 1} />;
    }

    const handleBack = () => {
        setShowBack(true)
    }

    if (showBack) {
        return <Welcome />
    }

    return (
        <>
            <button className="button button-back" onClick={handleBack}>&#60;</button>
            <div className="container-center">
                <div
                    key={posicion + 1}
                    className='question-card game'
                >
                    <div className='tooltip-container'>
                        <span className='help-icon'>
                            <FontAwesomeIcon icon={faCircleInfo} onClick={toggleAyuda} />
                        </span>
                        {showAyuda ? <div className='tooltip-text block'>{pregunta.Ayuda}</div> : ''}
                    </div>
                    <p className='title'>Pregunta {posicion + 1}</p>

                    <div className="question">
                        {pregunta.Pregunta}
                    </div>
                    <div className="answers">
                        {pregunta.respuestas &&
                            pregunta.respuestas.map((respuesta, index) => (
                                <li
                                    key={index}
                                    className={`answer ${pregunta.respondida ? respuesta === pregunta.RespuestaCorrecta ? 'correct' : 'incorrect' : ''}`}
                                    onClick={() => handleSeleccionarRespuesta(respuesta)}
                                    style={{ pointerEvents: pregunta.respondida ? 'none' : 'auto' }}

                                >
                                    {respuesta}
                                    {pregunta.respondida && respuesta === pregunta.respuestaSeleccionada && respuesta === pregunta.RespuestaCorrecta && <span className="icon correct-icon"><strong> ✓</strong></span>}
                                    {pregunta.respondida && respuesta === pregunta.respuestaSeleccionada && respuesta !== pregunta.RespuestaCorrecta && <span className="icon incorrect-icon"><strong> ✗</strong></span>}

                                </li>
                            ))}
                    </div>
                </div>
                {array.length === posicion + 1 ? (
                    <button className='button' onClick={handleContinuar} disabled={!pregunta.respondida}>Finalizar</button>
                ) : (
                    <button className='button' onClick={handleContinuar} disabled={!pregunta.respondida}>Continuar</button>
                )}
            </div>
        </>
    );
};

export default Game;
