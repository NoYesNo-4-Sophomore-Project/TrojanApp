class castle extends Phaser.Scene {
    constructor () {
        super({key: 'castle'});
    }

    preload () {
        this.load.image('sky', '../assets/sky.png');
        this.load.spritesheet('Minotaur','assets/Minotaur.png', {frameWidth: 95, frameHeight: 85});
    }

    create () {
        this.add.image(400, 300, 'sky');
    }

    update () {

    }
}