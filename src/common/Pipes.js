export const createPipes = (frames, ctx, sprites, canvas, changeScreen, screens, scorePassedPipes, setScore, globais) => {
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
  
          // Debug: Imprime as posições dos canos
          console.log(`Cano do céu: ${pipeSkyX}, ${pipeSkyY}`);
          console.log(`Cano do chão: ${pipeFloorX}, ${pipeFloorY}`);
  
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
        // Verifica se é o momento de adicionar um novo par de canos
        const passed100Frames = frames % 100 === 0;
        if (passed100Frames) {
          this.pairs.push({
            x: canvas.width,
            y: -150 * (Math.random() * 2 + 1),  // Corrigido: Gera valores aleatórios para a altura dos canos
          });
        }
        this.pairs.forEach((pair, index) => {
          pair.x -= 2; // Move o par de canos para a esquerda
  
          // Verifica se há colisão
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
  
          // Remove o par de canos se estiver fora da tela
          if (pair.x + this.width <= 0) {
            this.pairs.splice(index, 1);
          }
        });
      },
    };
  
    return pipes;
};
