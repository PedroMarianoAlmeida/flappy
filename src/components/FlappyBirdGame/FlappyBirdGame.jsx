import React, { useEffect, useRef, useState } from 'react';
import './FlappyBirdGame.css';
import ModalGameOver from '../ModalGameOver/ModalGameOver';
import { useTranslation } from 'react-i18next';

const FlappyBirdGame = () => {
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  const { t } = useTranslation();
  const languageBrowser = navigator.language || navigator.userLanguage;
  const positionScreen = languageBrowser === "pt-BR" ? 57 : 90;
  const positionScreenTwo = languageBrowser === "pt-BR" ? 70 : 85;

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const jumpSoundBufferRef = useRef(null);
  const scoreSoundBufferRef = useRef(null);
  const loseSoundBufferRef = useRef(null);
  const startSoundBufferRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    const loadSound = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return audioContextRef.current.decodeAudioData(arrayBuffer);
    };

    const setupSounds = async () => {
      jumpSoundBufferRef.current = await loadSound('/sounds/jump.mp3');
      scoreSoundBufferRef.current = await loadSound('/sounds/point.mp3');
      loseSoundBufferRef.current = await loadSound('/sounds/die.mp3');
      startSoundBufferRef.current = await loadSound('/sounds/swooshing.mp3');
    };

    setupSounds();

    let gamePlaying = false;
    const gravity = 0.7;
    const baseSpeed = 2.9; // Velocidade base
    const size = [51, 36];
    const jump = -9.5;
    const cTenth = canvas.width / 10;
    const pipeWidth = 78;
    const pipeGap = 200;

    let lastTime = 0;
    let index = 0;
    let bestScore = 0;
    let flight;
    let flyHeight;
    let currentScore = 0;
    let pipes;

    const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

    const setup = () => {
      currentScore = 0;
      flight = jump;
      flyHeight = (canvas.height / 2) - (size[1] / 2);
      pipes = Array(3).fill().map((_, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
    };

    const render = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      index++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Movimentação do fundo
      const offsetX = (index * (baseSpeed / 2)) % canvas.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -offsetX + canvas.width, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -offsetX, 0, canvas.width, canvas.height);

      if (gamePlaying) {
        pipes.forEach(pipe => {
          pipe[0] -= baseSpeed * (deltaTime / 16); // Ajusta a velocidade com base no tempo
          ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
          ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

          if (pipe[0] <= -pipeWidth) {
            currentScore++;
            bestScore = Math.max(bestScore, currentScore);
            pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];

            const source = audioContextRef.current.createBufferSource();
            source.buffer = scoreSoundBufferRef.current;
            source.connect(audioContextRef.current.destination);
            source.start();
          }

          if (pipe[0] <= cTenth + size[0] &&
              pipe[0] + pipeWidth >= cTenth &&
              (pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1])) {
            setCurrentModal(currentScore);
            setOpen(true);
            gamePlaying = false;
            setup();
            const loseSource = audioContextRef.current.createBufferSource();
            loseSource.buffer = loseSoundBufferRef.current;
            loseSource.connect(audioContextRef.current.destination);
            loseSource.start();
          }
        });
      }

      if (gamePlaying) {
        ctx.save();
        const angle = Math.min(Math.max(flight * 0.03, -Math.PI / 6), Math.PI / 3);
        ctx.translate(cTenth + size[0] / 2, flyHeight + size[1] / 2);
        ctx.rotate(angle);
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, -size[0] / 2, -size[1] / 2, ...size);
        ctx.restore();

        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
      } else {
        flyHeight = (canvas.height / 2) - (size[1] / 2);
        ctx.fillText(`${t("Best score")} : ${bestScore}`, positionScreenTwo, 245);
        ctx.fillText(`${t("Click to play")}`, positionScreen, 535);
        ctx.font = "bold 30px courier";
      }

      document.getElementById('bestScore').innerHTML = `${t("Best")}: ${bestScore}`;
      document.getElementById('currentScore').innerHTML = `${t("Current")}: ${currentScore}`;

      window.requestAnimationFrame(render);
    };

    setup();
    img.onload = () => window.requestAnimationFrame(render);

    const handleClick = () => {
      if (!gamePlaying) {
        gamePlaying = true;
        const startSource = audioContextRef.current.createBufferSource();
        startSource.buffer = startSoundBufferRef.current;
        startSource.connect(audioContextRef.current.destination);
        startSource.start();
      } else {
        flight = jump;
        const source = audioContextRef.current.createBufferSource();
        source.buffer = jumpSoundBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start();
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        if (!gamePlaying) {
          gamePlaying = true;
          const startSource = audioContextRef.current.createBufferSource();
          startSource.buffer = startSoundBufferRef.current;
          startSource.connect(audioContextRef.current.destination);
          startSource.start();
        } else {
          flight = jump;
          const source = audioContextRef.current.createBufferSource();
          source.buffer = jumpSoundBufferRef.current;
          source.connect(audioContextRef.current.destination);
          source.start();
        }
      }
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main>
      <ModalGameOver
        currentModal={currentModal}
        open={open}
        setOpen={setOpen}
      />
      <canvas ref={canvasRef} width="431" height="768" style={{ border: '1px solid black' }}></canvas>
    </main>
  );
};

export default FlappyBirdGame;
