class castle extends Phaser.Scene {
    constructor () {
        super({key: 'castle'});
    }
    preload () {
        this.load.image('castle', 'assets/FinalBoss.png');
        this.load.spritesheet('main', 'assets/Main.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('minotaur','assets/Minotaur.png', {frameWidth: 95, frameHeight: 85});
        this.load.spritesheet('princess', 'assets/Princess.png', { frameWidth: 32, frameHeight: 48});
    }

    create () {
        /*
            Background setting
        */

        this.background = this.add.tileSprite(0, 0, widthGame, heightGame, 'castle');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        heightGame = this.sys.canvas.height;
        widthGame = this.sys.canvas.width;
        this.background.setDisplaySize(widthGame, heightGame);

        this.input.addPointer(2);
        /*
            Main character setting
            Reset's health at this stage as well
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
       mainCharacter.data.set('hp', 0);

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
            Minotaur inclusion
            Set Minotaur size
            Set Minotaur bounds
            Set Minotaur health
            Minotaur animation       
        */

       minoTaur = this.physics.add.sprite(800, 450, 'minotaur');
        
       minoTaur.setCollideWorldBounds(true);
       minoTaur.displayHeight = heightGame * 0.7;
       minoTaur.displayWidth = widthGame * 0.5;
       
       var c = new Phaser.Geom.Rectangle(500, 450, 75, 85);
       minoTaur.setSize(c.width, c.height);
       minoTaur.setOffset(20, 0);

       minoTaur.setDataEnabled();
       minoTaur.data.set('hp', 100);

       this.anims.create({
        key: 'minoTaurAttack',
        frames: this.anims.generateFrameNumbers('minotaur', {start: 5, end: 4}),
        frameRate: 5,
        });

       /*
            Princess inclusion
            Set princess size
            Set princess bounds
            Princess shouldn't need health b/c we're saving her
       */

        princess = this.physics.add.sprite(1000, 450, 'princess');

        princess.setCollideWorldBounds(true);
        princess.displayHeight = heightGame * 0.3;
        princess.displayWidth = widthGame * 0.15;

        var d = new Phaser.Geom.Rectangle(100, 450, 40, 48);
        princess.setSize(d.width, d.height);
        princess.setOffset(-10,0);

        princess.body.setImmovable(true);

        this.anims.create({
            key: 'princessInteraction',
            frames: this.anims.generateFrameNumbers('princess', {start: 1, end: 1}),
            frameRate: 5,
        });

        /*
            Functions
            Minotaur battle function
            Princess saved function
        */

        function hpDecrease () {
            if (aKey.isDown){
                castletext.setVisible(false);
                let newhp = minoTaur.data.get('hp');
                if (newhp <= 0){
                    minoTaur.destroy();
                }
                else {
                    newhp -= 2;
                    minoTaur.data.set('hp', newhp);
                }
            }
            else if (cursors.up.isDown || !mainCharacter.body.onFloor()){
                minoTaur.setVelocityX(-300);
                minoTaur.play('minoTaurAttack', false);
            }
            else {
                minoTaur.flipX = true;
                mainhp = mainCharacter.data.get('hp');
                mainhp -= 0.5;
                mainCharacter.data.set('hp', mainhp);
            }
        };

        function winner () {
            princess.play('princessInteraction', true);
            gameWinner.visible = true;
        };

       /*
            Extras
            Cursor keys
            Game over text
            Game winner text 
       */
         font = heightGame * 0.05;
         castletext = this.add.text((100), (100), "You made it inside the castle!\nNow defeat the mighty minotaur and save the princess!", 
         {fontFamily: 'Arial', fontSize: font, color: '#EE204D'});

        this.physics.add.overlap(mainCharacter, minoTaur, hpDecrease, null, this);
        this.physics.add.collider(mainCharacter, princess, winner, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        aKey = this.input.keyboard.addKey('A');

        let get = mainCharacter.getTopLeft()
        gameoverFont = heightGame * 0.1;
        gameOver = this.add.text((get.x + 50), (get.y + 50), "GAME OVER", {fontFamily: 'Arial', fontSize:gameoverFont, color: '#EE204D'});
        gameOver.visible = false;

        var gameWinner = this.add.text((get.x + 50), (get.y + 50), "WINNER! You saved the princess", {fontFamilt: 'Arial', fontSize: gameoverFont, color: '#65A3E1'});
        gameWinner.visible = false;
    }

    update () {

        if (mainhp <= 0){
            this.physics.pause();
            mainCharacter.setTint(0xff0000);
            gameOver.visible = true;
        }

        //Controls motion when certain touches are made
        var midpointII = (widthGame/2);
        var halfwayII = (heightGame/2);

        if (this.input.pointer1.isDown && this.input.pointer1.x > midpointII){
            mainCharacter.setVelocityX(160);
            mainCharacter.anims.play('right', true);

            if (this.input.pointer2.isDown){
                mainCharacter.anims.play('attack');
            }
        }
        else if (this.input.pointer1.isDown && this.input.pointer1.x < midpointII){
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
        
        if (this.input.pointer1.isDown && this.input.pointer1.y < halfwayII){
            mainCharacter.setVelocityY(-200);

            if (this.input.pointer2.isDown){
                mainCharacter.anims.play('attack');
            }
        } 

        //Controls motion when certain keys are pressed down
        // if (cursors.left.isDown)
        // {
        //     mainCharacter.setVelocityX(-160);
        //     mainCharacter.anims.play('left', true);
        // }
        // else if (cursors.right.isDown)
        // {
        //     mainCharacter.setVelocityX(160);
        //     mainCharacter.anims.play('right', true);
        // }
        // else if (aKey.isDown){
        //     mainCharacter.setVelocityX(0);
        //     mainCharacter.anims.play('attack'); 
        // }
        // else
        // {
        //     mainCharacter.setVelocityX(0);
        //     mainCharacter.anims.play('turn');
        // }
        
        // if (cursors.up.isDown && mainCharacter.body.onFloor()){
        //     mainCharacter.setVelocityY(-200);
        // }     

    }
}