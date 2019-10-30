class field extends Phaser.Scene {
    constructor() {
        super('fieldGame');
    }

    preload () {
        //Importing assets
        this.load.image('field', 'assets/RoadToTroy.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('bandit', 'assets/Bandit.png', {frameWidth: 36, frameHeight: 32});
    }

    create () {
        /* 
            Background inclusion and scaling
            - Doesn't auto-update to screen size
        */
        var background = this.add.image(0, 0, 'field').setOrigin(0,0);
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        background.setDisplaySize(widthGame, heightGame);

        /* 
            Main character inclusion
            Main character bounds setting and scaling
            Main character health
            Main character keyboard animation motions
        */
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.setDisplaySize(288, 288);
        mainCharacter.setBounce(0);

        mainCharacter.setDataEnabled();
        mainCharacter.data.set('hp', 5);

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

        /* 
            Bandit character inclusion
            Bandit character bounds setting and scaling
            Bandit character health
        */
        enemy = this.physics.add.sprite(700, 450, 'bandit');

        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(300, 300);
        enemy.setBounce(0);

        enemy.setDataEnabled();
        enemy.data.set('hp', 4);

        /*
            Functions
            hpDecrease function manages attack action and bandit hp
        */
        const hpDecrease = () => {
            console.log('something worked');
            let newhp = enemy.data.get('hp');
            newhp -= 1;
            enemy.data.set('hp', newhp);
            console.log('Should now be 3: ' + enemy.data.get('hp'));
        }

        /* 
            Extra
            Collider between main character and enemy calls hpDecrease function
            Sets up arrow keys and 'a' key for motion of main character
        */
        this.physics.add.collider(mainCharacter, enemy, hpDecrease, null, this);

        cursors = this.input.keyboard.createCursorKeys();
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