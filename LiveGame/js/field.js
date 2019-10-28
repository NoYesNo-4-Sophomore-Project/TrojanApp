class field extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload () {
        //import background and main character
        this.load.image('field', 'assets/RoadToTroy.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('Bandit', 'assets/Bandit.png', { frameWidth: 40, frameheight: 32});
        
    }

    create () {
        //Add the background image (or at least a portion of it)
        var background = this.add.image(0, 0, 'field').setOrigin(0,0);
        
        // Scales the background image to fit the screen size
        // Doesn't auto-update; Maybe need to go into update();
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        background.setDisplaySize(widthGame, heightGame);

        //Add the main character
        var mainCharacter = this.physics.add.sprite(100, 450, 'main');
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.setDisplaySize(288, 288);
        //Add the enemy bandit... do we want multiple of the same or different bandit sprites?
        var enemy = this.physics.add.sprite(700, 450, 'Bandit');
        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(288, 288);
       
    }

    update () {

    }
};