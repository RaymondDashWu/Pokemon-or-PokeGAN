import { AUTO, Game } from 'phaser';
import myScene, { version } from './myScene';

// Make the game fullscreen
var WIDTH = window.screen.availWidth * window.devicePixelRatio;
var HEIGHT = window.screen.availHeight * window.devicePixelRatio;

var config = {
    type: AUTO,
    parent: 'phaser-example',
    width: WIDTH,
    height: HEIGHT,
    scene: new myScene()
};

var game = new Game(config);

// function preload ()
// {
// }

// function create ()
// {


// }
