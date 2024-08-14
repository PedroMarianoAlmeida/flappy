import React, { useState, useEffect } from 'react';
import './FlappyBirdHeader.css'; // Importa o CSS específico
import useConnect from '../../hooks/useConnect';
import Modal from '../Modal/Modal';
import ModalGameOver from '../ModalGameOver/ModalGameOver';
import { useTranslation } from 'react-i18next';

const FlappyBirdHeader = () => {
  const [open, setOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(false);
  const { t } = useTranslation();
  const { data, loading, error } = useConnect('Data'); // Substitua 'highscores' pelo nome da sua coleção
  const [widthUser, setWidthUser] = useState(window.innerWidth);

  // Atualiza o tamanho da tela quando a janela é redimensionada
  useEffect(() => {
    const handleResize = () => setWidthUser(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const OpenModalDesktop = () => setOpenDesktop(true);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <header>
      <h1>Floppy Bird</h1>
      <div className="score-container">
        <div id="bestScore">{t("Best")} : 0</div>
        <div id="currentScore">{t("Current")} : 0</div>
        {widthUser < 700 ? (
          <button onClick={openModal}>{t("Highscores")}</button>
        ) : (
          <button onClick={OpenModalDesktop}>{t("Highscores")}</button>
        )}
      </div>

      <Modal open={open} closeModal={closeModal} />
      <ModalGameOver open={openDesktop} status={"Rank"}  setOpenDesktop={setOpenDesktop}/>
    </header>
  );
};

export default FlappyBirdHeader;
