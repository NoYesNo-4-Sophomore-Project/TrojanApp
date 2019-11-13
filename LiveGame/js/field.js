class field extends Phaser.Scene {
    constructor() {
        super('fieldGame');
    }

    preload () {
        //Importing assets
        this.load.image('field', 'assets/NoRoad.png');
        this.load.image('fence', 'assets/RoadOnly.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('bandit', 'assets/Bandit.png', {frameWidth: 40, frameHeight: 32});
        this.load.spritesheet('bandit2','assets/Bandit2.png',{frameWidth: 36, frameHeight: 32});
        this.load.spritesheet('bandit3','assets/Bandit3.png',{frameWidth: 40, frameHeight: 32});
        this.load.spritesheet('flag', 'assets/romanflag.png', {frameWidth: 32, frameHeight: 90});
    }

    create () {
        /* 
            Background inclusion and scaling
            - Doesn't auto-update to screen size
        */
        this.background = this.add.tileSprite(0, 0, widthGame, heightGame, 'field');
        this.background2 = this.add.tileSprite(0, 0, widthGame, heightGame, 'fence');
        this.background2.setOrigin(0, 0);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        this.background2.setScrollFactor(1);
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        this.background.setDisplaySize(widthGame, heightGame);
        this.background2.setDisplaySize(widthGame, heightGame);
        

        /* 
            Main character inclusion
            Main character bounds setting and scaling
            Main character health
            Main character keyboard animation motions
        */
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.displayHeight = heightGame * 0.45;
        mainCharacter.displayWidth = widthGame * 0.2;
        mainCharacter.setBounce(0.2);
        
        var b = new Phaser.Geom.Rectangle(100, 450, 32, 48);
        mainCharacter.setSize(b.width, b.height);
        mainCharacter.setOffset(0, 0);

        mainCharacter.setDataEnabled();
        mainCharacter.data.set('hp', 100);
        

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
            Bandit 2 amd 3 inclusion
        */

        var c = new Phaser.Geom.Rectangle(500, 450, 28, 32);

        enemy = this.physics.add.sprite(500, 450, 'bandit');

        enemy.setCollideWorldBounds(true);
        enemy.displayHeight = heightGame * 0.45;
        enemy.displayWidth = widthGame * 0.2;
        enemy.setSize(c.width, c.height);
        enemy.setOffset(10, 0);

        enemy.setDataEnabled();
        enemy.data.set('hp', 60);

        enemy.setBounce(0);
        enemy.body.setImmovable(true);

        // this.anims.create({
        //     key: 'bleft',
        //     frames: this.anims.generateFrameNumbers('bandit', { start: 2, end: 5 }),
        //     frameRate: 5,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'bright',
        //     frames: this.anims.generateFrameNumbers('bandit', {start: 2, end: 5}),
        //     frameRate: 5,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'bturn',
        //     frames: [ { key: 'bandit', frame: 0 } ],
        //     frameRate: 20
        // });

        this.anims.create({
            key: 'battack',
            frames: this.anims.generateFrameNumbers('bandit', {start: 4, end: 5}),
            frameRate: 20,
        });

        // Bandit 2 character 
        enemy2 = this.physics.add.sprite(1250, 450, 'bandit2');

        enemy2.setCollideWorldBounds(true);
        enemy2.displayHeight = heightGame * 0.45;
        enemy2.displayWidth = widthGame * 0.2;
        enemy2.setSize(c.width, c.height);
        enemy2.setOffset(10, 0);

        enemy2.setDataEnabled();
        enemy2.data.set('hp', 50);

        // Bandit 3 character
        enemy3 = this.physics.add.sprite(1500, 450, 'bandit3');

        enemy3.setCollideWorldBounds(true);
        enemy3.displayHeight = heightGame * 0.45;
        enemy3.displayWidth = widthGame * 0.2;
        enemy3.setSize(c.width, c.height);
        enemy3.setOffset(10, 0);

        enemy3.setDataEnabled();
        enemy3.data.set('hp', 40);
        
        /*
            Flag icon inclusion
            Flag bounds setting and scaling
            Flag animation
        */

        flag = this.physics.add.sprite(2000, 450, 'flag');
        
        flag.setCollideWorldBounds(true);
        flag.setDisplaySize(256, 720);
        flag.displayHeight = heightGame;
        flag.displayWidth = widthGame * 0.2;

        this.anims.create({
            key:'flagdrop',
            frames: this.anims.generateFrameNumbers('flag', {start: 0, end: 5}),
            frameRate: 1,
            repeat: 0,
        });
            
        /*
            Functions
            hpDecrease function manages attack action, bandit hp, and character hp
            hpDecrease2 function manages attack action, bandit2 hp
            hpDecrease3 function manages attack action, bandit3 hp, and character hp
            flagDrop triggers flag drop animation when main character interacts with flag
        */
        function hpDecrease () {
            if (aKey.isDown){
                let newhp = enemy.data.get('hp');
                if (newhp == 0){
                    enemy.destroy();
                }
                else {
                newhp -= 2;
                enemy.data.set('hp', newhp);
                }
            }
            else {
                let dec = Phaser.Math.Between(1,2);
                if (dec === 1){
                    enemy.x += 75;
                    enemy.play('battack');
                    mainhp = mainCharacter.data.get('hp');
                    mainhp -= 1;
                    mainCharacter.data.set('hp', mainhp);
                }
                else {
                    enemy.x -= 75;
                    enemy.play('battack');
                    mainhp = mainCharacter.data.get('hp');
                    mainhp -= 1;
                    mainCharacter.data.set('hp', mainhp);
                }
            }
        };

        function hpDecrease2 () {
            if (aKey.isDown){
                let newhp = enemy2.data.get('hp');
                if (newhp == 0){
                    enemy2.destroy();
                }
                else {
                newhp -= 2;
                enemy2.data.set('hp', newhp);
                }
            }
            else {
                let dec = Phaser.Math.Between(1,2);
                if (dec === 1){
                    enemy2.x += 5;
                }
                else {
                    enemy2.x -= 5;
                }
            }
        };

        function hpDecrease3 () {
            if (aKey.isDown){
                let newhp = enemy3.data.get('hp');
                if (newhp == 0){
                    enemy3.destroy();
                }
                else {
                newhp -= 2;
                enemy3.data.set('hp', newhp);
                }
            }
            else {
                let dec = Phaser.Math.Between(1,2);
                if (dec === 1){
                    enemy3.y += 5;
                    mainhp = mainCharacter.data.get('hp');
                    mainhp -= 4;
                    mainCharacter.data.set('hp', mainhp);
                    console.log(mainhp);
                }
                else {
                    enemy3.y -= 10;
                }
            }
        };
        
        const flagDrop = () => {
            flag.play('flagdrop', true);
        };

        
         /* 
            Extra
            Collider between main character and enemy calls hpDecrease function
            Collider between main character and enemy2 calls hpDecrease2 function
            Collider between flag and main character called flag drop function
            Sets up arrow keys and 'a' key for motion of main character
            Create 'GAME OVER' text and set it as invisible for initial rendering purposes
        */
        this.physics.add.overlap(mainCharacter, enemy, hpDecrease, null, this);
        this.physics.add.overlap(mainCharacter, enemy2, hpDecrease2, null, this);
        this.physics.add.overlap(mainCharacter, enemy3, hpDecrease3, null, this);
        this.physics.add.overlap(mainCharacter, flag, flagDrop, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        aKey = this.input.keyboard.addKey('A');
        
        gameOver = this.add.text(50, 50, "GAME OVER", {fontFamily: 'Arial', fontSize: 100, color: '#EE204D'});
        gameOver.visible = false;
        
        this.cameras.main.setBounds(0, 0, 2560, heightGame);
        this.cameras.main.startFollow(mainCharacter);
        
    }

    newMethod(camera) {
        return new camera();
    }

    update () {
        //Game over function
        if (mainhp <= 0){
            this.physics.pause();
            mainCharacter.setTint(0xff0000);
            gameOver.visible = true;
        }

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
        
        if (cursors.up.isDown && mainCharacter.body.onFloor()){
            mainCharacter.setVelocityY(-200);
        }  
        
    }
}