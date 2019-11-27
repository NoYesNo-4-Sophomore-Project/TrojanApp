class town extends Phaser.Scene {
    constructor () {
        super({key: 'town'});
    }

    preload () {
        this.load.image('siege','assets/SiegeOfTroy.png');
        this.load.image('horse', 'assets/Horse 2.png');
        this.load.spritesheet('guard', 'assets/Guard.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('flag', 'assets/SpartanFlag.png', {frameWidth: 32, frameHeight: 90});
        this.load.spritesheet('main', 'assets/Main.png',{ frameWidth: 48, frameHeight: 48});
    }

    create () {
        this.background3 = this.add.tileSprite(0, 0, widthGame, heightGame, 'siege');
        this.background3.setOrigin(0, 0);
        this.background3.setScrollFactor(1);
        var heightGame = this.sys.canvas.height;
        var widthGame = this.sys.canvas.width;
        this.background3.setDisplaySize(widthGame, heightGame);

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

    

    var c = new Phaser.Geom.Rectangle(500, 450, 28, 32);

    enemy4 = this.physics.add.sprite(500, 450, 'guard');

    enemy4.setCollideWorldBounds(true);
    enemy4.displayHeight = heightGame * 0.3;
    enemy4.displayWidth = widthGame * 0.15;
    enemy4.setSize(c.width, c.height);
    enemy4.setOffset(10, 0);

    enemy4.setDataEnabled();
    enemy4.data.set('hp', 70);

    enemy4.setBounce(0);
    enemy4.body.setImmovable(true);

    this.anims.create({
        key: 'cattack',
        frames: this.anims.generateFrameNumbers('guard', {start: 2, end: 3}),
        frameRate: 20,
    });

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

    function hpDecrease () {
        if (aKey.isDown){
            let newhp = enemy4.data.get('hp');
            if (newhp <= 0){
                enemy4.destroy();
                //enemy2.setVisible(true); can implement if we want multiple guards 
            }
            else {
            newhp -= 2;
            enemy4.data.set('hp', newhp);
            }
        }
        else {
            let dec = Phaser.Math.Between(1,2);
            if (dec === 1){
                enemy4.x += 75;
                enemy4.play('cattack');
                mainhp = mainCharacter.data.get('hp');
                mainhp -= 1;
                mainCharacter.data.set('hp', mainhp);
            }
            else {
                enemy4.x -= 75;
                enemy4.play('cattack');
                mainhp = mainCharacter.data.get('hp');
                mainhp -= 1;
                mainCharacter.data.set('hp', mainhp);
            }
        }
    };

    const flagDrop = () => {
        flag.play('flagdrop', true);
        timerX.paused = false;
    };

    const startNextScene = () => {
        this.scene.stop('town');
        this.scene.start('castle');
    }

    this.physics.add.overlap(mainCharacter, enemy4, hpDecrease, null, this);
    this.physics.add.overlap(mainCharacter, flag, flagDrop, null, this);
    cursors = this.input.keyboard.createCursorKeys();
        aKey = this.input.keyboard.addKey('A');
        
        //TODO: Set this to above the main character's head
        gameOver = this.add.text(50, 50, "GAME OVER", {fontFamily: 'Arial', fontSize: 100, color: '#EE204D'});
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
