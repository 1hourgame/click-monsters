// Phaser Retro Wave Racing Game
import Phaser from "phaser";
import { MainScene } from "./scenes/main";

const WIDTH = 480;
const HEIGHT = 640;

const COLORS = {
  background: 0x000000,
};

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: [MainScene],
  backgroundColor: COLORS.background,
  parent: "game",
};

const game = new Phaser.Game(config);
