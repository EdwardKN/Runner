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

var gameoverImg = new Image();
var logoImg = new Image();
var logoImg2 = new Image();

var ButtonDownLeft = new Image();
var ButtonUpLeft = new Image();
var ButtonDownRight = new Image();
var ButtonUpRight = new Image();
var ButtonMiddle = new Image();
var ButtonSmall = new Image();
var ButtonUp = new Image();
var ButtonRight = new Image();
var ButtonLeft = new Image();
var ButtonDown = new Image();
var ButtonLeftSided = new Image();
var ButtonRightSided = new Image();
var ButtonDouble = new Image();
var ButtonDownSided = new Image();
var ButtonUpperSided = new Image();
var ButtonDoubleVertical = new Image();

var runningMusic = new Audio('Sounds/Music/RunningMusicLevel1Bysawsquarenoise.mp3');
runningMusic.loop = true;

var gameOverMusic = new Audio('Sounds/Music/GameOverByPatrickdeArteaga.ogg')

var titleScreenMusic = new Audio('Sounds/Music/TitleScreenBysawsquarenoise.mp3')
titleScreenMusic.loop = true;

var loadingMusic = new Audio('Sounds/Music/Intro.mp3')
var loadingMusic2 = new Audio('Sounds/Music/Intro2.mp3')

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var loaded = false;
var loadingAlpha = 0;
var loadingState = 0;

var clicked = false;

var startTimer = false;

var fps = undefined;

var fpsMultiplier = fps / 60;

var particleArray = [];

var timeout = undefined;
var timeout2 = undefined;

var interval1 = undefined;

var settings = {
    fullscreen: false,
    debug: false
};
var menu = {
    pause: true,
    menuState: 0
};
var standard = {
    jumpspeed: 37.5,
    height: 648,
}
var mouse = {
    x: undefined,
    y: undefined,
    click: false
};

var back1 = undefined;
var back2 = undefined;

var cactus1 = undefined;
var cactus2 = undefined;
var cactus3 = undefined;
var cactus4 = undefined;

var bird = undefined;

var player = undefined;

setTimeout(() => {
    startTimer = true;
}, 1000);

function init() {
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
        deathFallSpeed: 0,
        crouchCooldownValue: 0
    };
};

function start() {

    if (clicked === true) {
        preload();


        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        if (loadingState === 0) {
            loadingAlpha += 0.005 / fpsMultiplier;
            if (loadingAlpha > 1.5) {
                loadingState = 1;
            }
            if (logoImg.complete) {
                c.globalAlpha = loadingAlpha;
                c.drawImage(logoImg, Math.floor(420), Math.floor(0), 1080, 1080);
                logoImg.src = 'Images/Menu/logo.png';
                c.globalAlpha = 1;
            }
        } else if (loadingState === 1) {
            if (loadingAlpha <= 0.01) {
                loadingAlpha = 0;
                setTimeout(() => {
                    loadingState = 2;
                }, 1500);
            } else {
                loadingAlpha -= 0.01 / fpsMultiplier;
            }
            if (logoImg.complete) {
                c.globalAlpha = loadingAlpha;
                c.drawImage(logoImg, Math.floor(420), Math.floor(0), 1080, 1080);
                logoImg.src = 'Images/Menu/logo.png';
                c.globalAlpha = 1;
            }
        } else {
            loadingAlpha += 0.002 / fpsMultiplier;
            if (loadingAlpha > 1.25) {
                loadingState = 3;
            }
            if (logoImg2.complete) {
                c.globalAlpha = loadingAlpha;
                c.drawImage(logoImg2, Math.floor(420), Math.floor(0), 1080, 1080);
                logoImg2.src = 'Images/Menu/logo2.png';
                c.globalAlpha = 1;
            }
        }
    }
}
init();
start();


window.addEventListener('click', function () {
    if (clicked === false && startTimer === true) {
        loadingMusic.play();
        clicked = true;
        toggleFullscreen();
        timeout2 = setTimeout(function () {
            loaded = true;
            clearTimeout(timeout2);
            titleScreenMusic.play();
            menu.menuState = 1;
            timeout2 = undefined;

        }, 17000);
        setTimeout(() => {
            loadingMusic2.play();
        }, 9000);
    }
    if (mouse.click === false) {
        mouse.click = true;
        setTimeout(() => {
            mouse.click = false;
        }, 1000 / fps);
    }
})
canvas.addEventListener('mousemove', function (event) {
    let tmpXmulti = 1920 / screen.width;
    let tmpYmulti = 1080 / screen.height;
    if (document.fullscreenElement) {
        mouse.x = event.offsetX * tmpXmulti;
        mouse.y = event.offsetY * tmpYmulti;
    } else {
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
    };
});


window.addEventListener('keydown', function (event) {
    console.log(event)
    if (clicked === false && startTimer === true) {
        loadingMusic.play();
        clicked = true;
        toggleFullscreen();
        timeout2 = setTimeout(function () {
            loaded = true;
            clearTimeout(timeout2);
            titleScreenMusic.play();
            menu.menuState = 1;
            timeout2 = undefined;

        }, 17000);
        setTimeout(() => {
            loadingMusic2.play();
        }, 9000);
    }
    if (event.code === "KeyP") {
        window.close();
    }
    if (event.code === "KeyD") {
        loaded = true;
        clearTimeout(timeout2);
        titleScreenMusic.play();
        menu.menuState = 1;
        timeout2 = undefined;
        loadingMusic.pause();
        loadingState = 1000;
        loadingAlpha = 1000000000000;
    }
    if (loaded === true) {

        if (event.code === "KeyF") {
            toggleFullscreen();
        }
        if (event.code === "Space" || event.code === "ArrowUp") {
            if (menu.pause === false && player.dead === false) {
                jump();
            }
        }
        if (event.code === "Space" || event.code === "ArrowUp") {
            if (menu.pause === true && player.dead === false) {
                jump();
                unPause();
            }
        }
        if (event.code === "ControlLeft" || event.code === "ArrowDown") {
            if (menu.pause === false && player.dead === false && player.crouchCooldownValue < 25) {
                crouch();
            }
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
    }
});

window.addEventListener('keyup', function (event) {
    if (loaded === true) {
        if (event.code === "ControlLeft" || event.code === "ArrowDown") {
            if (menu.pause === false && player.dead === false) {
                crouchEnd();
            }
        }
        if (event.code === "KeyB") {
            toggleDebug();
        }
    }
});

function preload() {
    if (playerImg1.complete) {
        c.drawImage(playerImg1, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg1.src = 'Images/Player/Ostrich/player1.png';
    }
    if (playerImg2.complete) {
        c.drawImage(playerImg2, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg2.src = 'Images/Player/Ostrich/player2.png';
    }
    if (playerImg3.complete) {
        c.drawImage(playerImg3, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg3.src = 'Images/Player/Ostrich/player3.png';
    }
    if (playerImg4.complete) {
        c.drawImage(playerImg4, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg4.src = 'Images/Player/Ostrich/player4.png';
    }
    if (playerImg5.complete) {
        c.drawImage(playerImg5, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg5.src = 'Images/Player/Ostrich/player5.png';
    }
    if (playerImg6.complete) {
        c.drawImage(playerImg6, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg6.src = 'Images/Player/Ostrich/player6.png';
    }
    if (playerImg7.complete) {
        c.drawImage(playerImg7, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg7.src = 'Images/Player/Ostrich/player7.png';
    }
    if (birdImg1.complete) {
        c.drawImage(birdImg1, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg1.src = 'Images/Obstacles/bird1.png';
    }
    if (birdImg2.complete) {
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
    if (groundImg1.complete) {
        c.drawImage(groundImg1, Math.floor(back1.x), Math.floor(standard.height + 248), 1920, 184);
        groundImg1.src = 'Images/Background/ground.png';
    }
    if (groundImg2.complete) {
        c.drawImage(groundImg2, Math.floor(back2.x), Math.floor(standard.height + 248), 1920, 184);
        groundImg2.src = 'Images/Background/ground.png';
    }
    if (gameoverImg.complete) {
        c.drawImage(gameoverImg, Math.floor(0), Math.floor(0), 1920, 640);
        gameoverImg.src = 'Images/Menu/gameover.png';
    }
}

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
    if (settings.fullscreen === true) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            settings.fullscreen = false;
            return;
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            settings.fullscreen = false;
            return;
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            settings.fullscreen = false;
            return;
        }
    }
    if (settings.fullscreen === false) {
        if (canvas.RequestFullScreen) {
            canvas.RequestFullScreen();
            settings.fullscreen = true;
            return;
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
            settings.fullscreen = true;
            return;
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
            settings.fullscreen = true;
            return;
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
            settings.fullscreen = true;
            return;
        } else {
            alert("This Computer doesn't supporter fullscreen");
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
function showMenu() {
    if (menu.menuState === 1) {
        //if (showButton(2, 2, 5, 5) === true) {}
    }
    if (player.dead === true) {
        if (gameoverImg.complete) {
            c.drawImage(gameoverImg, Math.floor(0), Math.floor(0), 1920, 640);
            gameoverImg.src = 'Images/Menu/gameover.png';
        }
    }
}

function update() {
    if (loaded === true) {

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
        crouchCooldown();
        showMenu();



    } else if (clicked === true) {

        start();

    } else {

        c.fillStyle = 'black';

        c.fillRect(0, 0, canvas.width, canvas.height);
    }

}
function crouchCooldown() {
    if (player.crouch === true) {
        player.crouchCooldownValue += 1 / fpsMultiplier;
    } else if (player.crouchCooldownValue > 0) {
        player.crouchCooldownValue -= 0.5 / fpsMultiplier;
    }
    if (player.crouchCooldownValue > 50) {
        crouchEnd();
    }
}

function deathFall() {

    if (player.dead === true && player.y < standard.height) {
        player.y -= player.deathFallSpeed / fpsMultiplier;
        player.deathFallSpeed -= player.gravitation / fpsMultiplier;
    } else if (player.dead === true) {
        player.y = standard.height;
    }
}
function showDebugMenu() {
    if (settings.debug === true) {
        c.font = "30px Arial";
        c.fillStyle = "black";
        c.fillText("FPS:"+fps,100,100);

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
    titleScreenMusic.pause();
    titleScreenMusic.currentTime = 0;
    menu.pause = false;
    player.animationState = 1;
    runningMusic.play();
    menu.menuState = 0;

}

function die() {
    timeout = setTimeout(revive, 30000)
    menu.menuState = 0;
    player.animationState = 4;
    player.dead = true;
    menu.pause = true;
    back1.x = (Math.floor(back1.x / 8)) * 8
    back2.x = (Math.floor(back2.x / 8)) * 8
    cactus1.x = (Math.floor(cactus1.x / 8)) * 8
    cactus2.x = (Math.floor(cactus2.x / 8)) * 8
    cactus3.x = (Math.floor(cactus3.x / 8)) * 8
    cactus4.x = (Math.floor(cactus4.x / 8)) * 8
    bird.x = (Math.floor(bird.x / 8)) * 8
    runningMusic.pause();
    runningMusic.currentTime = 0;
    gameOverMusic.play();
    if (player.jumpSpeed != standard.jumpspeed && player.jumpSpeed < 0) {
        player.deathFallSpeed = player.jumpSpeed;
    } else if (player.jumpSpeed != standard.jumpspeed && player.jumpSpeed > 0) {
        player.jumpSpeed / 2;
    } else {
        player.deathFallSpeed = 0;
    }
}

function revive() {
    clearTimeout(timeout);
    titleScreenMusic.play();
    menu.menuState = 1;
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;

    particleArray = [];

    init();
}

function moveObstacle() {
    if (menu.pause === false) {
        bird.x -= player.speed * bird.speed / fpsMultiplier;
        cactus1.x -= player.speed / fpsMultiplier;
        cactus2.x -= player.speed / fpsMultiplier;
        cactus3.x -= player.speed / fpsMultiplier;
        cactus4.x -= player.speed / fpsMultiplier;
    }
    if (player.dead === true) {
        bird.x -= (player.speed * bird.speed - player.speed) * 1.75 / fpsMultiplier;
    }
}
function moveBackground() {
    if (menu.pause === false) {
        if (back1.x < -1920 + player.speed / fpsMultiplier) {
            back1.x = 1920 - player.speed / fpsMultiplier;
        }
        if (back2.x < -1920 + player.speed / fpsMultiplier) {
            back2.x = 1920 - player.speed / fpsMultiplier;
        }
        back1.x -= player.speed / fpsMultiplier;
        back2.x -= player.speed / fpsMultiplier;
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
    player.y -= 1 / fpsMultiplier;
}

function up() {
    if (player.animationState !== 2 && player.animationState !== 4) {
        player.animationState = 1;
    }
    if (player.animationState !== 4) {
        player.animationState = 2;
    }
    player.y -= player.jumpSpeed / fpsMultiplier;
    player.jumpSpeed -= player.gravitation / fpsMultiplier;
}

function crouch() {
    if (player.inAir === false) {
        player.animationState = 3;
        player.crouch = true;
    }
}
function crouchEnd() {
    player.crouch = false;
    if (player.animationState !== 2 && menu.pause === false) {
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



function createParticles(x, y, amount, spread, gravitation, color, size, mode, modeSetting) {

    let newSize = size * 8;

    for (var i = 0; i < amount; i++) {
        particleArray.push(new Particle(x, y, newSize, color, spread, gravitation, mode, modeSetting));
    }
}
function Particle(x, y, size, color, spread, gravitation, mode, modeSetting) {

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
    this.mode = mode;
    this.modeSetting = modeSetting;



    this.draw = function () {

        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.size, this.size);
    };
    this.update = particleArray => {


        this.draw();
        if (this.mode !== 1 && this.mode !== 3 && menu.pause === false) {
            if (this.mode === 2 && this.modeSetting === 0) {
                this.x += spread - player.speed / 4 / fpsMultiplier;
            } else if (this.modeSetting === 1 && this.mode === 2) {
                this.x -= spread + player.speed / 4 / fpsMultiplier;
            } else {
                this.x -= player.speed / 4 / fpsMultiplier;
            }
        } else {
            if (this.mode === 0 || this.mode === 1) {
                this.x += this.velocity.x / fpsMultiplier;
            } else if (this.modeSetting === 0) {
                this.x += spread / fpsMultiplier;
            } else {
                this.x -= spread / fpsMultiplier;
            }
        }


        this.y -= this.velocity.y / fpsMultiplier;
        this.velocity.y -= this.gravitation / 10 * Math.random() / fpsMultiplier;

        for (let i = 0; i < particleArray.length; i++) {
            if (this.x === particleArray[i].x || this.y === particleArray[i].y) {
                if (this.y > standard.height + 248 - this.size || this.y < 0 || this.y > 1080) {
                    particleArray.splice(i, 1);
                }
            }
        }

    }
}

function button(x, y, width, height) {
    if (mouse.x > x && mouse.x < x + width && mouse.y > y && mouse.y < y + height) {
        if (mouse.click === true) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return 0;
    }
}
function showButton(x, y, w, h) {
    if (button(x * 8, y * 8, w * 40, h * 40) === 0) {
        c.fillStyle = "red"
        showNiceButton(x * 8, y * 8, w * 40, h * 40)
        return false;
    } else if (button(x * 8, y * 8, w * 40, h * 40) === 1) {
        c.fillStyle = "black"
        c.fillRect(x * 8, y * 8, w * 40, h * 40)
        return false;
    } else {
        c.fillStyle = "black"
        c.fillRect(x * 8, y * 8, w * 40, h * 40)
        return true;
    }
}

function showNiceButton(x, y, w, h) {
    if (w === 40 && h === 40) {
        if (ButtonSmall.complete) {
            c.drawImage(ButtonSmall, Math.floor(x), Math.floor(y), w, h);
            ButtonSmall.src = 'Images/Menu/Button/Small.png';
        }
    }
    if (w === 80 && h === 80) {
        if (ButtonUpLeft.complete) {
            c.drawImage(ButtonUpLeft, Math.floor(x), Math.floor(y), 40, 40);
            ButtonUpLeft.src = 'Images/Menu/Button/UpperLeft.png';
        }
        if (ButtonUpRight.complete) {
            c.drawImage(ButtonUpRight, Math.floor(x + (w / 2)), Math.floor(y), 40, 40);
            ButtonUpRight.src = 'Images/Menu/Button/UpperRight.png';
        }
        if (ButtonDownLeft.complete) {
            c.drawImage(ButtonDownLeft, Math.floor(x), Math.floor(y + (h / 2)), 40, 40);
            ButtonDownLeft.src = 'Images/Menu/Button/DownLeft.png';
        }
        if (ButtonDownRight.complete) {
            c.drawImage(ButtonDownRight, Math.floor(x + (w / 2)), Math.floor(y + (h / 2)), 40, 40);
            ButtonDownRight.src = 'Images/Menu/Button/DownRight.png';
        }
    }
    if (w > 80 && h === 80) {
        if (ButtonUpLeft.complete) {
            c.drawImage(ButtonUpLeft, Math.floor(x), Math.floor(y), 40, 40);
            ButtonUpLeft.src = 'Images/Menu/Button/UpperLeft.png';
        }
        if (ButtonUpRight.complete) {
            c.drawImage(ButtonUpRight, Math.floor(x + w - 40), Math.floor(y), 40, 40);
            ButtonUpRight.src = 'Images/Menu/Button/UpperRight.png';
        }
        if (ButtonDownLeft.complete) {
            c.drawImage(ButtonDownLeft, Math.floor(x), Math.floor(y + (h / 2)), 40, 40);
            ButtonDownLeft.src = 'Images/Menu/Button/DownLeft.png';
        }
        if (ButtonDownRight.complete) {
            c.drawImage(ButtonDownRight, Math.floor(x + w - 40), Math.floor(y + (h / 2)), 40, 40);
            ButtonDownRight.src = 'Images/Menu/Button/DownRight.png';
        }
        for (let i = 0; i < (w - 80) / 40; i++) {
            if (ButtonUp.complete) {
                c.drawImage(ButtonUp, Math.floor(x + 40 + i * 40), Math.floor(y), 40, 40);
                ButtonUp.src = 'Images/Menu/Button/Up.png';
            }
            if (ButtonDown.complete) {
                c.drawImage(ButtonDown, Math.floor(x + 40 + i * 40), Math.floor(y + 40), 40, 40);
                ButtonDown.src = 'Images/Menu/Button/Down.png';
            }
        }
    }
    if (w === 80 && h > 80) {
        if (ButtonUpLeft.complete) {
            c.drawImage(ButtonUpLeft, Math.floor(x), Math.floor(y), 40, 40);
            ButtonUpLeft.src = 'Images/Menu/Button/UpperLeft.png';
        }
        if (ButtonUpRight.complete) {
            c.drawImage(ButtonUpRight, Math.floor(x + w - 40), Math.floor(y), 40, 40);
            ButtonUpRight.src = 'Images/Menu/Button/UpperRight.png';
        }
        if (ButtonDownLeft.complete) {
            c.drawImage(ButtonDownLeft, Math.floor(x), Math.floor(y + (h - 40)), 40, 40);
            ButtonDownLeft.src = 'Images/Menu/Button/DownLeft.png';
        }
        if (ButtonDownRight.complete) {
            c.drawImage(ButtonDownRight, Math.floor(x + w - 40), Math.floor(y + (h - 40)), 40, 40);
            ButtonDownRight.src = 'Images/Menu/Button/DownRight.png';
        }
        for (let i = 0; i < (h - 80) / 40; i++) {
            if (ButtonLeft.complete) {
                c.drawImage(ButtonLeft, Math.floor(x), Math.floor(y + 40 + i * 40), 40, 40);
                ButtonLeft.src = 'Images/Menu/Button/Left.png';
            }
            if (ButtonRight.complete) {
                c.drawImage(ButtonRight, Math.floor(x + 40), Math.floor(y + 40 + i * 40), 40, 40);
                ButtonRight.src = 'Images/Menu/Button/Right.png';
            }
        }
    }
    if (w > 80 && h > 80) {
        if (ButtonUpLeft.complete) {
            c.drawImage(ButtonUpLeft, Math.floor(x), Math.floor(y), 40, 40);
            ButtonUpLeft.src = 'Images/Menu/Button/UpperLeft.png';
        }
        if (ButtonUpRight.complete) {
            c.drawImage(ButtonUpRight, Math.floor(x + w - 40), Math.floor(y), 40, 40);
            ButtonUpRight.src = 'Images/Menu/Button/UpperRight.png';
        }
        if (ButtonDownLeft.complete) {
            c.drawImage(ButtonDownLeft, Math.floor(x), Math.floor(y + (h - 40)), 40, 40);
            ButtonDownLeft.src = 'Images/Menu/Button/DownLeft.png';
        }
        if (ButtonDownRight.complete) {
            c.drawImage(ButtonDownRight, Math.floor(x + w - 40), Math.floor(y + (h - 40)), 40, 40);
            ButtonDownRight.src = 'Images/Menu/Button/DownRight.png';
        }
        for (let i = 0; i < (h - 80) / 40; i++) {
            if (ButtonLeft.complete) {
                c.drawImage(ButtonLeft, Math.floor(x), Math.floor(y + 40 + i * 40), 40, 40);
                ButtonLeft.src = 'Images/Menu/Button/Left.png';
            }
            if (ButtonRight.complete) {
                c.drawImage(ButtonRight, Math.floor(x + w - 40), Math.floor(y + 40 + i * 40), 40, 40);
                ButtonRight.src = 'Images/Menu/Button/Right.png';
            }
        }
        for (let i = 0; i < (w - 80) / 40; i++) {
            if (ButtonUp.complete) {
                c.drawImage(ButtonUp, Math.floor(x + 40 + i * 40), Math.floor(y), 40, 40);
                ButtonUp.src = 'Images/Menu/Button/Up.png';
            }
            if (ButtonDown.complete) {
                c.drawImage(ButtonDown, Math.floor(x + 40 + i * 40), Math.floor(y + h - 40), 40, 40);
                ButtonDown.src = 'Images/Menu/Button/Down.png';
            }
        }
        for (let i = 0; i < (h - 80) / 40; i++) {
            for (let g = 0; g < (w - 80) / 40; g++) {
                if (ButtonMiddle.complete) {
                    c.drawImage(ButtonMiddle, Math.floor(x + 40 + g * 40), Math.floor(y + 40 + i * 40), 40, 40);
                    ButtonMiddle.src = 'Images/Menu/Button/Middle.png';
                }
            }
        }
    }
    if (w > 40 && h === 40) {
        if (ButtonLeftSided.complete) {
            c.drawImage(ButtonLeftSided, Math.floor(x), Math.floor(y), 40, 40);
            ButtonLeftSided.src = 'Images/Menu/Button/LeftSided.png';
        }
        if (ButtonRightSided.complete) {
            c.drawImage(ButtonRightSided, Math.floor(x + w - 40), Math.floor(y), 40, 40);
            ButtonRightSided.src = 'Images/Menu/Button/RightSided.png';
        }
        for (let i = 0; i < (w-80) / 40; i++) {
            if (ButtonDouble.complete) {
                c.drawImage(ButtonDouble, Math.floor(x + 40+i*40), Math.floor(y), 40, 40);
                ButtonDouble.src = 'Images/Menu/Button/Double.png';
            }
        }
    }
    if (w === 40 && h > 40) {
        if (ButtonUpperSided.complete) {
            c.drawImage(ButtonUpperSided, Math.floor(x), Math.floor(y), 40, 40);
            ButtonUpperSided.src = 'Images/Menu/Button/UpperSided.png';
        }
        if (ButtonDownSided.complete) {
            c.drawImage(ButtonDownSided, Math.floor(x), Math.floor(y + h - 40), 40, 40);
            ButtonDownSided.src = 'Images/Menu/Button/DownSided.png';
        }
        for (let i = 0; i < (h-80) / 40; i++) {
            if (ButtonDoubleVertical.complete) {
                c.drawImage(ButtonDoubleVertical, Math.floor(x ), Math.floor(y+ 40+i*40), 40, 40);
                ButtonDoubleVertical.src = 'Images/Menu/Button/DoubleVertical.png';
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
    if (menu.pause === false || player.dead === true) {
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
        let randoms = Math.floor(Math.random() * 100)
        createParticles(player.x + 200, player.y + 8 * 20, 2, 1, 3, "rgb(" + (255 - randoms) + ", " + 0 + ", " + 0 + ")", 1, 0, 0);
    }
}, 100);

setInterval(function () {
    if (menu.pause === false) {
        createParticles(player.x + 96, player.y + 112, Math.floor(player.crouchCooldownValue / 12.5), 1, 6, "rgb(" + (255 - ((player.crouchCooldownValue / 50) * 255)) + ", " + (255 - ((player.crouchCooldownValue / 50) * 255)) + ", " + (255 - ((player.crouchCooldownValue / 50) * 255)) + ")", 1, 0, 0)
    }
}, 100 - player.crouchCooldownValue);


function updateFPS(thisFps) {
    clearInterval(interval1);
    interval1 = undefined;
    interval1 = setInterval(update, 1000 / thisFps);
    fpsMultiplier = thisFps / 60;
}

setInterval(teleport, 1000)
interval1 = setInterval(update, 1000 / fps);

setInterval(() => {
    fps = oldCount - oldCount3;
    oldCount3 = oldCount;
    if (fps !== oldFPS) {
        updateFPS(fps)
    }
    oldFPS = fps;
}, 1000);

var oldFPS = 0;

var oldCount3 = 0;
var oldCount2 = 0;
var oldCount = 0;

count()

function count() {
    requestAnimationFrame(count)

    oldCount = oldCount2;
    oldCount2++;
    return oldCount;

}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return -1;
}
//    document.cookie = `test=${true};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
//    getCookie("test") === -1 ? false : getCookie("test");