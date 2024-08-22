export const renderMessageGamerOver = (canvas, ctx, sprites) => {
    const messageGamerOver = {
        spriteX: 118,
        spriteY: 272,
        width: 188,
        height: 38,
        x: (canvas.width - 188) / 2,
        y: 20, // Ajuste a posição vertical da mensagem
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
}

export const renderButtons = (canvas, ctx) => {
    const buttonWidth = 90; // Largura do botão
    const buttonHeight = 15; // Altura do botão
    const borderWidth1 = 4; // Largura da primeira borda
    const borderWidth2 = 2; // Largura da segunda borda
    const borderColor1 = '#553000ff'; // Cor da primeira borda
    const borderColor2 = '#fff'; // Cor da segunda borda
    const buttonPadding = 10; // Espaço entre os botões

    // Botão "Jogar Novamente"
    const buttonRestart = {
        x: (canvas.width - (buttonWidth * 2 + buttonPadding)) / 2, // Centraliza o botão à esquerda
        y: (canvas.height - buttonHeight) / 2 + 30, // Ajusta a posição vertical
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
            ctx.font = '6px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Play again', this.x + this.width / 2, this.y + this.height / 2);
        },
        isClicked(x, y) {
            return x >= this.x && x <= this.x + this.width &&
                   y >= this.y && y <= this.y + this.height;
        }
    };

    // Botão "Salvar Pontuação"
    const buttonSaveScore = {
        x: buttonRestart.x + buttonWidth + buttonPadding, // Posiciona o botão à direita do primeiro botão
        y: (canvas.height - buttonHeight) / 2 + 30, // Ajusta a posição vertical
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
            ctx.font = '6px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Save Score', this.x + this.width / 2, this.y + this.height / 2);
        },
        isClicked(x, y) {
            return x >= this.x && x <= this.x + this.width &&
                   y >= this.y && y <= this.y + this.height;
        }
    };

    // Botão "Compartilhar"
    const buttonToShare = {
        x: (canvas.width - (buttonWidth * 2 + buttonPadding)) / 2, // Centraliza o botão abaixo dos dois anteriores
        y: (canvas.height - buttonHeight) / 2 + buttonHeight + buttonPadding * 2 + 30, // Posiciona abaixo dos dois botões
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
            ctx.font = '6px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('To share', this.x + this.width / 2, this.y + this.height / 2);
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
            // Adicione aqui a lógica para o botão "Play again"
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