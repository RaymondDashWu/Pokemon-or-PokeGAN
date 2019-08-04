import { Scene } from 'phaser';

class quizScene1 extends Scene {
    constructor() {
        super()
        this.score = 0;
     }

    preload() {
        this.load.image('pokemon1', 'assets/nosepass-300x300.png');
        this.load.image('gan1', 'assets/download\ \(3\).png');
    }

    create() {
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        const logo = this.add.image(400, 350, 'pokemon1');
        const logo2 = this.add.image(900, 300, 'gan1');

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
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    }

    collectStar(player, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);    
    }
}

export default quizScene1;