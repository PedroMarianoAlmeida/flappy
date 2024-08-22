export const renderBackground = (canvas, ctx, sprites) => {
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

    return background;
  }