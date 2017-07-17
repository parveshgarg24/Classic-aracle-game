// Enemies our player must avoid
var Enemy = function(locX,locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x=locX;
     this.y=locY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed=Math.floor(Math.random()*5+5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>=500){
        this.x=0;
    }
    this.x+=dt+this.speed;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player= function(){
    this.x=202;
    this.y=402;
    this.imageNo=0;
    this.sprite=[
        'images/char-boy.png',
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png",
        "images/char-princess-girl.png"
    ];
    this.score=0;
    this.lives=5;
};
Player.prototype.reset=function(){
    //this.updateData("collision");
    this.x=202;
    this.y=402;
};
Player.prototype.checkCollision=function(){
    for(var e=0;e<allEnemies.length;e++){
        if(allEnemies[e].x < player.x + 40 &&
        allEnemies[e].x + 40 > player.x &&
        allEnemies[e].y < player.y + 50&&
        50 + allEnemies[e].y > player.y){
            this.reset();
            this.updateData("collision");
        }
     }  
};
Player.prototype.data=function(){
    ctx.clearRect(0,0,505,100);
    ctx.font="40px Gloria Hallelujah";
    ctx.fillStyle="blue";
    ctx.strokeStyle=" #1BD2D5";
    ctx.strokeText("score:",20,45);
    ctx.fillText("score:",20,45);
    ctx.strokeText("lives:",330,45);
    ctx.fillText("lives:",330,45);
    ctx.fillText("0",120,45);
    ctx.fillText("5",430,45);
};
Player.prototype.updateData=function(data){
    ctx.font="40px Gloria Hallelujah";
    ctx.fillStyle="blue";
    if(data==="win"){
    Enemy.speed=100;    
    this.score+=100;
    ctx.clearRect(120,5,200,100);
    ctx.fillText(player.score,120,45);
    setTimeout(function(){player.reset();}, 400);

    }
    else if(data==="collision"){
      player.lives--;
      if(player.lives===0){   
        player.score=0;
        player.lives=5;
        player.data();
      }
      ctx.clearRect(430,5,505,100);
      ctx.fillText(player.lives,430,45);  
    }
};
Player.prototype.update = function(dt) {
    this.checkCollision();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[this.imageNo]), this.x, this.y);
};
Player.prototype.handleInput=function(key){
    if(key=="left" && this.x>0){
        this.x-=101;
    }
    if(key=="right"&&this.x<404){
        this.x+=101;
    }
    if(key=="down"&&this.y<390){
        this.y+=83;
    }
    if(key=="up"&&this.y>0){
        this.y-=83;
      if(this.y<0){
        this.updateData("win");
      }
    }
    if(key==="enter"){
        if(this.imageNo>=4){
            this.imageNo=0;
        }
        else{
            this.imageNo++;
        }
     }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1=new Enemy(50,58);
var enemy2=new Enemy(-10,141);
var enemy3=new Enemy(-40,228);
var allEnemies=[enemy1,enemy2,enemy3];
var player=new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
