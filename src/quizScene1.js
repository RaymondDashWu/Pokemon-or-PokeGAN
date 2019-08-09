import { Scene } from 'phaser';

// Taken from 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    const result = []
    while(array.length > 0) {
        const i = Math.floor(Math.random() * array.length)
        result.push(array[i])
        array.splice(i, 1)
    }
    console.log(result)
    return result

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
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

class quizScene1 extends Scene {
    constructor() {
        super('quiz');
        this.score = 0;
        this.gan = ['gan1', 'gan2', 'gan3', 'gan4', 'gan5'];
        this.pokemon = ['pokemon1', 'pokemon2', 'pokemon3', 'pokemon4', 'pokemon5']
        
        // list that will be updated with the pokemon and gan that have been seen
        // this.pokemonSeen = [];
        // this.ganSeen = [];

        this.shuffleArrays()
        console.log('11111111')
        console.log(this.shuffledPokemon)
     }

     shuffleArrays() {
        this.shuffledPokemon = shuffle(this.pokemon)
        this.shuffledGan = shuffle(this.gan)
     }

    preload() {
        // Kept this redundancy because I couldn't remember the names of most of the Pokemon
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

    createPokemon() {

        // Picks a random Pokemon and generated Pokemon
        // Note: shuffle(this.pokemon).pop() works by shuffling the pokemon/gan array picking a pokemon/gan
        // and then popping it so it doens't get picked again.
        if (this.shuffledPokemon.length === 0) {
            console.log('this.shuffledPokemon.length')
            this.shuffleArrays()
        }

        const randPokemon = this.shuffledPokemon.pop()
        const randGan = this.shuffledGan.pop()

        console.log('randPokemon', randPokemon)


        // const pi = Math.floor(Math.random() * this.pokemon.length)
        // const gi = Math.floor(Math.random() * this.gan.length)
        // const randPokemon = this.pokemon[pi]
        // const randGan = this.gan[gi].pop()

        console.log("randPokemon", randPokemon)
        console.log("randGan", randGan)


        // const randPokemon = this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
        // const randGan = this.gan[Math.floor(Math.random() * this.gan.length)]

        // Will be used to switch random position for the Pokemon and generated Pokemon
        const randPosition = [400, 900];
        
        // Note: shuffle(randPosition).pop() works by shuffling the location array determining left/right
        // position and then popping that position. What's left over is then called again so it'll pick remainder
        this.pokemon = this.add.image(randPokemon, 350, randPokemon);
        this.pokemon.setInteractive();
        this.pokemon.on('pointerdown', () => {
            this.correctClick(this.pokemon);
        });

        this.gan = this.add.image(shuffle(randPosition).pop(), 300, randGan);
        this.gan.setInteractive();
        // When picking a generated Pokemon (wrong choice) camera shakes
        this.gan.on('pointerdown', function () {
            this.cameras.main.shake(500, .005);
        }, this);
    }

    // TODO switch to different pokemon
    create() {   

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        this.createPokemon()

        this.text = this.add.text(500, 50, "Which of these is a real Pokemon?");

        this.tweens.add({
            targets: [this.pokemon, this.gan],
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });


        this.createParticles();
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
            on: false
          });
    }

    correctClick(image) {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        this.particles.emitParticleAt(image.x, image.y, 50);
        // this.pokemon.visible = false;
        // this.gan.visible = false;
        this.pokemon.destroy()
        this.gan.destroy()

        this.createPokemon()
    }
}

export default quizScene1;