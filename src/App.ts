import { Application, Assets } from 'pixi.js';
import Main from './sceens/main';
import Game from './sceens/game';
import Restart from './sceens/restart';

const app = new Application({
    background: '#fff',
    width: 1200,
    height: 900,
});

document.body.appendChild(app.view as unknown as Node);
(globalThis as any).__PIXI_APP__ = app;

Assets.add('unit', '/assets/unit.png')
Assets.add('bullet', '/assets/bullet.png')
Assets.add('bullet2', '/assets/bullet2.png')
Assets.add('startBtn', '/assets/start.png')
Assets.add('restartBtn', '/assets/restart.png')
Assets.add('cancelBtn', '/assets/cancel.png')

function initGame() {
    const screens = {
        Main,
        Game,
        Restart,
    }

    const instances: any = {}

    let activeScreen: keyof typeof screens;

    return async function run(screen: keyof typeof screens) {
        if (instances[activeScreen]) {
            instances[activeScreen].hide();
        }
        activeScreen = screen;
        if (!instances[screen]) {
            instances[screen] = await screens[screen](app, run);
        }

        instances[screen].show();
    }
}

initGame()('Main');