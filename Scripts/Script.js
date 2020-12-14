var canvas = document.getElementById('game');

canvas.width = 1920;
canvas.height = 1080;

var dinoImg1 = new Image();
var dinoImg2 = new Image();
var dinoImg3 = new Image();
var dinoImg4 = new Image();
var dinoImg5 = new Image();
var dinoImg6 = new Image();

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var settings = {
    fullscreen: false
};
var standard = {
    jumpspeed:40,
    height:640,
}
var dino = {
    x: 200,
    y: standard.height,
    animationState: 1,
    animation:1,
    jumping:false,
    jumpSpeed:standard.jumpspeed,
    gravitation: 2
}

window.addEventListener('keydown', function(event){
    console.log(event);
    if(event.code === "KeyF"){
        toggleFullscreen();
    }
    if(event.code === "Space"){
        jump();
    }
})
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
}

function update(){
    requestAnimationFrame(update);
    c.fillStyle='white';
    c.fillRect(0,0,canvas.width,canvas.height);    
    showPlayer();
    if(dino.y < standard.height){
        up();
        console.log("hej")
    }else{
        dino.y = standard.height;
        dino.inAir = false;
        dino.jumpSpeed = standard.jumpspeed;
        dino.animationState = 1;
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

update();