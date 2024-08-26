const languageBrowser = (navigator.language || navigator.userLanguage).toLowerCase();
export const renderMessageGamerOver = (canvas, ctx, sprites) => {
    const messageGamerOver = {
        spriteX: 118,
        spriteY: 272,
        width: 188,
        height: 38,
        x: (canvas.width - 188) / 2, // Centraliza a mensagem
        y: canvas.height / 4, // Coloca a mensagem no topo
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
    return messageGamerOver;
};

export const renderButtons = (canvas, ctx) => {
    const buttonWidth = 170; // Largura do botão
    const buttonHeight = 25; // Altura do botão
    const borderWidth1 = 4; // Largura da primeira borda
    const borderWidth2 = 2; // Largura da segunda borda
    const borderColor1 = '#553000ff'; // Cor da primeira borda
    const borderColor2 = '#fff'; // Cor da segunda borda
    const buttonPadding = 10; // Espaço entre os botões
    const scoreboardHeight = 116; // Altura do placar
    const spacingFromScoreboard = 20; // Espaço entre o placar e os botões
    const fontSizeButton = '10px "Press Start 2P"';
    // Botão "Jogar Novamente"
    const buttonRestart = {
        x: (canvas.width - (buttonWidth * 2 + buttonPadding)) / 2, // Centraliza o botão à esquerda
        y: (canvas.height - buttonHeight) / 2 + scoreboardHeight / 2 + spacingFromScoreboard, // Ajusta a posição vertical abaixo do placar
        width: buttonWidth,
        height: buttonHeight,
        draw() {
            // Desenha a primeira borda
            ctx.strokeStyle = borderColor1; // Cor da primeira borda
            ctx.lineWidth = borderWidth1; // Largura da primeira borda
            ctx.strokeRect(this.x - borderWidth1, this.y - borderWidth1, this.width + borderWidth1 * 2, this.height + borderWidth1 * 2);

            // Desenha a segunda borda
            ctx.strokeStyle = borderColor2; // Cor da segunda borda
            ctx.lineWidth = borderWidth2; // Largura da segunda borda
            ctx.strokeRect(this.x - borderWidth2, this.y - borderWidth2, this.width + borderWidth2 * 2, this.height + borderWidth2 * 2);

            // Desenha o botão
            ctx.fillStyle = '#e86100ff'; // Cor do botão
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Adiciona o texto
            ctx.fillStyle = 'white'; // Cor do texto
            ctx.font = fontSizeButton;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText( languageBrowser === "pt-br" ? "Jogar Novamente": 'Play again', this.x + this.width / 2, this.y + this.height / 2);
        },
        isClicked(x, y) {
            return x >= this.x && x <= this.x + this.width &&
                   y >= this.y && y <= this.y + this.height;
        }
    };

    // Botão "Salvar Pontuação"
    const buttonSaveScore = {
        x: buttonRestart.x + buttonWidth + buttonPadding, // Posiciona o botão à direita do primeiro botão
        y: (canvas.height - buttonHeight) / 2 + scoreboardHeight / 2 + spacingFromScoreboard, // Ajusta a posição vertical abaixo do placar
        width: buttonWidth,
        height: buttonHeight,
        draw() {
            // Desenha a primeira borda
            ctx.strokeStyle = borderColor1; // Cor da primeira borda
            ctx.lineWidth = borderWidth1; // Largura da primeira borda
            ctx.strokeRect(this.x - borderWidth1, this.y - borderWidth1, this.width + borderWidth1 * 2, this.height + borderWidth1 * 2);

            // Desenha a segunda borda
            ctx.strokeStyle = borderColor2; // Cor da segunda borda
            ctx.lineWidth = borderWidth2; // Largura da segunda borda
            ctx.strokeRect(this.x - borderWidth2, this.y - borderWidth2, this.width + borderWidth2 * 2, this.height + borderWidth2 * 2);

            // Desenha o botão
            ctx.fillStyle = '#e86100ff'; // Cor do botão
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Adiciona o texto
            ctx.fillStyle = 'white'; // Cor do texto
            ctx.font = fontSizeButton;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(languageBrowser === "pt-br" ? "Salvar Pontuação": 'Save Score', this.x + this.width / 2, this.y + this.height / 2);
        },
        isClicked(x, y) {
            return x >= this.x && x <= this.x + this.width &&
                   y >= this.y && y <= this.y + this.height;
        }
    };

    // Botão "Compartilhar"
    const buttonToShare = {
        x: (canvas.width - (buttonWidth * 2 + buttonPadding)) / 2, // Centraliza o botão abaixo dos dois anteriores
        y: buttonRestart.y + buttonHeight + buttonPadding * 2, // Posiciona abaixo dos dois botões
        width: buttonWidth * 2 + buttonPadding, // Largura igual à soma dos dois botões
        height: buttonHeight,
        draw() {
            // Desenha a primeira borda
            ctx.strokeStyle = borderColor1; // Cor da primeira borda
            ctx.lineWidth = borderWidth1; // Largura da primeira borda
            ctx.strokeRect(this.x - borderWidth1, this.y - borderWidth1, this.width + borderWidth1 * 2, this.height + borderWidth1 * 2);

            // Desenha a segunda borda
            ctx.strokeStyle = borderColor2; // Cor da segunda borda
            ctx.lineWidth = borderWidth2; // Largura da segunda borda
            ctx.strokeRect(this.x - borderWidth2, this.y - borderWidth2, this.width + borderWidth2 * 2, this.height + borderWidth2 * 2);

            // Desenha o botão
            ctx.fillStyle = '#e86100ff'; // Cor do botão
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Adiciona o texto
            ctx.fillStyle = 'white'; // Cor do texto
            ctx.font = fontSizeButton;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(languageBrowser === "pt-br" ? "Compartilhar": 'Share', this.x + this.width / 2, this.y + this.height / 2);
        },
        isClicked(x, y) {
            return x >= this.x && x <= this.x + this.width &&
                   y >= this.y && y <= this.y + this.height;
        }
    };

    // Função para lidar com o clique no canvas
    const handleClick = (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (buttonRestart.isClicked(x, y)) {
            console.log('Botão "Play again" clicado!');
            
        } else if (buttonSaveScore.isClicked(x, y)) {
            console.log('Botão "Save Score" clicado!');
            // Adicione aqui a lógica para o botão "Save Score"
        } else if (buttonToShare.isClicked(x, y)) {
            console.log('Botão "To share" clicado!');
            // Adicione aqui a lógica para o botão "To share"
        }
    };

    // Adiciona o ouvinte de clique ao canvas
    canvas.addEventListener('click', handleClick);

    return { buttonRestart, buttonSaveScore, buttonToShare };
};

export const renderScoreboard = (canvas, ctx, sprites) => {
    const scoreboard = {
        spriteX: 276,
        spriteY: 112,
        width: 226,
        height: 116,
        x: (canvas.width - 226) / 2, // Centraliza o placar
        y: canvas.height / 3, // Posiciona abaixo da mensagem de "Game Over"
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
    return scoreboard;
};


export const renderMedal = (canvas, ctx, sprites) => {
    const medal = {
        type:[
            {name:"Platinum", spriteX:348, spriteY:228},
            {name: "Silver", spriteX:396, spriteY:228},
            {name:"Bronze",spriteX:396, spriteY:273},
            {name:"Gold",spriteX: 348, spriteY:273}
        ],
        width: 44,
        height: 44,
        x: (canvas.width - 226) / 2, // Centraliza o placar
        y: canvas.height / 3, // Posiciona abaixo da mensagem de "Game Over"
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

        updateCurrent(){

        }
    };
    return medal;
}

export const createMedal = (canvas, scorePassedPipes, ctx, sprites) => {
    const medal = {
      type: [
        { name: "Bronze", spriteX: 396, spriteY: 273 },
        { name: "Silver", spriteX: 396, spriteY: 228 },
        { name: "Gold", spriteX: 348, spriteY: 273 },
        { name: "Platinum", spriteX: 348, spriteY: 228 },
      ],
      width: 44,
      height: 44,
      
      x: canvas.width * 0.35 - 22, 
      y: canvas.height * 0.44 - 22, 
      
      draw() {
        const index = Math.min(Math.floor(scorePassedPipes / 10), this.type.length - 1); // Define o tipo de medalha
        const { spriteX, spriteY } = this.type[index];
        ctx.drawImage(
          sprites,
          spriteX,
          spriteY,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      },
    };
    return medal;
  };
  
  export const currentScore = (canvas, ctx, bestScore) => {
    const currentScoreDisplay = {
      width: 188,
      height: 38,
      x: canvas.width * 0.5 - 20, 
      y: canvas.height * 0.37,     
      
      draw() {
        ctx.font = 'bold 15px "Press Start 2P"'; 
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle'; 
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeText(bestScore, this.x + 94, this.y + 19);
        
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillText(bestScore, this.x + 94, this.y + 19);
      }
    };
  
    return currentScoreDisplay;
  };
  
  export const bestScore = (canvas, ctx, score) => {
    const bestScoreDisplay = {
      width: 188,
      height: 38,
      x: canvas.width * 0.5 - 20, // Centralizado horizontalmente
      y: canvas.height * 0.44,     // 40% da altura do canvas
      
      draw() {
        ctx.font = 'bold 15px "Press Start 2P"'; 
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle'; 
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeText(score, this.x + 94, this.y + 19);
        
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillText(score, this.x + 94, this.y + 19);
      }
    };
  
    return bestScoreDisplay;
  };
  