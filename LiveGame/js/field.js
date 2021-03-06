class field extends Phaser.Scene {
    constructor() {
        super({key: 'field'});
    }

    preload () {
        //Importing assets
        this.load.image('field', 'assets/NoRoad.png');
        this.load.image('fence', 'assets/RoadOnly.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('bandit', 'assets/Bandit.png', {frameWidth: 40, frameHeight: 32});
        this.load.spritesheet('bandit2','assets/Bandit2.png',{frameWidth: 40, frameHeight: 32});
        this.load.spritesheet('bandit3','assets/Bandit3.png',{frameWidth: 40, frameHeight: 32});
        this.load.spritesheet('flag', 'assets/SpartanFlag.png', {frameWidth: 32, frameHeight: 90});
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
        heightGame = this.sys.canvas.height;
        widthGame = this.sys.canvas.width;
        this.background.setDisplaySize(widthGame * 1.25, heightGame);
        this.background2.setDisplaySize(widthGame * 1.25, heightGame);

        this.input.addPointer(2);
        // this.pointer = this.input.activePointer;
        // this.pointer2 = this.input.activePointer;
        

        /* 
            Main character inclusion
            Main character bounds setting and scaling
            Main character health
            Main character keyboard animation motions
        */

        
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.displayHeight = heightGame * 0.3;
        mainCharacter.displayWidth = widthGame * 0.15;
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
        enemy.displayHeight = heightGame * 0.3;
        enemy.displayWidth = widthGame * 0.15;
        enemy.setSize(c.width, c.height);
        enemy.setOffset(10, 0);

        enemy.setDataEnabled();
        enemy.data.set('hp', 60);

        enemy.setBounce(0);
        enemy.body.setImmovable(true);

        this.anims.create({
            key: 'battack',
            frames: this.anims.generateFrameNumbers('bandit', {start: 4, end: 5}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'b2attack',
            frames: this.anims.generateFrameNumbers('bandit2', {start: 4, end: 5}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'b3attack',
            frames: this.anims.generateFrameNumbers('bandit3', {start: 4, end: 5}),
            frameRate: 20,
        });

        //TODO: Will want to see if we are able to move characters to later points in the stage
        // Bandit 2 character 
        enemy2 = this.physics.add.sprite(600, 450, 'bandit2');

        enemy2.setCollideWorldBounds(true);
        enemy2.displayHeight = heightGame * 0.3;
        enemy2.displayWidth = widthGame * 0.15;
        enemy2.setSize(c.width, c.height);
        enemy2.setOffset(10, 0);

        enemy2.setDataEnabled();
        enemy2.data.set('hp', 50);

        enemy2.setVisible(false);

        // Bandit 3 character
        enemy3 = this.physics.add.sprite(700, 450, 'bandit3');

        enemy3.setCollideWorldBounds(true);
        enemy3.displayHeight = heightGame * 0.3;
        enemy3.displayWidth = widthGame * 0.15;
        enemy3.setSize(c.width, c.height);
        enemy3.setOffset(10, 0);

        enemy3.setDataEnabled();
        enemy3.data.set('hp', 40);

        enemy3.setVisible(false);
        
        /*
            Flag icon inclusion
            Flag bounds setting and scaling
            Flag animation
        */

        flag = this.physics.add.sprite(2000, 450, 'flag');
        
        flag.setCollideWorldBounds(true);
        flag.setDisplaySize(256, 720);
        flag.displayHeight = heightGame * .9;
        flag.displayWidth = widthGame * .15;

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
            flagDrop triggers flag drop animation when main character interacts with flag, as well as timer
            startNextScene stops current field scene and transitions to town scene
        */
        function hpDecrease () {
            if (aKey.isDown){
                let newhp = enemy.data.get('hp');
                if (newhp <= 0){
                    enemy.destroy();
                    fieldtext.setVisible(false);
                    this.physics.add.overlap(mainCharacter, enemy2, hpDecrease2, null, this);
                    enemy2.setVisible(true);
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
                if (newhp <= 0){
                    enemy2.destroy();
                    this.physics.add.overlap(mainCharacter, enemy3, hpDecrease3, null, this);
                    enemy3.setVisible(true);
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
                    enemy2.play('b2attack');
                }
                else {
                    enemy2.x -= 5;
                    enemy2.play('b2attack');
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
                    enemy3.play('b3attack');
                    mainhp = mainCharacter.data.get('hp');
                    mainhp -= 2;
                    mainCharacter.data.set('hp', mainhp);
                }
                else {
                    enemy3.y -= 10;
                    enemy3.play('b3attack');
                }
            }
        };
        
        const flagDrop = () => {
            flag.play('flagdrop', true);
            timerX.paused = false;
        };

        const startNextScene = () => {
            this.scene.stop('field');
            this.scene.start('town');
        }
        
         /* 
            Extra
            Collider between main character and enemy calls hpDecrease function
            Collider between main character and enemy2 calls hpDecrease2 function
            Collider between flag and main character called flag drop function
            Sets up arrow keys and 'a' key for motion of main character
            Create 'GAME OVER' text and set it as invisible for initial rendering purposes
            Camera settings
            Timer settings
        */
         font = heightGame * 0.05;
         fieldtext = this.add.text((100), (100), "Hello! You are a soldier in the trojan war!\nYou must fight your way to the castle to save the princess!\nRuthless bandits guard this road, defeat them!",
         {fontFamily: 'Arial', fontSize: font, color: '#EE204D'});

        this.physics.add.overlap(mainCharacter, enemy, hpDecrease, null, this);
        this.physics.add.overlap(mainCharacter, flag, flagDrop, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        aKey = this.input.keyboard.addKey('A');
        
        let get = mainCharacter.getTopLeft()
        gameoverFont = heightGame * 0.1;
        gameOver = this.add.text((get.x + 50), (get.y + 50), "GAME OVER", {fontFamily: 'Arial', fontSize: gameoverFont, color: '#EE204D'});
        gameOver.visible = false;

        this.cameras.main.setBounds(0, 0, 2560, heightGame);
        this.cameras.main.startFollow(mainCharacter);
        timerX = this.time.addEvent({
            delay: 6000,
            callback: startNextScene,
            callbackScope: this,
            loop: false,
            repeat: 0,
            paused: true,
        });
        
    }

    update () {
        //Game over function
        if (mainhp <= 0){
            fieldtext.setVisible(false);
            this.physics.pause();
            mainCharacter.setTint(0xff0000);
            gameOver.visible = true;
            
        }

        //Controls motion when certain touches motions are made
        var midpoint = (widthGame/2);
        var halfway = (heightGame/2);

        if (this.input.pointer1.isDown && this.input.pointer1.x > midpoint){
            mainCharacter.setVelocityX(160);
            mainCharacter.anims.play('right', true);

            if (this.input.pointer2.isDown){
                mainCharacter.anims.play('attack');
            }
        }
        else if (this.input.pointer1.isDown && this.input.pointer1.x < midpoint){
            mainCharacter.setVelocityX(-160);
            mainCharacter.anims.play('left', true);

            if (this.input.pointer2.isDown){
                mainCharacter.anims.play('attack');
            }
        }
        else {
            mainCharacter.setVelocityX(0);
            mainCharacter.anims.play('turn');
        }
        
        if (this.input.pointer1.isDown && this.input.pointer1.y < halfway && mainCharacter.body.onFloor()){
            mainCharacter.setVelocityY(-200);

            if (this.input.pointer2.isDown){
                mainCharacter.anims.play('attack');
            }
        }

        //Controls motion when certain keys are pressed down

        //if (cursors.left.isDown)
         //{
         //    mainCharacter.setVelocityX(-160);
         //    mainCharacter.anims.play('left', true);
        // }
         //else if (cursors.right.isDown)
         //{
          //   mainCharacter.setVelocityX(160);
          //   mainCharacter.anims.play('right', true);
        // }
         //else if (aKey.isDown){
         //   mainCharacter.setVelocityX(0);
          //  mainCharacter.anims.play('attack'); 
        //}
        //else
        //{
        //    mainCharacter.setVelocityX(0);
         //   mainCharacter.anims.play('turn');
        //}
        
        //if (cursors.up.isDown && mainCharacter.body.onFloor()){
        //    mainCharacter.setVelocityY(-200);
        //}     

    }
}
