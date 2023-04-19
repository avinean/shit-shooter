import { Application, Assets, Container, Sprite } from 'pixi.js';

export default async function Main(app: Application, resolve: any) {

  const sceen = new Container();
  app.stage.addChild(sceen);

  const texture = (await Assets.load(['startBtn'])).startBtn;
  const startBtn = new Sprite(texture);
  startBtn.x = app.renderer.width / 2 - startBtn.width / 2;
  startBtn.y = app.renderer.height / 2 - startBtn.height / 2;
  sceen.addChild(startBtn);

  startBtn.interactive = true;
  startBtn.cursor = 'pointer';
  startBtn.on('pointerdown', () => {
    resolve('Game');
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