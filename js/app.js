// Global variables
var pStartX = 202;
var pStartY = 300;

var eStartX = [-82, -182, -382, -482, -682, -882];
var eStartY = [62, 142, 225];

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for the game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += dt * 180;
    } else {
        this.x = eStartX[Math.floor(Math.random() * eStartX.length)];
        this.y = eStartY[Math.floor(Math.random() * eStartY.length)];
    }

    if (this.x < player.x + 62 &&
        this.x + 72 > player.x &&
        this.y < player.y + 76 &&
        66 + this.y > player.y) {
            console.log('Collision!');
            player.restart();
    }
};

// Draw the enemy on the screen, required method for the game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = pStartX;
    this.y = pStartY;
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
Player.prototype.update = function() {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyDirection) {
    if(keyDirection == 'up' && this.y > -28) {
        this.y -= 82;
    }
    if (this.y < 54) {
        this.restart();
    }
    if(keyDirection == 'down' && this.y < 382) {
        this.y += 82;
    }
    if(keyDirection == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if(keyDirection == 'right' && this.x < 400) {
        this.x += 101;
    }
};

Player.prototype.restart = function() {
    this.x = pStartX;
    this.y = pStartY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var i=0; i < 6; i++) {
    allEnemies.push(new Enemy(eStartX[Math.floor(Math.random() * eStartX.length)], eStartY[Math.floor(Math.random() * eStartY.length)]));
}

// Place the player object in a variable called player
var player = new Player(pStartX, pStartY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
