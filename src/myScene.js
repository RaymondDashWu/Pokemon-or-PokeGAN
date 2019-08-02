import { Scene } from 'phaser';

class myScene extends Scene {
    preload() {
        this.load.image('pokemon1', 'assets/nosepass-300x300.png');
        this.load.image('gan1', 'assets/download\ \(3\).png');
    }

    create() {
        const logo = this.add.image(400, 150, 'pokemon1');
        const logo2 = this.add.image(900, 150, 'gan1');

        this.text = this.add.text(500, 50, "Which of these is a real Pokemon?");

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        this.tweens.add({
            targets: logo2,
            y: 650,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    }
}

export default myScene;

const version = '0.0.1'

export { version }