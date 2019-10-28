class field extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload () {
        //import background and main character
        this.load.image('field', 'assets/RoadToTroy.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
<<<<<<< HEAD
        this.load.spritesheet('Bandit', 'assets/Bandit.png', { frameWidth: 40, frameheight: 32});
        
=======
>>>>>>> 820a686604bc28db24a1790e408224924bc84c79
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
<<<<<<< HEAD
        var mainCharacter = this.physics.add.sprite(100, 450, 'main');
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.setDisplaySize(288, 288);
        //Add the enemy bandit... do we want multiple of the same or different bandit sprites?
        var enemy = this.physics.add.sprite(700, 450, 'Bandit');
        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(300, 300);
       
=======
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        
        //Contron main character size and makes sure he stays on screen
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.setDisplaySize(288, 288);

        //Create animation for main character
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('main', { start: 2, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('main', {start: 2, end: 5}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'main', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('main', {start: 1, end: 1}),
            frameRate: 5,
        });

        //Creates motion using the arrow keys
        cursors = this.input.keyboard.createCursorKeys();
        // Creates attack key
        aKey = this.input.keyboard.addKey('A');

>>>>>>> 820a686604bc28db24a1790e408224924bc84c79
    }

    update () {

        //Controls motion when certain keys are pressed down
        if (cursors.left.isDown)
        {
            mainCharacter.setVelocityX(-160);
            mainCharacter.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            mainCharacter.setVelocityX(160);
            mainCharacter.anims.play('right', true);
        }
        else if (aKey.isDown){
            mainCharacter.setVelocityX(0);
            mainCharacter.anims.play('attack');
        }
        else
        {
            mainCharacter.setVelocityX(0);
            mainCharacter.anims.play('turn');
        }

    }
};