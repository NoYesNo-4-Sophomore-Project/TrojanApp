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
    //Defuzzes characters
    pixelArt: true,
    scene: [
        //Insert scenes here
        // May need to use 'new' keyword
        field
        // castle, town
        ]  
};

// Need to attach any global variables here
var game = new Phaser.Game(config);
var mainCharacter;
var enemy;
var enemy2;
var enemy3;
var flag;
var cursors;
var aKey;
