// Configuration file
// Add scenes here, and change game display information

var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [
        //Insert scenes here
        // May need to use 'new' keyword
        field, 
        // castle, town
        ]  
};

var game = new Phaser.Game(config);