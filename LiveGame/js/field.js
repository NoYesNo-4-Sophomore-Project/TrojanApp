class field extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload () {
        //import background and main character
        this.load.image('field', 'assets/RoadToTroy.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
    }

    create () {
        //Add the background image (or at least a portion of if)
        this.add.image(400, 300, 'field');

        //Add the main character
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        mainCharacter.setCollideWorldBounds(true);

        //Scale the main character 0.0
        mainCharacter.setSize(240,240);
    }

    update () {

    }
};