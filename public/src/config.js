import quizScene1 from './quizScene1';
import { AUTO } from 'phaser';

// Make the game fullscreen
var WIDTH = window.screen.availWidth * window.devicePixelRatio;
var HEIGHT = window.screen.availHeight * window.devicePixelRatio;

// TODO add multiple scenes per quiz answer
// https://www.youtube.com/watch?v=S1VSKkL_ePM&list=PLoN_ejT35AEhY4icjiEJ5t2qdunwmQj1R&index=15

const config = {
    type: AUTO,
    parent: 'phaser-example',
    width: WIDTH,
    height: HEIGHT,
    scene: new quizScene1(),
};

export { config };