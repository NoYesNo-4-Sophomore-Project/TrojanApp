class castle extends Phaser.Scene {
    constructor () {
        super('');
    }

    preload () {
        this.load.image('sky', '../assets/sky.png');
        this.load.spritesheet('Minotaur','assets/Minotaur.png', {framewidth: 95, frameheight: 85});
    }

    create () {
        this.add.image(400, 300, 'sky');
    }

    update () {

    }
}