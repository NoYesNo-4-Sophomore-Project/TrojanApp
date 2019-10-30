class field extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload () {
        //import background and main character
        this.load.image('field', 'assets/RoadToTroy.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('bandit', 'assets/Bandit.png', {frameWidth: 36, frameHeight: 32});
    }

    create () {
        //Add the background image (or at least a portion of if)
        var background = this.add.image(0, 0, 'field').setOrigin(0,0);
        
        // Scales the background image to fit the screen size
        // Doesn't auto-update; Maybe need to go into update();
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        background.setDisplaySize(widthGame, heightGame);

        //Add the main character
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        
        //Control main character size and makes sure he stays on screen
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.setDisplaySize(288, 288);
        //mainCharacter.setSize(32, 32)
        mainCharacter.setPosition(100, 450);
        mainCharacter.setBounce(0);

        //Health?
        mainCharacter.setDataEnabled();
        mainCharacter.data.set('hp', 5);

        //hpDecrease function
        const hpDecrease = () => {
            console.log('something worked');
            let newhp = enemy.data.get('hp');
            newhp -= 1;
            enemy.data.set('hp', newhp);
            console.log('Should now be 3: ' + enemy.data.get('hp'));
        }

        const hitBandit = () => {
            //Add fun code here for later!
        }

        //Add bandit character
        enemy = this.physics.add.sprite(700, 450, 'bandit');

        //Control bandit size and makes sure he stays on screen
        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(300, 300);
        enemy.setBounce(0);

        //Set bandit hp
        enemy.setDataEnabled();
        enemy.data.set('hp', 4);

        //Add collider for main and bandit
        this.physics.add.collider(mainCharacter, enemy, hpDecrease, null, this);

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