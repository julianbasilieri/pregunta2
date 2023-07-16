import React, { useEffect, useState } from 'react';
import { Delete, GetAll, shuffleArray } from '../services/preguntas.service.js';
import Welcome from './Welcome.jsx';
import AgregarPregunta from './AgregarPregunta.jsx';
import ModificarPregunta from './ModificarPregunta.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Preguntas = () => {
    const [preguntas, setPreguntas] = useState([])
    const [showBack, setShowBack] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

    useEffect(() => {
        const consultarPreguntas = async () => {
            try {
                const response = await GetAll();
                const preguntasData = response.map((pregunta) => {
                    const respuestas = [
                        pregunta.RespuestaCorrecta,
                        pregunta.RespuestaIncorrecta1,
                        pregunta.RespuestaIncorrecta2,
                        pregunta.RespuestaIncorrecta3,
                    ];
                    const respuestasDesordenadas = shuffleArray(respuestas);
                    return {
                        ...pregunta,
                        respuestas: respuestasDesordenadas,
                        mostrarRespuestas: false,
                    };
                });
                setPreguntas(preguntasData);
            } catch (error) {
                alert('Error al obtener las preguntas:', error);
                handleBack()
            }
        };
        consultarPreguntas();
    }, []);

    const handleToggleRespuestas = (id) => {
        setPreguntas((prevPreguntas) =>
            prevPreguntas.map((pregunta) => {
                if (pregunta.IdPregunta === id) {
                    return { ...pregunta, mostrarRespuestas: !pregunta.mostrarRespuestas };
                }
                return pregunta;
            })
        );
    };

    const handleHideRespuestas = (event) => {
        event.stopPropagation();
    };

    const handleBack = () => {
        setShowBack(true)
    }

    if (showBack) {
        return <Welcome />
    }

    const handleAddPregunta = () => {
        setShowAdd(true)
    }

    if (showAdd) {
        return <AgregarPregunta />
    }

    const handleEditPregunta = (event, id) => {
        event.stopPropagation();
        const pregunta = preguntas.find((pregunta) => pregunta.IdPregunta === id);
        setPreguntaSeleccionada(pregunta);
        setShowEdit(true)
    }

    if (showEdit) {
        return <ModificarPregunta pregunta={preguntaSeleccionada} />;
    }

    const handleDeletePregunta = (event, id) => {
        event.stopPropagation();
        const pregunta = preguntas.find((pregunta) => pregunta.IdPregunta === id);
        setPreguntaSeleccionada(pregunta);
        // Delete(id)
        const nuevasPreguntas = preguntas.filter((pregunta) => pregunta.IdPregunta !== id);
        setPreguntas(nuevasPreguntas);
    };

    return (
        <>
            <button className="button button-back" onClick={handleBack}>&#60;</button>
            <div className="container">
                <h2 className="title">Preguntas</h2>
                <div className="preguntas-list">
                    <button className="button button-add" onClick={handleAddPregunta}>
                        +
                    </button>
                    {preguntas.map((pregunta) => (
                        <div
                            key={pregunta.IdPregunta}
                            onClick={() => handleToggleRespuestas(pregunta.IdPregunta)}
                            className={`question-card ${pregunta.mostrarRespuestas ? 'expanded' : ''}`}
                        >
                            <div className="question">
                                {pregunta.IdPregunta}. {pregunta.Pregunta}
                                <div className='question-help'>
                                    <div className='tooltip-container' onClick={handleHideRespuestas}>
                                        <span className='help-icon'>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </span>
                                        <div className='tooltip-text'>{pregunta.Ayuda}</div>
                                    </div>
                                    <div className='question-buttons'>
                                        <button
                                            className="button edit-button"
                                            onClick={(event) => handleEditPregunta(event, pregunta.IdPregunta)}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className="button delete-button"
                                            onClick={(event) => handleDeletePregunta(event, pregunta.IdPregunta)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {pregunta.mostrarRespuestas && (
                                <div className="answers">
                                    {pregunta.respuestas.map((respuesta, index) => (
                                        <li
                                            key={index}
                                            className={`answer ${respuesta === pregunta.RespuestaCorrecta ? 'correct' : 'incorrect'}`}
                                        >
                                            {respuesta}
                                        </li>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Preguntas;
