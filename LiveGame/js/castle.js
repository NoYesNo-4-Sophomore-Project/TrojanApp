class castle extends Phaser.Scene {
    constructor () {
        super('');
    }

    preload () {
        this.load.image('sky', '../assets/sky.png');
    }

    create () {
        this.add.image(400, 300, 'sky');
    }

    update () {

    }
}