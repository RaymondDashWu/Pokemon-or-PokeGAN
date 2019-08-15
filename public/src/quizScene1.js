import { Scene } from 'phaser';

// Taken from 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex > 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Will be used to scale assets and make it responsive
const WIDTH = screen.width;
const HEIGHT = screen.height;


class quizScene1 extends Scene {
    constructor() {
        super('quiz');
        this.score = 0;
        this.gan = ['gan1', 'gan2', 'gan3', 'gan4', 'gan5'];
        this.pokemon = ['pokemon1', 'pokemon2', 'pokemon3', 'pokemon4', 'pokemon5']
     }

    preload() {
        // Kept this redundancy because I couldn't remember the names of most of the Pokemon
        this.load.image('pokemon1', 'assets/299Nosepass.png');
        this.load.image('pokemon2', 'assets/gulpin.png');
        this.load.image('pokemon3', 'assets/618Stunfisk.png');
        this.load.image('pokemon4', 'assets/089Muk.png');
        this.load.image('pokemon5', 'assets/0-7903_pokemon-clipart-no-background-awesome-graphic-library-pokemon.png');
        
        // Loads all generated Pokemon
        for (let i = 1; i <= 5; i++) {
            this.load.image("gan" + i, "assets/gan" + i + ".png")
        }

        // loads particle effects when player gets correct choice
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        
        // Text assets init
        this.scoreText = this.add.text(WIDTH/100, HEIGHT/100, 'score: 0', { fontSize: '32px', fill: '#fff' });
        this.text = this.add.text(WIDTH/2, HEIGHT/20, "Which of these is a real Pokemon?", { fontSize: '48px', fill: '#fff' });
    }

    shufflePokemon() {
        // Picks a random Pokemon and generated Pokemon
        // Note: shuffle(this.pokemon).pop() works by shuffling the pokemon/gan array picking a pokemon/gan
        // and then popping it so it doens't get picked again.
        const randPokemon = shuffle(this.pokemon).pop()
        const randGan = shuffle(this.gan).pop()

        // Will be used to switch random position for the Pokemon and generated Pokemon
        const randPosition = [WIDTH*.75, WIDTH*2.5];
        
        // Note: shuffle(randPosition).pop() works by shuffling the location array determining left/right
        // position and then popping that position. What's left over is then called again so it'll pick remainder
        this.currentPokemon = this.add.image(shuffle(randPosition).pop(), 450, randPokemon);
        this.currentPokemon.setInteractive();
        this.currentPokemon.on('pointerdown', () => {
            // correctClick adds to score, creates particle effects, and then switches to new Pokemon
            this.correctClick(this.currentPokemon);
        });
        this.currentGan = this.add.image(shuffle(randPosition).pop(), 400, randGan);
        this.currentGan.setInteractive();
        // When picking a generated Pokemon (wrong choice) camera shakes and 
        // scene is moved on to next round
        this.currentGan.on('pointerdown', function () {
            this.cameras.main.shake(500, .005);
            this.currentPokemon.destroy();
            this.currentGan.destroy();
            this.create();
        }, this);
    }

    create() {   
        // Game over message
        if (this.pokemon.length <= 0) {
            // TODO. This should refresh the page on clicking text
            this.add.text(150, 400, "Thanks for playing! Click to play again.", { fontSize: 100 }).on('pointerdown', function() {
                console.log('reached');
                location.reload();
            });
        }

        this.shufflePokemon();

        this.tweens.add({
            targets: [this.currentPokemon, this.currentGan],
            y: 600,
            duration: 4000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        this.createParticles(); 
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
            on: false
          });
    }

    correctClick(image) {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        this.particles.emitParticleAt(image.x, image.y, 50);
        
        this.currentPokemon.destroy();
        this.currentGan.destroy();

        this.create();
    }
}

export default quizScene1;