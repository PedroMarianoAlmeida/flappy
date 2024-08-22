export const renderFloor = (canvas, ctx, sprites) =>{
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

    return floor
  }