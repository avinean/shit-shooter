import { Assets, Sprite } from 'pixi.js';

export default async function Antibullet() {
  const textures = await Assets.load(['bullet2'])
  const unit = new Sprite(textures.bullet2)
  return {
    unit
  };
}