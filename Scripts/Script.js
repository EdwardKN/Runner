var canvas = document.getElementById('game');

canvas.width = 1920;
canvas.height = 1080;

var dinoImg1 = new Image();
var dinoImg2 = new Image();
var dinoImg3 = new Image();
var dinoImg4 = new Image();
var dinoImg5 = new Image();
var dinoImg6 = new Image();

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

var dino = {
    x: 200,
    y: standard.height,
    animationState: 1,
    animation:1,
    jumping:false,
    jumpSpeed:standard.jumpspeed,
    gravitation: 2,
    crouch: false
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
    if (dinoImg1.complete && dino.animationState === 1 && dino.animation === 1){
        c.drawImage(dinoImg1, Math.floor(dino.x), Math.floor(dino.y), 256, 256);
        dinoImg1.src = 'Images/Dinosaur/dino1.png';
    }
    if (dinoImg2.complete && dino.animationState === 1 && dino.animation === 2){
        c.drawImage(dinoImg2, Math.floor(dino.x), Math.floor(dino.y), 256, 256);
        dinoImg2.src = 'Images/Dinosaur/dino2.png';
    }
    if (dinoImg3.complete && dino.animationState === 2){
        c.drawImage(dinoImg3, Math.floor(dino.x), Math.floor(dino.y), 256, 256);
        dinoImg3.src = 'Images/Dinosaur/dino3.png';
    }
    if (dinoImg4.complete && dino.animationState === 3 && dino.animation === 1){
        c.drawImage(dinoImg4, Math.floor(dino.x), Math.floor(dino.y), 256, 256);
        dinoImg4.src = 'Images/Dinosaur/dino4.png';
    }
    if (dinoImg5.complete && dino.animationState === 3 && dino.animation === 2){
        c.drawImage(dinoImg5, Math.floor(dino.x), Math.floor(dino.y), 256, 256);
        dinoImg5.src = 'Images/Dinosaur/dino5.png';
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
}

function checkAir(){
    if(dino.y < standard.height){
        up();
        console.log("hej")
    }else{
        dino.y = standard.height;
        dino.inAir = false;
        dino.jumpSpeed = standard.jumpspeed;
        if(dino.crouch === false){
            dino.animationState = 1;
        }
    }
}
function jump() {
    dino.animationState = 2;
    up();
  }

function up(){
    dino.y -= dino.jumpSpeed;
    dino.jumpSpeed -= dino.gravitation;
}

function crouch() {
    dino.crouch = true;
    if (dino.animationState === 1 && dino.inAir === false) {
      dino.animationState = 3;
    }
  }
  function crouchEnd() {
    dino.crouch = false;
    dino.animationState = 1;
  };

function teleport() {
    if (dino.stand === false && dino.died === false && user.loggedIn === true && dino.timer === ""){
        if(hat.dropped === false || loosehat === true){
            var chosen = Math.floor(Math.random() * 5);

            if (cactus1.x < -200 && chosen === 1) {
                cactus1.x = 2000;
            }
            else if (cactus2.x < -200 && chosen === 2) {
                cactus2.x = 2000;
            }
            else if (cactus3.x < -200 && chosen === 3) {
                cactus3.x = 2000;
            }
            else if (cactus4.x < -200 && chosen === 4) {
                cactus4.x = 2000;
            }
            else if (bird.x < -200 && chosen === 5 || bird.x < -200 && chosen === 6) {
                bird.x = 2000;
                bird.y = (standard.height + 100) - Math.random() * 300;
            }
            else {
                chosen = Math.floor(Math.random() * 5);
            }
        }
    }
}


setInterval(function(){

    if(dino.animation === 1){
        dino.animation = 2;
        return;
    }
    if(dino.animation === 2){
        dino.animation = 1;
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