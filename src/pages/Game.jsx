import { useRef, useEffect, useState, useContext } from 'react';
import spriteSheet from '../assets/sheet.png';
import { FirebaseContext } from '../context/FirebaseContext';

const Game = () => {
  const { score, setScore } = useContext(FirebaseContext);
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 431, height: 600 });
  const sprites = new Image();
  sprites.src = spriteSheet;

  const collision = (flappybird, floor) => {
    const flappybirdY = flappybird.y + flappybird.height;
    const floorY = floor.y;
    return flappybirdY >= floorY;
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth < 431 ? window.innerWidth : 431;
      setCanvasSize({ width, height: 600 }); // Define a altura do canvas aqui
    };

    updateCanvasSize(); // Define o tamanho inicial do canvas

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    let frames = 0;
    let scorePassedPipes = 0; // Nova variável para contar os canos passados
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

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
        x: 50,
        y: 150,
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
          this.speed = -this.jump;
        },
        update() {
          if (collision(this, globais.floor)) {
            changeScreen(screens.start);
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

    const floor = {
      spriteX: 276,
      spriteY: 0,
      width: 224,
      height: 112,
      x: 0,
      y: canvas.height - 112,
      speed: 2,
      draw() {
        const repeatTimes = Math.ceil(canvas.width / this.width) + 1;
        for (let i = 0; i < repeatTimes; i++) {
          ctx.drawImage(
            sprites,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x + i * this.width,
            this.y,
            this.width,
            this.height
          );
        }
      },
      update() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
          this.x = 0;
        }
      },
    };

    const background = {
      spriteX: 0,
      spriteY: 24,
      width: 276,
      height: 204,
      x: 0,
      y: canvas.height - 112 - 204,
      draw() {
        ctx.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
        ctx.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.width,
          this.height,
          this.x + this.width,
          this.y,
          this.width,
          this.height
        );
      },
    };

    const homeScreen = {
      spriteX: 0,
      spriteY: 228,
      width: 117,
      height: 120,
      x: (canvas.width - 117) / 2,
      y: (canvas.height - 120) / 2,
      draw() {
        ctx.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      },
    };

    const messageHomeScreen = {
      spriteX: 118,
      spriteY: 310,
      width: 174,
      height: 44,
      x: (canvas.width - 174) / 2,
      y: ((canvas.height - homeScreen.y) - 44) / 2,
      draw() {
        ctx.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      },
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
    
            // Desenha o cano do céu
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
    
            // Desenha o cano do chão
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
    
          // Verifica se o Flappy Bird está dentro da largura e altura do cano
          if (flappyBirdX + flappyBirdWidth > pair.x &&
              flappyBirdX < pair.x + this.width &&
              (flappyBirdY < pair.pipeSky.y + this.height ||
               flappyBirdY + flappyBirdHeight > pair.pipeFloor.y)) {
            return true;
          }
    
          return false;
        },
    
        update() {
          const passed100Frames = frames % 100 === 0;
          if (passed100Frames) {
            this.pairs.push({
              x: canvas.width,
              y: -150 * (Math.random() * (Math.random() * 2.5) + 1),
            });
          }
          this.pairs.forEach((pair, index) => {
            pair.x -= 2;
    
            if (this.hasCollision(pair)) {
              console.log("Você Perdeu");
              changeScreen(screens.start);  // Encerra o jogo e volta para a tela inicial
            }
    
            // Verifica se o Flappy Bird passou o cano e incrementa o placar
            if (pair.x + this.width < globais.flappybird.x && !pair.passed) {
              scorePassedPipes += 1;
              setScore(scorePassedPipes); // Atualiza a pontuação no Firebase
              pair.passed = true; // Marca o cano como passado
            }
    
            if (pair.x + this.width <= 0) {
              this.pairs.splice(index, 1);
            }
          });
        },
      };
    
      return pipes;
    };

    const globais = {};

    const changeScreen = (newScreen) => {
      screenActive = newScreen;

      if (screenActive.initialize) {
        screenActive.initialize();
      }
    };

    const createScore = () => {
      const score = {
        scores: 0,
        draw() {
          ctx.font = '35px "Press Start 2P"';
          ctx.fillStyle = "white";
          ctx.textAlign = "right";
          ctx.fillText(`${this.scores}`, canvas.width - 35, 40);
        },
        update() {
          this.scores = scorePassedPipes;
        }
      };
      return score;
    };

    const screens = {
      start: {
        initialize() {
          globais.flappybird = newFlappyBird();
          globais.floor = floor;
          globais.background = background;
          globais.pipes = createPipes();
          globais.score = createScore(); // Inicializa o score
          scorePassedPipes = 0; // Reseta o número de canos passados
        },
        draw() {
          globais.background.draw();
          globais.floor.draw();
          globais.flappybird.draw();
          homeScreen.draw();
          messageHomeScreen.draw();
        },
        click() {
          changeScreen(screens.game);
        },
        update() {
          globais.floor.update();
        },
      },
      game: {
        initialize() {
          globais.score = createScore(); // Inicializa o score
        },
        draw() {
          globais.background.draw();
          globais.pipes.draw();
          globais.floor.draw();
          globais.flappybird.draw();
          globais.score.draw(); // Desenha o score
        },
        click() {
          globais.flappybird.jumper();
        },
        update() {
          globais.floor.update();
          globais.pipes.update();
          globais.flappybird.update();
          globais.score.update(); // Atualiza o score
        },
      },
    };

    let screenActive = screens.start;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      screenActive.draw();
      if (screenActive.update) {
        screenActive.update();
      }
      frames += 1;
      requestAnimationFrame(loop);
    };

    const handleClick = () => {
      if (screenActive.click) {
        screenActive.click();
      }
    };

    canvas.addEventListener('click', handleClick);

    sprites.onload = () => {
      changeScreen(screens.start);
      loop();
    };

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [canvasSize, setScore]); // Adicione 'canvasSize' e 'setScore' como dependências

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="border-2 bg-[#70c5ce] "></canvas>
    </div>
  );
};

export default Game;
