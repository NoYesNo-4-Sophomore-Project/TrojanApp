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
            debug: true
        }
    },
    //Defuzzes characters
    pixelArt: true,
    //Insert scenes here
    // May need to use 'new' keyword
    scene: [field, town, castle] 
    // field, town,  
};

// Need to attach any global variables here
var game = new Phaser.Game(config);
var mainCharacter;
var mainhp;
var enemy;
var enemy2;
var enemy3;
var guard1;
var guard2;
var minoTaur;
var princess;
var guard3;
var guard4;
var flag;
var cursors;
var aKey;
var gameOver;
var timerX;
var horsey;
var timerY;
