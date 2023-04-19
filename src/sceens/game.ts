import { Application, Sprite, Container } from 'pixi.js';
import Hero from '../units/Hero';
import Bullet from '../units/Bullet';
import Antibullet from '../units/Antibullet';

export default async function Game(app: Application, resolve: any) {

  const sceen = new Container();
  app.stage.addChild(sceen);

  const bullets: { unit: Sprite }[] = [];
  const antibullets: { unit: Sprite }[] = [];

  const hero = await Hero(app);
  sceen.addChild(hero.unit);

  let shit: any = 0;

  async function shootAntihero() {
    clearTimeout(shit);
    shit = setTimeout(
      async () => {
        const antibullet = await Antibullet();
        antibullet.unit.x = app.renderer.width - antibullet.unit.width;
        antibullet.unit.y = Math.floor(Math.random() * (app.renderer.height - antibullet.unit.height));

        if (antibullet.unit.y < hero.unit.height / 2) {
          antibullet.unit.y = hero.unit.height / 2
        }
        else if (antibullet.unit.y > app.renderer.height - hero.unit.height / 2) {
          antibullet.unit.y = app.renderer.height - hero.unit.height / 2
        }

        sceen.addChild(antibullet.unit);
        antibullets.push(antibullet);
        shootAntihero()
      },
      Math.random() * 3000
    );
  }

  function handleHeroColision() {
    for (let antibullet of antibullets) {
      if (antibullet.unit.getBounds().intersects(hero.unit.getBounds())) {
          app.ticker.remove(watcher);
        resolve('Restart');
        break
      }
    }
  }

  function handleBulletColision() {
    const toDestroy: any = [];
    for (let bullet of bullets) {
      for (let antibullet of antibullets) {
        if (antibullet.unit.getBounds().intersects(bullet.unit.getBounds())) {
          if (!toDestroy.includes(antibullet)) toDestroy.push(antibullet);
          if (!toDestroy.includes(bullet)) toDestroy.push(bullet);
        }
      }
    }
    while (true) {
      const bullet = toDestroy.pop();
      if (!bullet) break;
      bullet.unit.destroy();
      const shot = new Audio('/assets/shot.mp3');
      shot.play();
      if (bullets.includes(bullet)) bullets.splice(bullets.indexOf(bullet), 1);
      if (antibullets.includes(bullet)) antibullets.splice(antibullets.indexOf(bullet), 1);
    }
  }

  function watcher() {
    for (let bullet of bullets) {
      bullet.unit.x += 4;
    }
    for (let antibullet of antibullets) {
      antibullet.unit.x -= 4;
    }
    handleBulletColision();
    handleHeroColision();
  }

  function show() {
    sceen.visible = true;
    app.ticker.add(watcher);
    
    shootAntihero();
  }

  function hide() {
    console.log('hide')
    sceen.visible = false;
    clearTimeout(shit);
    while (true) {
      const bullet = bullets.pop();
      console.log(bullet)
      if (!bullet) break;
      bullet.unit.destroy();
    }
    while (true) {
      const antibullet = antibullets.pop();
      console.log(antibullet)
      if (!antibullet) break;
      antibullet.unit.destroy();
    }
  }

  document.addEventListener('keydown', async (event) => {
    if (event.code === 'ArrowLeft') hero.left(true)
    if (event.code === 'ArrowRight') hero.right(true)
    if (event.code === 'ArrowUp') hero.up(true)
    if (event.code === 'ArrowDown') hero.down(true)

    if (event.code === 'Space') {
      const bullet = await Bullet();
      bullet.unit.x = hero.unit.x + hero.unit.width / 2;
      bullet.unit.y = hero.unit.y + hero.unit.height / 2;
      bullet.unit.rotation = hero.unit.rotation;
      sceen.addChild(bullet.unit);
      bullets.push(bullet);
      const fire = new Audio('/assets/fire.mp3');
      fire.play()
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') hero.left()
    if (event.code === 'ArrowRight') hero.right()
    if (event.code === 'ArrowUp') hero.up()
    if (event.code === 'ArrowDown') hero.down()
  });

  return {
    hide,
    show
  }
}