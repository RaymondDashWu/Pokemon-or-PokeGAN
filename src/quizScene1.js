import { Scene } from 'phaser';

class quizScene1 extends Scene {
    constructor(pokeA, pokeB) {
        super('quiz');
        this.score = 0;
        this.gan = ['gan1', 'gan2', 'gan3', 'gan4', 'gan5'];
        this.pokemon = ['pokemon1', 'pokemon2', 'pokemon3', 'pokemon4', 'pokemon5']
        
        // TODO list that will be updated with the pokemon and gan that have been seen
        this.pokemonSeen = [];
        this.ganSeen = [];
     }

    preload() {
        this.load.image('pokemon1', 'assets/nosepass-300x300.png');
        this.load.image('pokemon2', 'assets/gulpin.png');
        this.load.image('pokemon3', 'assets/250px-618Stunfisk.png');
        this.load.image('pokemon4', 'assets/250px-089Muk.png');
        this.load.image('pokemon5', 'assets/0-7903_pokemon-clipart-no-background-awesome-graphic-library-pokemon.png');
        
        // Loads all generated Pokemon
        for (let i = 1; i <= 5; i++) {
            this.load.image("gan" + i, "assets/gan" + i + ".png")
        }

        // loads particle effects when player gets correct choice
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');

    }

    // TODO switch to different pokemon
    create() {        
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        // Picks a random Pokemon and generated Pokemon
        const randPokemon = this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
        const randGan = this.gan[Math.floor(Math.random() * this.gan.length)]

        // TODO switch random position
        const test = (400, 350, randPokemon);

        this.pokemon = this.add.image(400, 350, randPokemon);
        console.log("this.pokemon", this.pokemon)
        this.pokemon.setInteractive();
        this.pokemon.on('pointerdown', () => {
            this.correctClick(this.pokemon);
        });
        this.gan = this.add.image(900, 300, randGan);
        this.gan.setInteractive();
        // When picking a generated Pokemon (wrong choice) camera shakes
        this.gan.on('pointerdown', function () {
            this.cameras.main.shake(500, .005);
        }, this);


        this.text = this.add.text(500, 50, "Which of these is a real Pokemon?");

        this.tweens.add({
            targets: [this.pokemon, this.gan],
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // let render = this.pokemon1.add.graphics();
        // let bounds = this.getBounds();

        // render.lineStyle(3, 0xffff37);
        // render.strokeRectShape(bounds);
    }

    // Helper function to correctClick. When player chooses a Pokemon (correct answer)
    // particle effect is created
    createParticles() {
        this.particles = this.add.particles('flares');

        this.particles.createEmitter({
            frame: ['red', 'blue', 'green', 'yellow'],
            x: 400,
            y: 300,
            speed: 200,
            lifespan: 1500,
            blendMode: 'ADD',
          });
    }

    correctClick(image) {
        console.log("this.particles", this.particles)
        console.log("this.score", this.score)

        this.createParticles();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        this.emitParticleAt(image.x, image.y, 50);

    }
}

export default quizScene1;