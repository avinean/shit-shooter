import { AnimatedSprite, Assets, Rectangle, Application } from 'pixi.js';

export default async function Hero(app: Application) {
  const textures = await Assets.load(['unit'])
  
  const texture = textures.unit.clone();
  const texture2 = textures.unit.clone();
  const texture3 = textures.unit.clone();

  const cropRect = new Rectangle(0, 0, 119, 181);
  texture.frame = cropRect;    
  const cropRect2 = new Rectangle(119, 0, 119, 181);
  texture2.frame = cropRect2;    
  const cropRect3 = new Rectangle(238, 0, 119, 181);
  texture3.frame = cropRect3;

  const walkingFrames = [texture, texture2, texture3];
  const walkingUnit = new AnimatedSprite(walkingFrames);
  walkingUnit.animationSpeed = 0.1;

  let isMoving = false;
  let dX = 0;
  let dY = 0;

  function move() {
    if (isMoving) return;
    isMoving = true;
    walkingUnit.play();
    start()
  }

  function start() {
    if (dX || dY) {
      requestAnimationFrame(() => {
        const newX = walkingUnit.x + dX;
        const newY = walkingUnit.y + dY;
        if (newX >= 0 && newX <= app.screen.width - walkingUnit.width) {
          walkingUnit.x = newX;
        }
        if (newY >= 0 && newY <= app.screen.height - walkingUnit.height) {
          walkingUnit.y = newY;
        }
        start();
      });
    } else {
      stop();
    }
  }

  function stop() {
    isMoving = false;
    walkingUnit.gotoAndStop(0);
  }
  
  return {
    unit: walkingUnit,
    left(isStart?: boolean) {
      if (isStart) {
        dX = -4;
        move()
      } else {
        if (dX < 0) dX = 0;
      }
    },
    right(isStart?: boolean) {
      if (isStart) {
        dX = 4;
        move()
      } else {
        if (dX > 0) dX = 0;
      }
    },
    up(isStart?: boolean) {
      if (isStart) {
        dY = -4;
        move()
      } else {
        if (dY < 0) dY = 0;
      }
    },
    down(isStart?: boolean) {
      if (isStart) {
        dY = 4;
        move()
      } else {
        if (dY > 0) dY = 0;
      }
    }
  };
}
