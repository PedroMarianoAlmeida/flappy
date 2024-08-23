import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import spriteSheet from '../assets/sheet.png';
import { renderBackground } from '../common/Background';
import { renderHomeScreen, renderMessageHomeScreen } from '../common/HomeScreen';
import { createMedal, renderButtons, renderMessageGamerOver, renderScoreboard, currentScore } from '../common/GameOver';
import { renderFloor } from '../common/Floor';
import { GameContext } from '../context/GameContext';
import { useTranslation } from 'react-i18next';
// áudios
import SomColison from '../sounds/soco.mp3';
import SoundPont from '../sounds/sfx_point.mp3';
import SoundWings from '../sounds/sfx_wing.mp3';
import SoubndSwooshing from '../sounds/sfx_swooshing.mp3';
import SoundBackground from '../sounds/Sound_Background.mp3';

const Game = () => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 431, height: 600 });
  const { t } = useTranslation();
  const sprites = new Image();
  sprites.src = spriteSheet;
  const navigate = useNavigate();
  const soundColision = new Audio(SomColison);
  const soundPont = new Audio(SoundPont);
  const soundWings = new Audio(SoundWings);
  const soubndSwooshing = new Audio(SoubndSwooshing);
  const soundBackground = useRef(new Audio(SoundBackground));

  // Configure o volume e o loop da música de fundo apenas uma vez
  useEffect(() => {
    const audio = soundBackground.current;
    audio.volume = 0.3;
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause(); // Pausa a música de fundo quando o componente é desmontado
    };
  }, []);

  const { setScore } = useContext(GameContext);

  // Objeto global para armazenar a pontuação
  const globalScores = {
    highScore: 0,
    currentScore: 0
  };
  let scorePassedPipes = 0; // Inicialização da pontuação
  let gameOver = false; // Flag para verificar se o jogo acabou

  useEffect(() => {
    let frames = 0;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const collision = (flappybird, floor) => {
      const flappybirdY = flappybird.y + flappybird.height;
      const floorY = floor.y;
      return flappybirdY >= floorY;
    };

    const newFlappyBird = () => {
      const wings = [
        { spriteX: 312, spriteY: 230 },
        { spriteX: 312, spriteY: 256 },
        { spriteX: 312, spriteY: 282 }
      ];

      return {
        spriteX: wings[0].spriteX,
        spriteY: wings[0].spriteY,
        width: 34,
        height: 24,
        x: (canvas.width - 34) / 2,
        y: 250,
        gravity: 0.25,
        speed: 0,
        jump: 4.6,
        rotation: 0,
        currentFrame: 0,
        updateCurrentFrame() {
          const frameInterval = 8;
          if (frames % frameInterval === 0) {
            this.currentFrame = (this.currentFrame + 1) % wings.length;
            this.spriteX = wings[this.currentFrame].spriteX;
            this.spriteY = wings[this.currentFrame].spriteY;
          }
        },
        draw() {
          this.updateCurrentFrame();
          ctx.save();
          ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
          ctx.rotate(this.rotation);
          ctx.drawImage(
            sprites,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
          );
          ctx.restore();
        },
        jumper() {
          soundWings.volume = 0.6;
          soundWings.play();
          this.speed = -this.jump;
        },
        update() {
          if (gameOver) return; // Não atualiza o flappybird se o jogo acabou
          if (collision(this, globais.floor)) {
            soundColision.play(); // Toca o som de colisão
            setScore(scorePassedPipes); // Envia a pontuação para o contexto
            gameOver = true; // Define a flag como verdadeira
            changeScreen(screens.gameOver);
            return;
          }
          this.speed += this.gravity;
          this.y += this.speed;

          if (this.speed < 0) {
            this.rotation = Math.max(this.rotation - 0.1, -0.4);
          } else {
            this.rotation = Math.min(this.rotation + 0.05, 0.5);
          }
        },
      };
    };

    const createPipes = () => {
      const pipes = {
        width: 51.5,
        height: 400,
        spacing: 80,
        floor: {
          spriteX: 502,
          spriteY: 0,
        },
        sky: {
          spriteX: 554,
          spriteY: 0,
        },
        pairs: [],
        draw() {
          this.pairs.forEach((pair) => {
            const yRandom = pair.y;
            const spacingPipes = 120;
            const pipeSkyX = pair.x;
            const pipeSkyY = yRandom;

            ctx.drawImage(
              sprites,
              this.sky.spriteX,
              this.sky.spriteY,
              this.width,
              this.height,
              pipeSkyX,
              pipeSkyY,
              this.width,
              this.height
            );

            const pipeFloorX = pair.x;
            const pipeFloorY = this.height + spacingPipes + yRandom;
            ctx.drawImage(
              sprites,
              this.floor.spriteX,
              this.floor.spriteY,
              this.width,
              this.height,
              pipeFloorX,
              pipeFloorY,
              this.width,
              this.height
            );

            pair.pipeSky = {
              x: pipeSkyX,
              y: pipeSkyY
            };
            pair.pipeFloor = {
              x: pipeFloorX,
              y: pipeFloorY
            };
          });
        },
        hasCollision(pair) {
          const flappyBird = globais.flappybird;
          const flappyBirdX = flappyBird.x;
          const flappyBirdY = flappyBird.y;
          const flappyBirdWidth = flappyBird.width;
          const flappyBirdHeight = flappyBird.height;

          return (
            flappyBirdX + flappyBirdWidth > pair.x &&
            flappyBirdX < pair.x + this.width &&
            (flappyBirdY < pair.pipeSky.y + this.height ||
              flappyBirdY + flappyBirdHeight > pair.pipeFloor.y)
          );
        },
        update() {
          if (gameOver) return; // Não atualiza os canos se o jogo acabou
          const passed100Frames = frames % 100 === 0;
          if (passed100Frames) {
            this.pairs.push({
              x: canvas.width,
              y: -150 * (Math.random() * (Math.random() * 2) + 1),
              passed: false,
              collisionDetected: false,
            });
          }
          this.pairs.forEach((pair, index) => {
            pair.x -= 2;

            if (this.hasCollision(pair)) {
              if (!pair.collisionDetected) {
                soundColision.play();
                pair.collisionDetected = true;
                setScore(scorePassedPipes);
                gameOver = true; // Define a flag como verdadeira
                changeScreen(screens.gameOver);
              }
            }

            if (pair.x + this.width < globais.flappybird.x && !pair.passed) {
              soundPont.play();
              scorePassedPipes += 1;
              pair.passed = true;
            }

            if (pair.x + this.width <= 0) {
              this.pairs.splice(index, 1);
            }
          });
        },
      };

      return pipes;
    };

    const createScore = () => {
      const scoreObj = {
        scores: scorePassedPipes,
        draw() {
          ctx.font = '35px "Press Start 2P"';
          ctx.strokeStyle = "black";
          ctx.lineWidth = 8;
          ctx.textAlign = "center";
          ctx.strokeText(`${this.scores}`, canvas.width / 2, (canvas.height - 470) /2);
          ctx.fillStyle = "white";
          ctx.fillText(`${this.scores}`, canvas.width / 2, (canvas.height - 470) / 2);
        },
        update() {
          this.scores = scorePassedPipes;
        }
      };
      return scoreObj;
    };

    const globais = {};
    let screenActive = {};

    const screens = {
      start: {
        initialize() {
          globais.background = renderBackground(canvas, ctx, sprites);
          globais.flappybird = newFlappyBird();
          globais.floor = renderFloor(canvas, ctx, sprites);
          globais.pipes = createPipes();
          globais.homeScreen = renderHomeScreen(canvas, ctx, sprites);
          globais.messageHomeScreen = renderMessageHomeScreen(canvas, ctx, sprites, globais.homeScreen);
          globais.score = createScore();
          scorePassedPipes = 0;
          gameOver = false; // Reseta o game over quando inicia um novo jogo
        },
        draw() {
          globais.background.draw();
          globais.flappybird.draw();
          globais.floor.draw();
          globais.homeScreen.draw();
          globais.messageHomeScreen.draw();
        },
        click() {
          soubndSwooshing.play();
          changeScreen(screens.game);
        },
        update() {
          globais.floor.update();
        },
      },
      game: {
        initialize() {
          globais.background = renderBackground(canvas, ctx, sprites);
          globais.floor = renderFloor(canvas, ctx, sprites);
          globais.pipes = createPipes();
          globais.flappybird = newFlappyBird();
          globais.score = createScore();
        },
        draw() {
          globais.background.draw();
          globais.pipes.draw();
          globais.floor.draw();
          globais.flappybird.draw();
          globais.score.draw();
        },
        click() {
          globais.flappybird.jumper();
        },
        update() {
          globais.pipes.update();
          globais.floor.update();
          globais.flappybird.update();
          globais.score.update();
        },
      },
      gameOver: {
        initialize() {
          globais.flappybird = newFlappyBird();
          globais.background = renderBackground(canvas, ctx, sprites);
          globais.floor = renderFloor(canvas, ctx, sprites);
          globais.messageGamerOver = renderMessageGamerOver(canvas, ctx, sprites);
          globais.renderButton = renderButtons(canvas, ctx, sprites, t);
          globais.scoreboard = renderScoreboard(canvas, ctx, sprites);
          globais.medal = createMedal(canvas, scorePassedPipes, ctx, sprites, t);
          globais.scoreGameOver = currentScore(canvas, ctx, scorePassedPipes, t);
          // Atualiza o high score global se a pontuação atual for maior
          if (scorePassedPipes > globalScores.highScore) {
            globalScores.highScore = scorePassedPipes;
          }
        },
        draw() {
          globais.background.draw();
          globais.floor.draw();
          globais.messageGamerOver.draw();
          globais.renderButton.buttonRestart.draw();
          globais.renderButton.buttonSaveScore.draw();
          globais.renderButton.buttonToShare.draw();
          globais.scoreboard.draw();
          globais.medal.draw();
          globais.scoreGameOver.draw();
        },
        update() {
          // Atualiza apenas o que for necessário
        },
        click(event) {
          const x = event.clientX - canvas.getBoundingClientRect().left;
          const y = event.clientY - canvas.getBoundingClientRect().top;

          if (globais.renderButton.buttonRestart.isClicked(x, y)) {
            changeScreen(screens.start);
          } else if (globais.renderButton.buttonSaveScore.isClicked(x, y)) {
            saveScore();
          } else if (globais.renderButton.buttonToShare.isClicked(x, y)) {
            shareScore();
          }
        },
      },
    };

    const saveScore = () => {
      navigate('/highscores', {
        state: { score: scorePassedPipes }
      });
    };

    const shareScore = () => {
      if (navigator.share) {
        navigator.share({
          title: 'Minha Pontuação no Flappy Bird',
          text: `Minha pontuação é ${scorePassedPipes}!`,
        }).catch(console.error);
      } else {
        alert(`Minha pontuação é ${scorePassedPipes}!`);
      }
    };

    const changeScreen = (screen) => {
      screenActive = screen;
      if (screenActive.initialize) {
        screenActive.initialize();
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      screenActive.draw();
      if (screenActive.update) {
        screenActive.update();
      }
      frames += 1;
      requestAnimationFrame(loop);
    };

    sprites.onload = () => {
      changeScreen(screens.start);
      loop();
    };

    canvas.addEventListener('click', (event) => {
      if (screenActive.click) {
        screenActive.click(event);
      }
    });

    return () => {
      soundBackground.current.pause(); // Pausa a música de fundo quando o componente é desmontado
    };
  }, [canvasSize, setScore]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="border-2 bg-[#70c5ce] "></canvas>
    </div>
  );
};

export default Game;
