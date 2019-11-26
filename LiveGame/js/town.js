class town extends Phaser.Scene {
    constructor () {
        super({key: 'town'});
    }

    preload () {
        this.load.image('background', 'assets/SiegeOfTroy.png');
        this.load.image('horsey','assets/Horse 2 invisible background.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('guard1', 'assets/Guard.png', {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('guard2', 'assets/Guard.png', {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('guard3', 'assets/Guard.png', {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('guard4', 'assets/Guard.png', {frameWidth: 48, frameHeight: 48});
    }

    create () {

        /*
            Background primary set-up, although not as a tileSprite
            Needs to be fixed such that everything is not smooshed together
        */
        this.background = this.add.tileSprite(0, 0, widthGameII, heightGameII, 'background');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        var heightGameII = this.sys.canvas.height;
        var widthGameII = this.sys.canvas.width;
        this.background.setDisplaySize(widthGameII, heightGameII);

        /*
            Main character inclusion
            Regains HP in new scene
        */
         horsey = this.physics.add.image(2000, 300, 'horsey').setInteractive();
         horsey.setCollideWorldBounds(true);
         horsey.displayHeight = heightGameII * 0.8;
         horsey.displayWidth = widthGameII * 0.5;
         horsey.on('pointerdown', function (pointer){
            if (pointer.isDown){
                mainCharacter.setVelocityX(160);
            }
         })
         
         
        
        mainCharacter = this.physics.add.sprite(100, 450, 'main');
        mainCharacter.setCollideWorldBounds(true);
        mainCharacter.displayHeight = heightGameII * 0.3;
        mainCharacter.displayWidth = widthGameII * 0.15;
        mainCharacter.setBounce(0.2);
        
        var b = new Phaser.Geom.Rectangle(100, 450, 32, 48);
        mainCharacter.setSize(b.width, b.height);
        mainCharacter.setOffset(0, 0);

        mainCharacter.setDataEnabled();
        mainCharacter.data.set('hp', 50);

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
            Guard characters
        */
            guard1 = this.physics.add.sprite(500, 450, 'guard1');
            guard2 = this.physics.add.sprite(700, 450, 'guard2');
            guard3 = this.physics.add.sprite(900, 450, 'guard3');
            guard4 = this.physics.add.sprite(1100, 450, 'guard4');

            guard1.setCollideWorldBounds(true);
            guard2.setCollideWorldBounds(true);
            guard3.setCollideWorldBounds(true);
            guard4.setCollideWorldBounds(true);

            guard1.displayHeight = heightGameII * 0.35;
            guard1.displayWidth = widthGameII * 0.18;
            guard2.displayHeight = heightGameII * 0.35;
            guard2.displayWidth = widthGameII * 0.18;
            guard3.displayHeight = heightGameII * 0.35;
            guard3.displayWidth = widthGameII * 0.18;
            guard4.displayHeight = heightGameII * 0.35;
            guard4.displayWidth = widthGameII * 0.18;

            var b = new Phaser.Geom.Rectangle(100, 450, 24, 48);
            guard1.setSize(b.width, b.height);
            guard2.setSize(b.width, b.height);
            guard3.setSize(b.width, b.height);
            guard4.setSize(b.width, b.height);
            guard1.setOffset(6, 0);
            guard2.setOffset(6, 0);
            guard3.setOffset(6, 0);
            guard4.setOffset(6, 0);

            guard1.setDataEnabled();
            guard2.setDataEnabled();
            guard3.setDataEnabled();
            guard4.setDataEnabled();

            guard1.data.set('hp', 70);
            guard2.data.set('hp', 70);
            guard3.data.set('hp', 70);
            guard4.data.set('hp', 70);

            this.anims.create({
                key: 'g1attack',
                frames: this.anims.generateFrameNumbers('guard1', {start: 2, end: 4}),
                frameRate: 10,
            });

            this.anims.create({
                key: 'g2attack',
                frames: this.anims.generateFrameNumbers('guard2', {start: 2, end: 4}),
                frameRate: 10,
            });

            this.anims.create({
                key: 'g3attack',
                frames: this.anims.generateFrameNumbers('guard3', {start: 2, end: 4}),
                frameRate: 10,
            });

            this.anims.create({
                key: 'g4attack',
                frames: this.anims.generateFrameNumbers('guard4', {start: 2, end: 4}),
                frameRate: 10,
            });

            function hpDecrease () {
                if (aKey.isDown){
                    let newhp = guard1.data.get('hp');
                    if (newhp <= 0){
                       guard1.destroy();
                    
                    }
                    else {
                    newhp -= 2;
                    guard1.data.set('hp', newhp);
                    }
                }
                else {
                    let dec = Phaser.Math.Between(1,2);
                    if (dec === 1){
                        guard1.x += 75;
                        guard1.play('g1attack');
                        mainhp = mainCharacter.data.get('hp');
                        mainhp -= 1;
                        mainCharacter.data.set('hp', mainhp);
                    }
                    else {
                        guard1.x -= 75;
                        guard1.play('g1attack');
                        mainhp = mainCharacter.data.get('hp');
                        mainhp -= 1;
                        mainCharacter.data.set('hp', mainhp);
                    }
                }
            };
    
            function hpDecrease2 () {
                if (aKey.isDown){
                    let newhp = guard2.data.get('hp');
                    if (newhp <= 0){
                        guard2.destroy();
                        
                    }
                    else {
                    newhp -= 2;
                    guard2.data.set('hp', newhp);
                    }
                }
                else {
                    let dec = Phaser.Math.Between(1,2);
                    if (dec === 1){
                        guard2.x += 5;
                        guard2.play('g2attack');
                    }
                    else {
                        guard2.x -= 5;
                        guard2.play('g2attack');
                    }
                }
            };
    
            function hpDecrease3 () {
                if (aKey.isDown){
                    let newhp = guard3.data.get('hp');
                    if (newhp == 0){
                        guard3.destroy();
                    }
                    else {
                    newhp -= 2;
                    guard3.data.set('hp', newhp);
                    }
                }
                else {
                    let dec = Phaser.Math.Between(1,2);
                    if (dec === 1){
                        guard3.y += 5;
                        guard3.play('g3attack');
                        
                    }
                    else {
                        guard3.y -= 10;
                        guard3.play('g3attack');
                    }
                }
            };

                function hpDecrease4 () {
                    if (aKey.isDown){
                        let newhp = guard4.data.get('hp');
                        if (newhp == 0){
                            guard4.destroy();
                        }
                        else {
                        newhp -= 2;
                        guard4.data.set('hp', newhp);
                        }
                    }
                    else {
                        let dec = Phaser.Math.Between(1,2);
                        if (dec === 1){
                            guard4.y += 5;
                            guard4.play('g4attack');
                            mainhp = mainCharacter.data.get('hp');
                            mainhp -= 2;
                            mainCharacter.data.set('hp', mainhp);
                        }
                        else {
                            guard4.y -= 10;
                            guard4.play('g4attack');
                        }
                    }
                };
            

           
        /* 
            Extras
            Key controls 
        */

        cursors = this.input.keyboard.createCursorKeys();
        aKey = this.input.keyboard.addKey('A');

        this.physics.add.overlap(mainCharacter, guard1, hpDecrease, null, this);
        this.physics.add.overlap(mainCharacter, guard2, hpDecrease2, null, this);
        this.physics.add.overlap(mainCharacter, guard3, hpDecrease3, null, this);
        this.physics.add.overlap(mainCharacter, guard4, hpDecrease4, null, this);

        gameOver = this.add.text(50, 50, "GAME OVER", {fontFamily: 'Arial', fontSize: 100, color: '#EE204D'});
        gameOver.visible = false;

        this.cameras.main.setBounds(0, 0, 2560, heightGameII);
        this.cameras.main.startFollow(mainCharacter);

    }

    update () {
        //If HP drops to 0, it's game over
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