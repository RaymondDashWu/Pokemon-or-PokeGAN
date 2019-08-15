import quizScene1 from './quizScene1';
import Phaser, { AUTO, Scale } from 'phaser';



// Make the game fullscreen
var WIDTH = window.document.body.clientWidth * window.devicePixelRatio;
var HEIGHT = (window.document.body.clientHeight * window.devicePixelRatio) / 2;

const config = {
    type: AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: WIDTH,
        height: HEIGHT,        
    },
    scene: new quizScene1(),
};

export { config };