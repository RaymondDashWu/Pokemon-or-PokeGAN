import quizScene1 from './quizScene1';
import Scale, { AUTO } from 'phaser';

// Make the game fullscreen
var WIDTH = window.screen.availWidth * window.devicePixelRatio;
var HEIGHT = (window.screen.availHeight * window.devicePixelRatio) / 2;

const config = {
    type: AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: WIDTH,
        height: HEIGHT,        
    },
    // parent: 'game',
    // width: WIDTH,
    // height: HEIGHT,
    scene: new quizScene1(),
};

export { config };