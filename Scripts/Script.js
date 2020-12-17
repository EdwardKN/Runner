var canvas = document.getElementById('game');

canvas.width = 1920;
canvas.height = 1080;

var playerImg1 = new Image();
var playerImg2 = new Image();
var playerImg3 = new Image();
var playerImg4 = new Image();
var playerImg5 = new Image();
var playerImg6 = new Image();
var playerImg7 = new Image();

var birdImg1 = new Image();
var birdImg2 = new Image();

var cactusImg1 = new Image();
var cactusImg2 = new Image();
var cactusImg3 = new Image();
var cactusImg4 = new Image();

var groundImg1 = new Image();
var groundImg2 = new Image();

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var settings = {
    fullscreen: false,
    debug: false
};
var menu = {
    pause: true,
    menuState: 0
};
var standard = {
    jumpspeed: 35,
    height: 648,
}
var back1 = {
    x: 0,
}
var back2 = {
    x: 1920
}
var cactus1 = {
    x: -2000,
    y: standard.height
};
var cactus2 = {
    x: -2000,
    y: standard.height
};
var cactus3 = {
    x: -2000,
    y: standard.height
};
var cactus4 = {
    x: -2000,
    y: standard.height
};

var bird = {
    x: -2000,
    y: (standard.height + 100) - Math.random() * 300,
    animationState: 1,
    animation: 1,
    speed: 1.25
};

var player = {
    x: 200,
    y: standard.height,
    animationState: 5,
    animation: 1,
    jumping: false,
    jumpSpeed: standard.jumpspeed,
    gravitation: 2,
    crouch: false,
    speed: 24,
    dead: false,
    crouchValue: 8 * 8,
    deathFallSpeed: 0
};



window.addEventListener('keydown', function (event) {
    console.log(event)
    if (event.code === "KeyF") {
        toggleFullscreen();
    }
    if (event.code === "Space" && menu.pause === false && player.dead === false || event.code === "Space" && settings.debug === true) {
        jump();
    }
    if (event.code === "Space" && menu.pause === true && player.dead === false) {
        jump();
        unPause();
    }
    if (event.code === "ControlLeft" && menu.pause === false && player.dead === false || event.code === "ControlLeft" && settings.debug === true) {
        crouch();
    }
    if (event.code === "Escape" && player.dead === false) {
        toggleMenu();
    }
    if (event.code === "Enter" && player.dead === true) {
        revive();
    }
    if (event.code === "KeyT") {
        createParticles(player.x, player.y, 50, 5, "black", 1)
    }
});

window.addEventListener('keyup', function (event) {
    console.log(event);
    if (event.code === "ControlLeft" && menu.pause === false && player.dead === false || event.code === "ControlLeft" && settings.debug === true) {
        crouchEnd();
    }
    if (event.code === "KeyB") {
        toggleDebug();
    }
});
function toggleMenu() {
    if (menu.pause === false) {
        menu.pause = true;
        return;
    }
    if (menu.pause === true) {
        unPause();
        return;
    }
}
function toggleDebug() {
    if (settings.debug === false) {
        settings.debug = true;
        return;
    }
    if (settings.debug === true) {
        settings.debug = false;
        return;
    }
}


function toggleFullscreen() {
    if (settings.fullscreen === false) {
        if (canvas.RequestFullScreen) {
            canvas.RequestFullScreen();
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        } else {
            alert("This browser doesn't supporter fullscreen");
        }
    }
}

function showPlayer() {

    if (playerImg1.complete && player.animationState === 1 && player.animation === 1) {
        c.drawImage(playerImg1, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg1.src = 'Images/Player/Ostrich/player1.png';
    }
    if (playerImg2.complete && player.animationState === 1 && player.animation === 2) {
        c.drawImage(playerImg2, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg2.src = 'Images/Player/Ostrich/player2.png';
    }
    if (playerImg3.complete && player.animationState === 2) {
        c.drawImage(playerImg3, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg3.src = 'Images/Player/Ostrich/player3.png';
    }
    if (playerImg4.complete && player.animationState === 3 && player.animation === 1) {
        c.drawImage(playerImg4, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg4.src = 'Images/Player/Ostrich/player4.png';
    }
    if (playerImg5.complete && player.animationState === 3 && player.animation === 2) {
        c.drawImage(playerImg5, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg5.src = 'Images/Player/Ostrich/player5.png';
    }
    if (playerImg6.complete && player.animationState === 4) {
        c.drawImage(playerImg6, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg6.src = 'Images/Player/Ostrich/player6.png';
    }
    if (playerImg7.complete && player.animationState === 5) {
        c.drawImage(playerImg7, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg7.src = 'Images/Player/Ostrich/player7.png';
    }
}
function showObstacle() {

    if (birdImg1.complete && bird.animationState === 1 && bird.animation === 1) {
        c.drawImage(birdImg1, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg1.src = 'Images/Obstacles/bird1.png';
    }
    if (birdImg2.complete && bird.animationState === 1 && bird.animation === 2) {
        c.drawImage(birdImg2, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg2.src = 'Images/Obstacles/bird2.png';
    }

    if (cactusImg1.complete) {
        c.drawImage(cactusImg1, Math.floor(cactus1.x), Math.floor(cactus1.y), 256, 256);
        cactusImg1.src = 'Images/Obstacles/cactus1.png';
    }
    if (cactusImg2.complete) {
        c.drawImage(cactusImg2, Math.floor(cactus2.x), Math.floor(cactus2.y), 256, 256);
        cactusImg2.src = 'Images/Obstacles/cactus2.png';
    }
    if (cactusImg3.complete) {
        c.drawImage(cactusImg3, Math.floor(cactus3.x), Math.floor(cactus3.y), 256, 256);
        cactusImg3.src = 'Images/Obstacles/cactus3.png';
    }
    if (cactusImg4.complete) {
        c.drawImage(cactusImg4, Math.floor(cactus4.x), Math.floor(cactus4.y), 256, 256);
        cactusImg4.src = 'Images/Obstacles/cactus4.png';
    }
}
function showBackground() {
    if (groundImg1.complete) {
        c.drawImage(groundImg1, Math.floor(back1.x), Math.floor(standard.height + 248), 1920, 184);
        groundImg1.src = 'Images/Background/ground.png';
    }
    if (groundImg2.complete) {
        c.drawImage(groundImg2, Math.floor(back2.x), Math.floor(standard.height + 248), 1920, 184);
        groundImg2.src = 'Images/Background/ground.png';
    }
}
function update() {
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);



    showDebugMenu();
    showBackground();
    showObstacle();
    showPlayer();
    checkAir();
    moveObstacle();
    moveBackground();
    checkCollision();
    deathFall();
    particleArray.forEach(Particle => {
        Particle.update(particleArray);
    });
    showMenu();

}
function showMenu() {
    if (menu.menuState === 1) {

    }
}
function deathFall() {

    if (player.dead === true && player.y < standard.height) {
        player.y -= player.deathFallSpeed;
        player.deathFallSpeed -= player.gravitation;
    } else if (player.dead === true) {
        player.y = standard.height;
    }
}
function showDebugMenu() {
    if (settings.debug === true) {
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        if (player.crouch === false) {
            c.fillRect(player.x + 8 * 5, player.y + 8 * 9, 8 * 19, 8 * 23);
        } else {
            c.fillRect(player.x + 8 * 5, player.y + 8 * 9 + player.crouchValue, 8 * 19, 8 * 23 - player.crouchValue);
        }

        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(cactus1.x + 8 * 9, cactus1.y + 8 * 1, 8 * 14, 8 * 31);
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(cactus2.x + 8 * 5, cactus2.y + 8 * 8, 8 * 23, 8 * 24);
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(cactus3.x + 8 * 7, cactus3.y + 8 * 12, 8 * 12, 8 * 20);
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(cactus4.x + 8 * 3, cactus4.y + 8 * 23, 8 * 28, 8 * 9);

        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(bird.x + 8 * 4, bird.y + 8 * 8, 8 * 22, 8 * 10);
    }
}
function checkCollision() {
    if (player.x + 8 + 8 * 19 > cactus1.x + 8 * 9 && player.x + 8 * 2 < cactus1.x + 8 * 9 + 8 * 14 && player.y > standard.height - 8 * 31 && menu.pause === false) {
        die();
    }
    if (player.x + 8 + 8 * 19 > cactus2.x + 8 * 5 && player.x + 8 * 2 < cactus2.x + 8 * 5 + 8 * 23 && player.y > standard.height - 8 * 24 && menu.pause === false) {
        die();
    }
    if (player.x + 8 + 8 * 19 > cactus3.x + 8 * 7 && player.x + 8 * 2 < cactus3.x + 8 * 7 + 8 * 12 && player.y > standard.height - 8 * 20 && menu.pause === false) {
        die();
    }
    if (player.x + 8 + 8 * 19 > cactus4.x + 8 * 1 && player.x + 8 * 2 < cactus4.x + 8 * 1 + 8 * 31 && player.y > standard.height - 8 * 9 && menu.pause === false) {
        die();
    }
    if (player.x + 8 + 8 * 19 > bird.x + 8 * 4 && player.x + 8 < bird.x + 8 * 4 + 8 * 18 && player.y < bird.y + 8 * 4 + 8 * 10 && player.y + 8 * 9 + 8 * 23 > bird.y + 8 * 4 && menu.pause === false && player.crouch === false) {
        die();
    }
    if (player.x + 8 + 8 * 19 > bird.x + 8 * 4 && player.x + 8 < bird.x + 8 * 4 + 8 * 18 && player.y + player.crouchValue < bird.y + 8 * 4 + 8 * 10 && player.y + 8 * 9 + 8 * 23 > bird.y + 8 * 4 && menu.pause === false && player.crouch === true) {
        die();
    }
}
function unPause() {
    menu.pause = false;
    player.animationState = 1;
}
function die() {
    menu.menuState = 0;
    player.animationState = 4;
    player.dead = true;
    menu.pause = true;
    if (player.jumpSpeed != standard.jumpspeed && player.jumpSpeed < 0) {
        player.deathFallSpeed = player.jumpSpeed;
    } else if (player.jumpSpeed != standard.jumpspeed && player.jumpSpeed > 0) {
        player.jumpSpeed / 2;
    } else {
        player.deathFallSpeed = 0;
    }
}

function revive() {
    back1 = {
        x: 0,
    }
    back2 = {
        x: 1920
    }
    cactus1 = {
        x: -2000,
        y: standard.height
    };
    cactus2 = {
        x: -2000,
        y: standard.height
    };
    cactus3 = {
        x: -2000,
        y: standard.height
    };
    cactus4 = {
        x: -2000,
        y: standard.height
    };

    bird = {
        x: -2000,
        y: (standard.height + 100) - Math.random() * 300,
        animationState: 1,
        animation: 1,
        speed: 1.25
    };

    player = {
        x: 200,
        y: standard.height,
        animationState: 5,
        animation: 1,
        jumping: false,
        jumpSpeed: standard.jumpspeed,
        gravitation: 2,
        crouch: false,
        speed: 24,
        dead: false,
        crouchValue: 8 * 8,
        deathFallSpeed: 0
    };
    particleArray = [];
}

function moveObstacle() {
    if (menu.pause === false) {
        bird.x -= player.speed * bird.speed;
        cactus1.x -= player.speed;
        cactus2.x -= player.speed;
        cactus3.x -= player.speed;
        cactus4.x -= player.speed;

    }
}
function moveBackground() {
    if (menu.pause === false) {
        if (back1.x < -1920 + player.speed) {
            back1.x = 1920 - player.speed;
        }
        if (back2.x < -1920 + player.speed) {
            back2.x = 1920 - player.speed;
        }
        back1.x -= player.speed;
        back2.x -= player.speed;
    }
}

function checkAir() {
    if (player.y < standard.height && player.animationState !== 4 && player.animationState !== 5 && menu.pause === false) {
        up();
        player.inAir = true;
        player.animationState = 2;
    } else if (menu.pause === false) {
        player.inAir = false;
        player.jumpSpeed = standard.jumpspeed;
        player.y = standard.height;
        if (player.crouch === false && player.animationState !== 4 && player.animationState !== 5 && menu.pause === false) {
            player.animationState = 1;
        } else if (player.animationState !== 4 && player.animationState !== 5 && menu.pause === false) {
            player.animationState = 3;
        }
    }
}
function jump() {
    player.animationState = 2;
    player.y--;
}

function up() {
    if (player.animationState !== 2 && player.animationState !== 4) {
        player.animationState = 1;
    }
    if (player.animationState !== 4) {
        player.animationState = 2;
    }
    player.y -= player.jumpSpeed;
    player.jumpSpeed -= player.gravitation;
}

function crouch() {
    if (player.inAir === false) {
        player.animationState = 3;
        player.crouch = true;
    }
}
function crouchEnd() {
    player.crouch = false;
    if (player.animationState !== 2) {
        player.animationState = 1;
    }
};

function teleport() {
    if (menu.pause === false) {
        var chosen = Math.floor(Math.random() * 5);
        if (cactus1.x < -200 && chosen === 0) {
            cactus1.x = 2000 + (Math.random() * 300);
        }
        else if (cactus2.x < -200 && chosen === 1) {
            cactus2.x = 2000 + (Math.random() * 300);
        }
        else if (cactus3.x < -200 && chosen === 2) {
            cactus3.x = 2000 + (Math.random() * 300);
        }
        else if (cactus4.x < -200 && chosen === 3) {
            cactus4.x = 2000 + (Math.random() * 300);
        }
        else if (bird.x < -200 && chosen === 4) {
            bird.x = 2200 + (Math.random() * 300);
            bird.y = (standard.height - 50) - (Math.random() * 200);
        }
        else {
            chosen = Math.floor(Math.random() * 5);
        }
    }
}


var particleArray = [];

function createParticles(x, y, amount, spread, gravitation, color, size) {

    let newSize = size * 8;

    for (var i = 0; i < amount; i++) {
        particleArray.push(new Particle(x, y, newSize, color, spread, gravitation));
    }
}
function Particle(x, y, size, color, spread, gravitation) {

    this.size = size;
    this.x = x;
    this.y = y;
    this.spread = spread;
    this.gravitation = gravitation;
    this.color = color;
    this.velocity = {
        x: Math.random() * spread - (Math.random() * spread * 2) + spread / 2,
        y: this.gravitation / 2 + (this.gravitation / 2 * Math.random())
    };




    this.draw = function () {

        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.size, this.size);
    };
    this.update = particleArray => {


        this.draw();
        this.x += this.velocity.x;
        this.y -= this.velocity.y;
        this.velocity.y -= this.gravitation / 10 * Math.random();

        for (let i = 0; i < particleArray.length; i++){
            if(this.x === particleArray[i].x || this.y === particleArray[i].y){
                if(this.y > standard.height+248-this.size){
                    particleArray.splice(i, 1);
                }
            } 
        }

    }
}

setInterval(function () {

    if (player.animation === 1) {
        player.animation = 2;
        return;
    }
    if (player.animation === 2) {
        player.animation = 1;
        return;
    }
}, 100);

setInterval(function () {
    if (menu.pause === false) {
        if (bird.animation === 1) {
            bird.animation = 2;
            return;
        }
        if (bird.animation === 2) {
            bird.animation = 1;
            return;
        }
    }
}, 200);

setInterval(function () {
    if (player.dead === true) {
        createParticles(player.x + 200, player.y + 8 * 20, 2, 1, 3, "red", 1);
    }
}, 100)

setInterval(teleport, 1000)

setInterval(update, 16.66666666667);


