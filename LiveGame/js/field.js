class field extends Phaser.Scene {
    constructor() {
        super('fieldGame');
    }

    preload () {
        //Importing assets
        this.load.image('field', 'assets/NoRoad.png');
        this.load.image('fence', 'assets/RoadOnly.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('bandit', 'assets/Bandit.png', {frameWidth: 36, frameHeight: 32});
        this.load.spritesheet('flag', 'assets/romanflag.png', {frameWidth: 32, frameHeight: 90});
    }

    create () {
        /* 
            Background inclusion and scaling
            - Doesn't auto-update to screen size
        */
        var background2;
        var background;
        this.background = this.add.tileSprite(0, 0, widthGame, heightGame, 'field');
        this.background2 = this.add.tileSprite(0, 0, widthGame, heightGame, 'fence');
        this.background2.setOrigin(0, 0);
        this.background.setOrigin(0, 0);
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        

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
        

        var b = new Phaser.Geom.Rectangle(100, 450, 32, 48);
        mainCharacter.setSize(b.width, b.height);
        mainCharacter.setOffset(0, 0);

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
            Bandit - prevent him from moving due to collision
            Bandit character keyboard animations
        */
        enemy = this.physics.add.sprite(1000, 450, 'bandit');

        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(300, 300);

        var c = new Phaser.Geom.Rectangle(500, 450, 28, 32);
        enemy.setSize(c.width, c.height);
        enemy.setOffset(10, 0);

        enemy.setDataEnabled();
        enemy.data.set('hp', 4);

        enemy.setBounce(0);
        enemy.body.setImmovable(true);
        

        this.anims.create({
            key: 'bleft',
            frames: this.anims.generateFrameNumbers('bandit', { start: 2, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'bright',
            frames: this.anims.generateFrameNumbers('bandit', {start: 2, end: 5}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'bturn',
            frames: [ { key: 'bandit', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'battack',
            frames: this.anims.generateFrameNumbers('bandit', {start: 1, end: 1}),
            frameRate: 5,
        });

        // What are we doing here?
        //enemy.setVelocityX(160);
        enemy.anims.play();

        /*
            Flag icon inclusion
            Flag bounds setting and scaling
        */
        flag = this.physics.add.sprite(2000, 450, 'flag');
        flag.setCollideWorldBounds(true);
        flag.setDisplaySize(256, 720);
        

        /*
            Functions
            hpDecrease function manages attack action and bandit hp
        */
        const hpDecrease = () => {
            if (aKey.isDown){
                console.log("hi");
                let newhp = enemy.data.get('hp');
                newhp -= 1;
                enemy.data.set('hp', newhp);
                //enemy.x -= 50;
            }
        }

         /* 
            Extra
            Collider between main character and enemy calls hpDecrease function
            Sets up arrow keys and 'a' key for motion of main character
        */
        this.physics.add.overlap(mainCharacter, enemy, hpDecrease, null, this);

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
 
        // What is this for?
        if (cursors.up.isDown && mainCharacter.body.touching.down){
            mainCharacter.setVelocityY(-200);
        }
    }

    //What did you want to do with this?
    moveEnemy()
    {
        enemy.setVelocityX(160);
        enemy.anims.play('bright');
    }
 
}