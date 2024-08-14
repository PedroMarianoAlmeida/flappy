import React, { useEffect, useRef, useState } from 'react';
import './FlappyBirdGame.css';
import ModalGameOver from '../ModalGameOver/ModalGameOver';

const FlappyBirdGame = () => {
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(0); // Define o estado inicial como 0

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const jumpSoundBufferRef = useRef(null);
  const scoreSoundBufferRef = useRef(null);
  const loseSoundBufferRef = useRef(null);
  const startSoundBufferRef = useRef(null); 
  const [widthUser, setWidthUser ] = useState(window.innerWidth);

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
    const gravity = 0.5;
    const speed = 6.2;
    const size = [51, 36];
    const jump = -11.5;
    const cTenth = canvas.width / 10;

    let index = 0,
        bestScore = 0, 
        flight, 
        flyHeight, 
        currentScore = 0, 
        pipes;

    const pipeWidth = 78;
    const pipeGap = 270;
    const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

    const setup = () => {
      currentScore = 0;
      flight = jump;
      flyHeight = (canvas.height / 2) - (size[1] / 2);
      pipes = Array(3).fill().map((_, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
    };

    const render = () => {
      index++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

      if (gamePlaying) {
        pipes.forEach(pipe => {
          pipe[0] -= speed;
          ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
          ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

          if(pipe[0] <= -pipeWidth){
            currentScore++;
            bestScore = Math.max(bestScore, currentScore);
            pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];

            const source = audioContextRef.current.createBufferSource();
            source.buffer = scoreSoundBufferRef.current;
            source.connect(audioContextRef.current.destination);
            source.start();
          }
        
          if ([
            pipe[0] <= cTenth + size[0], 
            pipe[0] + pipeWidth >= cTenth, 
            pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
          ].every(elem => elem)) {
            setCurrentModal(currentScore); // Atualiza a pontuação antes de reiniciar o jogo
            setOpen(true); // Abre o modal
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
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
      } else {
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);
        ctx.fillText(`Best score : ${bestScore}`, 85, 245);
        ctx.fillText('Click to play', 90, 535);
        ctx.font = "bold 30px courier";
      }

      document.getElementById('bestScore').innerHTML = `Best: ${bestScore}`;
      document.getElementById('currentScore').innerHTML = `Current: ${currentScore}`;

      window.requestAnimationFrame(render);
    };

    setup();
    img.onload = render;

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

  useEffect(() => {
    setWidthUser(window.innerWidth);
  });

  return (
    <main>
      <ModalGameOver
        currentModal={currentModal} // Passa a pontuação para o modal
        open={open}
        setOpen={setOpen}
      />
      <canvas ref={canvasRef} width="431" height="768" style={{ border: '1px solid black' }}></canvas>
    </main>
  );
};

export default FlappyBirdGame;