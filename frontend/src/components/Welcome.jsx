import React, { useState } from 'react';
import Preguntas from './Preguntas';
import { GetAllId, shuffleArray } from '../services/preguntas.service';
import Game from './Game';

const Welcome = () => {
  const [showPreguntas, setShowPreguntas] = useState(false);
  const [showJuego, setShowJuego] = useState(false);
  const [arrayId, setArrayId] = useState([]);

  const handleStartGame = async () => {
    try {
      const arrayId = shuffleArray(await GetAllId())
      setArrayId(arrayId);
      setShowJuego(true);
    } catch (error) {
      alert('Error al obtener las preguntas:', error);
    }
    // Pasar el array y la posicion que se va a leer al componente
    // Entonces cuando llega le sumo uno y siempre va a leer el 
    // siguiente componente pero todos tienen el array con todos los id
  };

  if (showJuego) {
    return <Game array={arrayId} posicion={0} />;
  }

  const handleViewQuestions = () => {
    setShowPreguntas(true);
  };

  if (showPreguntas) {
    return <Preguntas />;
  }

  return (
    <div className="container-center">
      <h1 className="title">Bienvenido a Preguntados</h1>
      <button className='button' onClick={handleStartGame}>
        Iniciar juego
      </button>
      <button className='button' onClick={handleViewQuestions}>
        Preguntas
      </button>
    </div>
  );
};

export default Welcome;
