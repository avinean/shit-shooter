import { Application, Assets, Container, Sprite } from 'pixi.js';

export default async function Restart(app: Application, resolve: any) {
  const sceen = new Container();
  app.stage.addChild(sceen);

  const textures = await Assets.load(['restartBtn', 'cancelBtn'])

  const startBtn = new Sprite(textures.restartBtn);
  startBtn.x = app.renderer.width / 2 - startBtn.width / 2;
  startBtn.y = app.renderer.height / 2 - startBtn.height / 2 - 100;
  sceen.addChild(startBtn);

  startBtn.interactive = true;
  startBtn.cursor = 'pointer';
  startBtn.on('pointerdown', () => {
    resolve('Game');
  });

  const cancelBtn = new Sprite(textures.cancelBtn);
  cancelBtn.x = app.renderer.width / 2 - cancelBtn.width / 2;
  cancelBtn.y = app.renderer.height / 2 - cancelBtn.height / 2 + 100;
  sceen.addChild(cancelBtn);

  cancelBtn.interactive = true;
  cancelBtn.cursor = 'pointer';
  cancelBtn.on('pointerdown', () => {
    resolve('Main');
  });
  
  return {
    hide() {
      sceen.visible = false;
    },
    show() {
      sceen.visible = true;
    }
  }
}