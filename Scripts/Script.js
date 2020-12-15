var canvas = document.getElementById('game');

canvas.width = 1920;
canvas.height = 1080;

var playerImg1 = new Image();
var playerImg2 = new Image();
var playerImg3 = new Image();
var playerImg4 = new Image();
var playerImg5 = new Image();
var playerImg6 = new Image();

var birdImg1 = new Image();
var birdImg2 = new Image();

var cactusImg1 = new Image();
var cactusImg2 = new Image();
var cactusImg3 = new Image();
var cactusImg4 = new Image();

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var settings = {
    fullscreen: false
};
var standard = {
    jumpspeed:35,
    height:640,
}
var cactus1 = {
    x: 700,
    y: standard.height
  };
  var cactus2 = {
    x: 850,
    y: standard.height
  };
  var cactus3 = {
    x: 1000,
    y: standard.height
  };
  var cactus4 = {
    x: 1150,
    y: standard.height
  }; 

  var bird = {
    x: 500,
    y: (standard.height + 100) - Math.random() * 300,
    animationState: 1,
    animation: 1
  };

var player = {
    x: 200,
    y: standard.height,
    animationState: 1,
    animation:1,
    jumping:false,
    jumpSpeed:standard.jumpspeed,
    gravitation: 2,
    crouch: false,
    speed: 20
};

window.addEventListener('keydown', function(event){
    if(event.code === "KeyF"){
        toggleFullscreen();
    }
    if(event.code === "Space"){
        jump();
    }
    if(event.code === "ControlLeft"){
        crouch();
    }
});
window.addEventListener('keyup', function(event){
    console.log(event);
    if(event.code === "ControlLeft"){
        crouchEnd();
    }
});
function toggleFullscreen(){
    if(settings.fullscreen === false){
        if (canvas.RequestFullScreen) {
            canvas.RequestFullScreen();
        }else if(canvas.webkitRequestFullScreen){
            canvas.webkitRequestFullScreen();
            }else if(canvas.mozRequestFullScreen){
        canvas.mozRequestFullScreen();
        }else if(canvas.msRequestFullscreen){
            canvas.msRequestFullscreen();
        }else{
            alert("This browser doesn't supporter fullscreen");
        }
    }
}

function showPlayer(){
    if (playerImg1.complete && player.animationState === 1 && player.animation === 1){
        c.drawImage(playerImg1, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg1.src = 'Images/Player/Ostrich/player1.png';
    }
    if (playerImg2.complete && player.animationState === 1 && player.animation === 2){
        c.drawImage(playerImg2, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg2.src = 'Images/Player/Ostrich/player2.png';
    }
    if (playerImg3.complete && player.animationState === 2){
        c.drawImage(playerImg3, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg3.src = 'Images/Player/Ostrich/player3.png';
    }
    if (playerImg4.complete && player.animationState === 3 && player.animation === 1){
        c.drawImage(playerImg4, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg4.src = 'Images/Player/Ostrich/player4.png';
    }
    if (playerImg5.complete && player.animationState === 3 && player.animation === 2){
        c.drawImage(playerImg5, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg5.src = 'Images/Player/Ostrich/player5.png';
    }
}
function showObstacle(){
    if (birdImg1.complete && bird.animationState === 1 && bird.animation === 1){
        c.drawImage(birdImg1, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg1.src = 'Images/Obstacles/bird1.png';
    }
    if (birdImg2.complete && bird.animationState === 1 && bird.animation === 2){
        c.drawImage(birdImg2, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg2.src = 'Images/Obstacles/bird2.png';
    }
    if(cactusImg1.complete){
        c.drawImage(cactusImg1, Math.floor(cactus1.x), Math.floor(cactus1.y), 256, 256);
        cactusImg1.src = 'Images/Obstacles/cactus1.png';
    }
    if(cactusImg2.complete){
        c.drawImage(cactusImg2, Math.floor(cactus2.x), Math.floor(cactus2.y), 256, 256);
        cactusImg2.src = 'Images/Obstacles/cactus2.png';
    }
    if(cactusImg3.complete){
        c.drawImage(cactusImg3, Math.floor(cactus3.x), Math.floor(cactus3.y), 256, 256);
        cactusImg3.src = 'Images/Obstacles/cactus3.png';
    }
    if(cactusImg4.complete){
        c.drawImage(cactusImg4, Math.floor(cactus4.x), Math.floor(cactus4.y), 256, 256);
        cactusImg4.src = 'Images/Obstacles/cactus4.png';
    }
}

function update(){
    requestAnimationFrame(update);
    c.fillStyle='white';
    c.fillRect(0,0,canvas.width,canvas.height);    
    showPlayer();
    showObstacle();
    checkAir();
    moveObstacle();
}

function moveObstacle(){
    bird.x -= player.speed;
    cactus1.x -= player.speed;
    cactus2.x -= player.speed;
    cactus3.x -= player.speed;
    cactus4.x -= player.speed;
}

function checkAir(){
    if(player.y < standard.height){
        up();
        console.log("hej")
    }else{
        player.y = standard.height;
        player.inAir = false;
        player.jumpSpeed = standard.jumpspeed;
        if(player.crouch === false){
            player.animationState = 1;
        }
    }
}
function jump() {
    player.animationState = 2;
    up();
  }

function up(){
    player.y -= player.jumpSpeed;
    player.jumpSpeed -= player.gravitation;
}

function crouch() {
    if (player.animationState === 1 && player.inAir === false) {
        player.animationState = 3;
        player.crouch = true;
    }
  }
  function crouchEnd() {
    player.crouch = false;
    player.animationState = 1;
  };

function teleport() {
    var chosen = Math.floor(Math.random() * 5);

    if (cactus1.x < -200 && chosen === 1) {
        cactus1.x = 2000+(Math.random()*200);
    }
    else if (cactus2.x < -200 && chosen === 2) {
        cactus2.x = 2000+(Math.random()*200);
    }
    else if (cactus3.x < -200 && chosen === 3) {
        cactus3.x = 2000+(Math.random()*200);
    }
    else if (cactus4.x < -200 && chosen === 4) {
        cactus4.x = 2000+(Math.random()*200);
    }
    else if (bird.x < -200 && chosen === 5) {
        bird.x = 2000+(Math.random()*200);
        bird.y = (standard.height + 100) - Math.random() * 300;
    }
    else {
        chosen = Math.floor(Math.random() * 5);
    }
}


setInterval(function(){

    if(player.animation === 1){
        player.animation = 2;
        return;
    }
    if(player.animation === 2){
        player.animation = 1;
        return;
    }
},100);

setInterval(function(){

    if(bird.animation === 1){
        bird.animation = 2;
        return;
    }
    if(bird.animation === 2){
        bird.animation = 1;
        return;
    }
},200);

setInterval(teleport, 1000)

update();