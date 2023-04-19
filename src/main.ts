import './style.css';
import './App';

/**
 * To make devtools working
 * TODO: find a way to make this only in development mode
 */
import * as PIXI from 'pixi.js';
(window as any).PIXI = PIXI;
