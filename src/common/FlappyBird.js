const collision = (flappybird, floor) => {
    const flappybirdY = flappybird.y + flappybird.height;
    const floorY = floor.y;
    return flappybirdY >= floorY;
  };

export const newFlappyBird = (canvas, ctx, sprites,  changeScreen, screens, globais, frames) => {
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
        if (frames % frameInterval !== 0) {
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
  
  }