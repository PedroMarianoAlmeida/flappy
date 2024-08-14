import React, { useState } from 'react';
import './App.css'; // Importa o CSS global
import FlappyBirdHeader from './components/FlappyBirdHeader/FlappyBirdHeader';
import FlappyBirdGame from './components/FlappyBirdGame/FlappyBirdGame';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <FlappyBirdHeader t={t}/>
      <FlappyBirdGame />
    </>
  );
};

export default App;
