export const renderHomeScreen = (canvas, ctx, sprites) => {
    const homeScreen = {
        spriteX: 0,
        spriteY: 264,
        width: 117,
        height: 62,
        x: (canvas.width - 117) / 2,
        y: (canvas.height - (62 - 34)) / 2,
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
  
    return homeScreen;
}
export const renderMessageHomeScreen = (canvas, ctx, sprites, homeScreen) => {
    const messageHomeScreen = {
        spriteX: 118,
        spriteY: 310,
        width: 174,
        height: 44,
        x: (canvas.width - 174) / 2,
        y: ((canvas.height - homeScreen.y) + 20) / 2,
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
      return messageHomeScreen;
}
