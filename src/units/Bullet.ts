import { Assets, Sprite } from 'pixi.js';

export default async function Bullet() {
  const textures = await Assets.load(['bullet'])
  const unit = new Sprite(textures.bullet)
  return {
    unit
  };
}