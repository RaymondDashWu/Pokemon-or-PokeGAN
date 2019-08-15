import quizScene1 from "./quizScene1";
import Phaser, { CANVAS, Scale } from "phaser";

// Make the game fullscreen
var WIDTH = window.document.body.clientWidth * window.devicePixelRatio;
var HEIGHT = window.document.body.clientHeight * window.devicePixelRatio - 70;

const config = {
  type: CANVAS,
  scale: {
    // mode: Phaser.Scale.FIT,
    parent: "phaser-game",
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: WIDTH,
    height: HEIGHT
  },
  scene: new quizScene1()
};

export { config };
