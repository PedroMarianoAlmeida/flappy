import React from 'react';
import './App.css'; // Importa o CSS global
import FlappyBirdHeader from './components/FlappyBirdHeader/FlappyBirdHeader';
import FlappyBirdGame from './components/FlappyBirdGame/FlappyBirdGame';
const App = () => {
  return (
    <>
      <FlappyBirdHeader />
      <FlappyBirdGame />
    </>
  );
};

export default App;
