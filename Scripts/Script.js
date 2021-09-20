(function() {

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
var playerImg8 = new Image();

var birdImg1 = new Image();
var birdImg2 = new Image();

var cactusImg1 = new Image();
var cactusImg2 = new Image();
var cactusImg3 = new Image();
var cactusImg4 = new Image();

var groundImg1 = new Image();
var groundImg2 = new Image();
var hillImg1 = new Image();
var hillImg2 = new Image();
var hillImg3 = new Image();
var hillImg4 = new Image();
var hillImg5 = new Image();
var hillImg6 = new Image();
var skyImg = new Image();
var cloud1 = new Image();
var sunImg = new Image();

var gameoverImg = new Image();
var introImg = new Image();

var ostrichIcon = new Image();

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

var loadingMusic = new Audio('Sounds/Music/IntroByDavidRenda.mp3')

var introLevel1Music = new Audio('Sounds/Music/IntroLevel1ByPatrickdeArteaga.ogg')
introLevel1Music.loop = true;

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var loaded = false;
var loadingAlpha = 0;
var loadingState = 0;
var activated1 = false;
var activated2 = false;
var activated3 = false;


var clicked = false;

var startTimer = false;

var fps = undefined;

var fpsMultiplier = fps / 60;

var particleArray = [];

var timeout = undefined;
var timeout2 = undefined;

var interval1 = undefined;

var settings = {
    debug: false,
    name:getCookie("name") === -1 ? "" : getCookie("name"),
    type: false,
    sound:getCookie("sound") === -1 ? 1 : getCookie("sound"),
    music:getCookie("music") === -1 ? 1 : getCookie("music")
};
var menu = {
    pause: true,
    menuState: 0,
    mapSelected:"Desert",
    levelsDone:0,
    level:0,
    levelState:0
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

var game = {
    gamemode: "",
    leaderboard : []
};

var buttonArray = [];

buttonArray[34] = true;
buttonArray[38] = true;
buttonArray[62] = (settings.sound)*37
buttonArray[63] = (settings.music)*37

runningMusic.volume = settings.music;
loadingMusic.volume = settings.music;
titleScreenMusic.volume = settings.music;
gameOverMusic.volume = settings.music;
introLevel1Music.volume = settings.music;

var back1 = undefined;
var back2 = undefined;
var sun = undefined;

var cactus1 = undefined;
var cactus2 = undefined;
var cactus3 = undefined;
var cactus4 = undefined;

var bird = undefined;

var player = {distance:0,record:getCookie("record") === -1 ? -1 : getCookie("record")};

var dieTimeout


setTimeout(() => {
    startTimer = true;
}, 500);

function smallInit(){
    sun = {
        x:0,
        y:0,
        value:200,
        colorValue:1
    }
    back1 = {
        groundX: 0,
        hill1X:0,
        hill2X:0-240,
        hill3X:0-640,
        cloudX:0,
        cloudY:200
    }
    back2 = {
        groundX: 1920,
        hill1X:1920,
        hill2X:1920-240,
        hill3X:1920-640,
        cloudX:1400,
        cloudY:0
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

}
function init() {
    getScore();

    let distance = player.distance;
    let record = JSON.parse(player.record);
    
    sun = {
        x:0,
        y:0,
        value:200,
        colorValue:1
    }
    back1 = {
        groundX: 0,
        hill1X:0,
        hill2X:0-240,
        hill3X:0-640,
        cloudX:0,
        cloudY:200
    }
    back2 = {
        groundX: 1920,
        hill1X:1920,
        hill2X:1920-240,
        hill3X:1920-640,
        cloudX:1400,
        cloudY:0
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
        animationState: 6,
        animation: 1,
        jumping: false,
        jumpSpeed: standard.jumpspeed,
        gravitation: 2,
        crouch: false,
        speed: 24,
        dead: false,
        crouchValue: 8 * 8,
        deathFallSpeed: 0,
        crouchCooldownValue: 0,
        skin:"Ostrich",
        distance:distance,
        record:record
    };
    png_font.setup(
        document.getElementById("game").getContext("2d"));
};

function start() {

    if (clicked === true) {
        preload();


        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        
        introImg.src = 'Images/Menu/intro.png';
        c.drawImage(introImg,0,0,1920,1080)

        c.fillStyle = "white"
        c.fillRect(1424,800-40,4*8,4*8)

        if(loadingState === 0 && activated1 === false){
            activated3 = false;
            activated1 = true;
            setTimeout(() => {
                loadingState = 1;
            }, 500);
        }
        if(loadingState === 1 && activated2 === false){
            activated2 = true;
            activated1 = false;
            setTimeout(() => {
                loadingState = 2;
            }, 500);
        }
        if(loadingState === 2 && activated3 === false){
            activated3 = true;
            activated2 = false;
            setTimeout(() => {
                loadingState = 0;
            }, 500);
        }
        if(loadingState === 1){
            c.fillRect(1424+64,800-40,4*8,4*8)
        }
        if(loadingState === 2){
            c.fillRect(1424+64,800-40,4*8,4*8)
            c.fillRect(1424+128,800-40,4*8,4*8)
        }
    }
}
init();
start();


window.addEventListener('mousedown', function () {

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

        }, 12500);
    }
    if(clicked === true){
        toggleFullscreen();
    }
    if (mouse.click === false) {
        mouse.click = true;
    }

})
window.addEventListener('mouseup', function () {
    mouse.click = false;
});

canvas.addEventListener('mousemove', function (event) {
    let tmpXmulti = 1920 / screen.availWidth;
    let tmpYmulti = 1080 / screen.availHeight;
    if (document.fullscreenElement) {
        mouse.x = event.offsetX * tmpXmulti;
        mouse.y = event.offsetY * tmpYmulti;

        
    
    } else {
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
    };
});

window.addEventListener('keydown', function (event) {

    if(settings.type === true){
        if(event.code === "Backspace"){
            settings.name = settings.name.slice(0, -1);
        }
    }else{
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
        if (event.code === "KeyV") {
            window.close();
        }
        if (event.code === "KeyD" && loaded == false) {
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
                if(menu.level === 1 && menu.levelState === 3){
                    jump();
                    menu.pause = false;
                    player.animationState = 1;
                    runningMusic.play();
                    menu.levelState = 4
                }
            }

            if (event.code === "ControlLeft" || event.code === "ArrowDown") {
                if (menu.pause === false && player.dead === false && player.crouchCooldownValue < 55 && player.crouch === false) {
                    crouch();
                }
            }
            if (event.code === "KeyP" && player.dead === false) {
                toggleMenu();
            }
            if (event.code === "Enter" && player.dead === true) {
                if(menu.level === 0){
                clearTimeout(dieTimeout);
                getScore();
                let score = undefined;
                for(let i = 0; i<game.leaderboard.length; i++){
                    if(game.leaderboard[i].name == settings.name){
                        score = game.leaderboard[i].score;
                        
                    }
                }
                if(player.distance < score && score !== undefined || score == undefined && player.distance < player.record){
                    menu.menuState = 3;
                    player.record = player.distance;

                    player.distance = 0;
                    revive();

                }else{
                    player.record = player.distance;

                    player.distance = 0;
                    menu.menuState = 4;
                    getScore();

                    revive();

                }

            }else if(menu.level === 1){
                clearTimeout(dieTimeout);
                gameOverMusic.pause();
                gameOverMusic.currentTime = 0;
            
                particleArray = [];
                menu.menuState = 0;
                player.dead = false;

                menu.levelState = 1;
                titleScreenMusic.pause();
                titleScreenMusic.currentTime = 0;
                introLevel1Music.play();
                player.animationState = 6;
                smallInit();
                }
            }
            if (event.code === "KeyT") {
                createParticles(player.x, player.y, 50, 5, "black", 1)
            }
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (loaded === true) {
        if (event.code === "ControlLeft" || event.code === "ArrowDown") {
            if (menu.pause === false && player.dead === false && player.crouch === true) {
                crouchEnd();
            }
        }
        if (event.code === "KeyB") {
            toggleDebug();
        }
    }
});

window.addEventListener('keypress', function (event) {
    console.log(event)
    if(settings.type === true && settings.name.length < 16 && event.code !== "Enter"){
        settings.name += event.key;
    }
});

function preload() {
    if (playerImg1.complete) {
        c.drawImage(playerImg1, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg1.src = `Images/Player/Ostrich/player1.png`;
    }
    if (playerImg2.complete) {
        c.drawImage(playerImg2, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg2.src = `Images/Player/Ostrich/player2.png`;
    }
    if (playerImg3.complete) {
        c.drawImage(playerImg3, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg3.src = `Images/Player/Ostrich/player3.png`;
    }
    if (playerImg4.complete) {
        c.drawImage(playerImg4, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg4.src = `Images/Player/Ostrich/player4.png`;
    }
    if (playerImg5.complete) {
        c.drawImage(playerImg5, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg5.src = `Images/Player/Ostrich/player5.png`;
    }
    if (playerImg6.complete) {
        c.drawImage(playerImg6, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg6.src = `Images/Player/Ostrich/player6.png`;
    }
    if (playerImg7.complete) {
        c.drawImage(playerImg7, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg7.src = `Images/Player/Ostrich/player7.png`;
    }
    if (playerImg8.complete) {
        c.drawImage(playerImg8, Math.floor(player.x), Math.floor(player.y), 256, 256);
        playerImg8.src = `Images/Player/Ostrich/player8.png`;
    }
    

    if (birdImg1.complete) {
        c.drawImage(birdImg1, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg1.src = 'Images/Obstacles/Desert/bird1.png';
    }
    if (birdImg2.complete) {
        c.drawImage(birdImg2, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
        birdImg2.src = 'Images/Obstacles/Desert/bird2.png';
    }

    if (cactusImg1.complete) {
        c.drawImage(cactusImg1, Math.floor(cactus1.x), Math.floor(cactus1.y), 256, 256);
        cactusImg1.src = 'Images/Obstacles/Desert/cactus1.png';
    }
    if (cactusImg2.complete) {
        c.drawImage(cactusImg2, Math.floor(cactus2.x), Math.floor(cactus2.y), 256, 256);
        cactusImg2.src = 'Images/Obstacles/Desert/cactus2.png';
    }
    if (cactusImg3.complete) {
        c.drawImage(cactusImg3, Math.floor(cactus3.x), Math.floor(cactus3.y), 256, 256);
        cactusImg3.src = 'Images/Obstacles/Desert/cactus3.png';
    }
    if (cactusImg4.complete) {
        c.drawImage(cactusImg4, Math.floor(cactus4.x), Math.floor(cactus4.y), 256, 256);
        cactusImg4.src = 'Images/Obstacles/Desert/cactus4.png';
    }
    if (groundImg1.complete) {
        c.drawImage(groundImg1, Math.floor(back1.groundX), Math.floor(standard.height + 248), 1920, 184);
        groundImg1.src = 'Images/Background/Desert/ground.png';
    }
    if (groundImg2.complete) {
        c.drawImage(groundImg2, Math.floor(back2.groundX), Math.floor(standard.height + 248), 1920, 184);
        groundImg2.src = 'Images/Background/Desert/ground.png';
    }
    if (hillImg1.complete) {
        c.drawImage(hillImg1, Math.floor(back1.hill1X), Math.floor(standard.height + 248 - 240), 1920, 240);
        hillImg1.src = 'Images/Background/Desert/hill1.png';
    }
    if (hillImg2.complete) {
        c.drawImage(hillImg2, Math.floor(back2.hill1X), Math.floor(standard.height + 248 - 240), 1920, 240);
        hillImg2.src = 'Images/Background/Desert/hill1.png';
    }
    if (hillImg3.complete) {
        c.drawImage(hillImg3, Math.floor(back1.hill2X), Math.floor(standard.height + 248 - 240-40), 1920, 240);
        hillImg3.src = 'Images/Background/Desert/hill2.png';
    }
    if (hillImg4.complete) {
        c.drawImage(hillImg4, Math.floor(back2.hill2X), Math.floor(standard.height + 248 - 240-40), 1920, 240);
        hillImg4.src = 'Images/Background/Desert/hill2.png';
    }
    if (hillImg5.complete) {
        c.drawImage(hillImg5, Math.floor(back1.hill2X), Math.floor(standard.height + 248 - 240-40-60), 1920, 240);
        hillImg5.src = 'Images/Background/Desert/hill3.png';
    }
    if (hillImg6.complete) {
        c.drawImage(hillImg6, Math.floor(back2.hill2X), Math.floor(standard.height + 248 - 240-40-60), 1920, 240);
        hillImg6.src = 'Images/Background/Desert/hill3.png';
    }
    if (cloud1.complete) {
        c.drawImage(cloud1, Math.floor(back2.cloudX), Math.floor(back2.cloudY), 800, 400);
        cloud1.src = 'Images/Background/Desert/cloud1.png';
    }
    if (cloud1.complete) {
        c.drawImage(cloud1, Math.floor(back1.cloudX), Math.floor(back1.cloudY), 800, 400);
        cloud1.src = 'Images/Background/Desert/cloud1.png';
    }
    if (sunImg.complete) {
        c.drawImage(sunImg, Math.floor(sun.x), Math.floor(sun.y), 128, 128);
        sunImg.src = 'Images/Background/Desert/sun.png';
    }
    if (skyImg.complete) {
        c.drawImage(skyImg, Math.floor(0), Math.floor(0), 1920, 1080);
        skyImg.src = 'Images/Background/Desert/sky.png';
    }
    if (gameoverImg.complete) {
        c.drawImage(gameoverImg, Math.floor(0), Math.floor(0), 1920, 640);
        gameoverImg.src = 'Images/Menu/gameover.png';
    }
    if (ostrichIcon.complete) {
        c.drawImage(ostrichIcon, Math.floor(0), Math.floor(0), 128, 128);
        ostrichIcon.src = 'Images/Menu/SkinIcon/ostrich.png';
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

        if (canvas.RequestFullScreen) {
            canvas.RequestFullScreen();
            return;
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
            return;
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
            return;
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
            return;
        } else {
            alert("This Computer doesn't supporter fullscreen");
        }


    
}


function showPlayer() {
    if(player.skin !== ""){
        if (playerImg1.complete && player.animationState === 1 && player.animation === 1) {
            c.drawImage(playerImg1, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg1.src = `Images/Player/${player.skin}/player1.png`;
        }
        if (playerImg2.complete && player.animationState === 1 && player.animation === 2) {
            c.drawImage(playerImg2, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg2.src = `Images/Player/${player.skin}/player2.png`;
        }
        if (playerImg3.complete && player.animationState === 2) {
            c.drawImage(playerImg3, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg3.src = `Images/Player/${player.skin}/player3.png`;
        }
        if (playerImg4.complete && player.animationState === 3 && player.animation === 1) {
            c.drawImage(playerImg4, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg4.src = `Images/Player/${player.skin}/player4.png`;
        }
        if (playerImg5.complete && player.animationState === 3 && player.animation === 2) {
            c.drawImage(playerImg5, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg5.src = `Images/Player/${player.skin}/player5.png`;
        }
        if (playerImg6.complete && player.animationState === 4) {
            c.drawImage(playerImg6, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg6.src = `Images/Player/${player.skin}/player6.png`;
        }
        if (playerImg7.complete && player.animationState === 5) {
            c.drawImage(playerImg7, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg7.src = `Images/Player/${player.skin}/player7.png`;
        }
        if (playerImg8.complete && player.animationState === 6) {
            c.drawImage(playerImg8, Math.floor(player.x), Math.floor(player.y), 256, 256);
            playerImg8.src = `Images/Player/${player.skin}/player8.png`;
        }
    }
}
function showObstacle() {
    if(menu.mapSelected !== ""){
        if (cactusImg1.complete) {
            c.drawImage(cactusImg1, Math.floor(cactus1.x), Math.floor(cactus1.y), 256, 256);
            cactusImg1.src = `Images/Obstacles/${menu.mapSelected}/cactus1.png`;
        }
        if (cactusImg2.complete) {
            c.drawImage(cactusImg2, Math.floor(cactus2.x), Math.floor(cactus2.y), 256, 256);
            cactusImg2.src = `Images/Obstacles/${menu.mapSelected}/cactus2.png`;
        }
        if (cactusImg3.complete) {
            c.drawImage(cactusImg3, Math.floor(cactus3.x), Math.floor(cactus3.y), 256, 256);
            cactusImg3.src = `Images/Obstacles/${menu.mapSelected}/cactus3.png`;
        }
        if (cactusImg4.complete) {
            c.drawImage(cactusImg4, Math.floor(cactus4.x), Math.floor(cactus4.y), 256, 256);
            cactusImg4.src = `Images/Obstacles/${menu.mapSelected}/cactus4.png`;
        }

        if (birdImg1.complete && bird.animationState === 1 && bird.animation === 1) {
            c.drawImage(birdImg1, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
            birdImg1.src = `Images/Obstacles/${menu.mapSelected}/bird1.png`;
        }
        if (birdImg2.complete && bird.animationState === 1 && bird.animation === 2) {
            c.drawImage(birdImg2, Math.floor(bird.x), Math.floor(bird.y), 256, 256);
            birdImg2.src = `Images/Obstacles/${menu.mapSelected}/bird2.png`;
        }
    }
}
function showBackground() {

    if(menu.mapSelected !== ""){

    if (skyImg.complete) {
        c.drawImage(skyImg, Math.floor(0), Math.floor(0), 1920, 1080);
        skyImg.src = `Images/Background/${menu.mapSelected}/sky.png`;
    }
    if (sunImg.complete) {
        c.drawImage(sunImg, Math.floor(sun.x), Math.floor(sun.y), 128, 128);
        sunImg.src = `Images/Background/${menu.mapSelected}/sun.png`;
    }
    if (groundImg1.complete) {
        c.drawImage(groundImg1, Math.floor(back1.groundX), Math.floor(standard.height + 248), 1920, 184);
        groundImg1.src = `Images/Background/${menu.mapSelected}/ground.png`;
    }
    if (groundImg2.complete) {
        c.drawImage(groundImg2, Math.floor(back2.groundX), Math.floor(standard.height + 248), 1920, 184);
        groundImg2.src = `Images/Background/${menu.mapSelected}/ground.png`;
    }
    if (hillImg5.complete) {
        c.drawImage(hillImg5, Math.floor(back1.hill3X), Math.floor(standard.height + 248 - 240-56-56-48), 1920, 240);
        hillImg5.src = `Images/Background/${menu.mapSelected}/hill3.png`;
    }
    if (hillImg6.complete) {
        c.drawImage(hillImg6, Math.floor(back2.hill3X), Math.floor(standard.height + 248 - 240-56-56-48), 1920, 240);
        hillImg6.src = `Images/Background/${menu.mapSelected}/hill3.png`;
    }
    if (hillImg3.complete) {
        c.drawImage(hillImg3, Math.floor(back1.hill2X), Math.floor(standard.height + 248 - 240-56), 1920, 240);
        hillImg3.src = `Images/Background/${menu.mapSelected}/hill2.png`;
    }
    if (hillImg4.complete) {
        c.drawImage(hillImg4, Math.floor(back2.hill2X), Math.floor(standard.height + 248 - 240-56), 1920, 240);
        hillImg4.src = `Images/Background/${menu.mapSelected}/hill2.png`;
    }
    if (hillImg1.complete) {
        c.drawImage(hillImg1, Math.floor(back1.hill1X), Math.floor(standard.height + 248 - 240), 1920, 240);
        hillImg1.src = `Images/Background/${menu.mapSelected}/hill1.png`;
    }
    if (hillImg2.complete) {
        c.drawImage(hillImg2, Math.floor(back2.hill1X), Math.floor(standard.height + 248 - 240), 1920, 240);
        hillImg2.src = `Images/Background/${menu.mapSelected}/hill1.png`;
    }


    if (cloud1.complete) {
        c.drawImage(cloud1, Math.floor(back2.cloudX), Math.floor(back2.cloudY), 800, 400);
        cloud1.src = `Images/Background/${menu.mapSelected}/cloud1.png`;
    }
    if (cloud1.complete) {
        c.drawImage(cloud1, Math.floor(back1.cloudX), Math.floor(back1.cloudY), 800, 400);
        cloud1.src = `Images/Background/${menu.mapSelected}/cloud1.png`;
    }
    }else{
        if (skyImg.complete) {
            c.drawImage(skyImg, Math.floor(0), Math.floor(0), 1920, 1080);
            skyImg.src = 'Images/Background/Desert/sky.png';
        }
    }

}
function showMenu() {

    png_font.drawText(`fps:${fpsMultiplier*60}`, [0,0], "#403340", 1, null,  false);

    if (menu.menuState === 0) {
        if(menu.level === 0){
            if(player.distance < 1000){
                png_font.drawText(`Distance:${Math.floor(player.distance)}m`, [128,96], "#403340", 8, null,  false);
            }else{
                png_font.drawText(`Distance:${Math.floor(player.distance/10)/100}km`, [128,96], "#403340", 8, null,  false);
            }
        }

    }
    if (menu.menuState === 1) {
        png_font.drawText("Runner", [0,-72], "#403340", 24, null,  false);

        if(showButton(2,7,8,4,"Play",1, "click", 11)){
            menu.menuState = 2;
        }
        if(showButton(2,12,14,4,"Settings",1, "click", 12)){
            menu.menuState = 6;
        }
        if(showButton(2, 18, 4, 4, "", 1, "select", 13)){
            runningMusic = new Audio('Sounds/Music/DNA_Warrior_03.mp3');
        }
        if(showButton(8, 18, 4, 4, "", 1, "select", 14)){
            runningMusic = new Audio('Sounds/Music/nedladdning.mp3');
        }
        if(showButton(2, 18, 4, 4, "", 1, "select", 13) === false && 
        showButton(8, 18, 4, 4, "", 1, "select", 14) === false
        ){
            runningMusic = new Audio('Sounds/Music/RunningMusicLevel1Bysawsquarenoise.mp3');
        }

    }
    if (menu.menuState === 2) {
            if(showButton(11,6,10,4,"Story",1, "click", 21)){
                if(settings.name === "DetLängstaNamnet"){
                    menu.menuState = 7;
                }
        }


        if(showButton(27,6,13,4,"Endless",1, "click", 22)){
            menu.menuState = 3;
            menu.level = 0;
        }
        if(showButton(1,1,8,4,"Back",1, "click", 23)){
            menu.menuState = 1;
        }
    }
    if (menu.menuState === 3) {
        if(showButton(12,1,11,4,"Desert",1 ,"select", 34)){
            menu.mapSelected = "Desert"
        } 
        if(showButton(12,6,11,4,"Locked",1 ,"click", 35)){
            menu.mapSelected = ""
        } 
        if(showButton(25,1,11,4,"Locked",1 ,"click", 36)){
            menu.mapSelected = ""
        } 
        if(showButton(25,6,11,4,"Locked",1 ,"click", 37)){
            menu.mapSelected = ""
        }
        if(showButton(12,1,11,4,"Desert",1 ,"select", 34) === false && 
        showButton(12,6,11,4,"Locked",1 ,"click", 35) === false &&
        showButton(25,1,11,4,"Locked",1 ,"click", 36) === false &&
        showButton(25,6,11,4,"Locked",1 ,"click", 37) === false
        ){
            menu.mapSelected = ""
        }

        if(showButton(12,11,4,4,"",1 ,"select", 38)){
            player.skin = "Ostrich"
        } 
        if(showButton(18,11,4,4,"",1 ,"click", 39)){
            player.skin = ""
        } 
        if(showButton(26,11,4,4,"",1 ,"click", 310)){
            player.skin = ""
        } 
        if(showButton(32,11,4,4,"",1 ,"click", 311)){
            player.skin = ""
        }
        if(showButton(12,11,4,4,"",1 ,"select", 38) === false &&
        showButton(18,11,4,4,"",1 ,"click", 39) === false &&
        showButton(26,11,4,4,"",1 ,"click", 310) === false &&
        showButton(32,11,4,4,"",1 ,"click", 311) === false 
        ){
            player.skin = ""
        }

        if (ostrichIcon.complete) {
            c.drawImage(ostrichIcon, Math.floor(496), Math.floor(656-(5*40)), 128, 128);
            ostrichIcon.src = 'Images/Menu/SkinIcon/ostrich.png';
        }


        if(showButton(1,1,8,4,"Back",1, "click", 312)){
            menu.menuState = 2;
        }
        if(showButton(32,11,4,4,"",1 ,"click", 311)){
            player.skin = ""
        }


        if(showButton(20,22,8,4,"Play",1, "click", 313)){
            if(menu.mapSelected !== ""){
                unPause();
            }
        }
        if(showButton(14.5,16,19,4,"Leaderboard",1, "click", 315)){
            menu.menuState = 5;
            getScore();
        }

    }
    if(menu.menuState === 4){


        png_font.drawText("Submit record to leaderboard?", [0,24], "#403340", 8, null,  false);

        png_font.drawText("Name:", [0,128+80+16+40+40], "#403340", 8, null,  false);

        if(player.distance < 1000){
            png_font.drawText(`Distance:${Math.floor(player.record)}m`, [0,232+80+24+16+40+40], "#403340", 8, null,  false);
        }else{
            png_font.drawText(`Distance:${Math.floor(player.record/10)/100}km`, [0,232+80+24+16+40+40], "#403340", 8, null,  false);
        }

        if(showButton(13,22,8,4,"Nope",1, "click", 41)){
            menu.menuState = 3;
        
            settings.type = false;
            buttonArray[14] = false;

            document.cookie = `record=${player.record};Expires=Sun, 22 Oct 2020 08:00:00 UTC;`;

            document.cookie = `record=${player.record};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
            
            document.cookie = `name=${settings.name};Expires=Sun, 22 Oct 2020 08:00:00 UTC;`;

            document.cookie = `name=${settings.name};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
            player.distance = 0;
            settings.type = false;


        }
        if(showButton(26,22,11,4,"Submit",1, "click", 42)){
            settings.type = false;
            buttonArray[14] = false;
            

            let score = undefined;
            for(let i = 0; i<game.leaderboard.length; i++){
                if(game.leaderboard[i].name == settings.name){
                    score = game.leaderboard[i].score;
                }
            }

            if(settings.name !== "" && score < player.record ||settings.name !== "" && score === undefined){



                sendScore(settings.name, player.record);

                document.cookie = `name=${settings.name};Expires=Sun, 22 Oct 2020 08:00:00 UTC;`;

                document.cookie = `name=${settings.name};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
                settings.type = false;
                document.cookie = `record=${player.record};Expires=Sun, 22 Oct 2020 08:00:00 UTC;`;

                document.cookie = `record=${player.record};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
                player.distance = 0;
                if(player.distance !== 0){


                    menu.menuState = 3;

                }else{
                    menu.menuState = 5;
                    setTimeout(() => {
                        getScore();

                    }, 750);

                }
            }
        }
        if(showButton(8.5,7.5,28,4,"",1 ,"select", 43)){
            settings.type = true;
        }
        png_font.drawText(settings.name, [128*3,128+80+16+40+40], "#403340", 8, null,  false);

        
    }
    if(menu.menuState === 5){
        c.fillStyle =  "rgba(255, 255, 255, 0.8)"
        c.fillRect(0,0,1920,1080)

        if(showButton(1,1,8,4,"Back",1, "click", 51)){
            menu.menuState = 3;
        }
        if(showButton(10,1,37,4,"Submit to leaderboard?",1, "click", 52)){
            menu.menuState = 4;
            getScore();

        }
        
        for(let i = 0; i < 9; i++){
            if(game.leaderboard.length >= (i+1)){
                if(game.leaderboard[i].score < 1000){
                    if(game.leaderboard[i].name === settings.name){
                        png_font.drawText(`${i+1}.${game.leaderboard[i].name}(You):${Math.floor(game.leaderboard[i].score)}m`, [-8*1, i*96+256-64], "#403340", 8, null,  false);
                    }else{
                        png_font.drawText(`${i+1}.${game.leaderboard[i].name}:${Math.floor(game.leaderboard[i].score)}m`, [-8*1, i*96+256-64], "#403340", 8, null,  false);
                    }
                }else{
                    if(game.leaderboard[i].name === settings.name){
                        png_font.drawText(`${i+1}.${game.leaderboard[i].name}(You):${Math.floor(game.leaderboard[i].score/10)/100}km`, [-8*1, i*96+256-64], "#403340", 8, null,  false);
                    }else{
                        png_font.drawText(`${i+1}.${game.leaderboard[i].name}:${Math.floor(game.leaderboard[i].score/10)/100}km`, [-8*1, i*96+256-64], "#403340", 8, null,  false);
                    }
                }
            }
        }

    }
    if(menu.menuState === 6){
        if(showButton(1,1,8,4,"Back",1, "click", 61)){
            menu.menuState = 1;
        }
        settings.music = showButton(10,5,24,4,"Music",1, "slider", 63)
        settings.sound = showButton(10,9,24,4,"Sounds",1, "slider", 62)
        if(settings.music < 0.02){
            settings.music = 0;
        }
        if(settings.music >= 1){
            settings.music = 1;
        }
        if(settings.sound < 0.02){
            settings.sound = 0;
        }
        if(settings.sound >= 1){
            settings.sound = 1;
        }
        console.log(settings.music)
        runningMusic.volume = settings.music;
        loadingMusic.volume = settings.music;
        titleScreenMusic.volume = settings.music;
        gameOverMusic.volume = settings.music;
        introLevel1Music.volume = settings.music;

        document.cookie = `sound=${settings.sound};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
        document.cookie = `music=${settings.music};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;


        
    }
    if(menu.menuState === 7){
        if(showButton(1,1,8,4,"Back",1, "click", 23)){
            menu.menuState = 2;
        }
        if(showButton(11,6,4,4,"1",1, "click", 23)){
            menu.level = 1;
            menu.menuState = 0;
            menu.levelState = 1;
            titleScreenMusic.pause();
            titleScreenMusic.currentTime = 0;
            introLevel1Music.play();
            player.animationState = 6;
        }
        if(showButton(38,1,4,4,">",1, "click", 23)){

        }
        png_font.drawText("Dessert", [8*80,-24], "#403340", 2*8, null,  false);
        
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
        updateMetres();
        particleArray.forEach(Particle => {
            Particle.update(particleArray);
        });
        crouchCooldown();
        showMenu();
        calculateSun();
        useLevelStates();



    } else if (clicked === true) {

        start();

    } else {

        c.fillStyle = 'black';

        c.fillRect(0, 0, canvas.width, canvas.height);
    }

}
function useLevelStates(){
    if(menu.level === 1){
        if(menu.levelState === 1){
            if(showButton(1,1,8,4,"Back",1, "click", 23)){
                player.distance = 0;    
                menu.level = 0;
                menu.menuState = 7;
                menu.levelState = 0;
                titleScreenMusic.play();
                introLevel1Music.pause();
                introLevel1Music.currentTime = 0;
                player.animationState = 6;
            }
            if(mouse.x > player.x && mouse.x < player.x+256 && mouse.y > player.y && mouse.x < player.y+256){
                if(mouse.click === true){
                    menu.levelState = 2;
                    mouse.click = false;
                    introLevel1Music.pause();
                    introLevel1Music.currentTime = 0;
                    unPause();
                }

            }
        }
        if(menu.levelState === 2){
            if(cactus1.x < 700  && cactus1.x > 100 || cactus2.x < 700 && cactus2.x > 100|| cactus3.x < 700 && cactus3.x > 100|| cactus4.x < 700 && cactus4.x > 100){
                menu.pause = true;
                player.animationState = 5;
                runningMusic.pause();
                menu.levelState = 3
            }

        }
        if(menu.levelState === 3){
            png_font.drawText("Press -Space- to jump", [2,2], "#403340", 1*8, null,  false);

        }
    }
}
function calculateSun(){
    if(menu.pause === false){
        sun.value-=0.00025;
        if(sun.y > 540){
            sun.value-=0.0004;
        }
        if(menu.level === 1){
            sun.value-=0.001;
        }
    }   
    sun.value = sun.value%360

    sun.x=960*Math.cos(sun.value) + 960;
    sun.y=540*Math.sin(sun.value) + 540;
    
    if(sun.y > 400 && sun.colorValue <= 175){
        sun.colorValue += 0.2;
    }else if(sun.colorValue > 0){
        sun.colorValue -= 0.2;
    }
    if(sun.colorValue > 175){
        sun.colorValue = 175;
    }

    if(menu.menuState === 0 && player.dead === false){
        c.fillStyle = `rgba(${250-sun.colorValue}, ${75-sun.colorValue/2}, 0, ${(sun.colorValue)/255})`;
        c.fillRect(0,0,1920,1080)
    }
}
function updateMetres(){
    if(menu.pause === false){
        player.distance+=player.speed * 0.0048;
        if(menu.level !== 1){
            player.speed += 0.00128;
        }else{
            player.speed = 22;
        }
    }
}
function crouchCooldown() {
    if (player.crouch === true) {
        player.crouchCooldownValue += 1 / fpsMultiplier;
    } else if (player.crouchCooldownValue > 0) {
        player.crouchCooldownValue -= 0.5 / fpsMultiplier;
    }
    if (player.crouchCooldownValue > 75) {
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
    dieTimeout = setTimeout(function(){
        getScore();
                let score = undefined;
                for(let i = 0; i<game.leaderboard.length; i++){
                    if(game.leaderboard[i].name == settings.name){
                        score = game.leaderboard[i].score;
                        
                    }
                }
                if(player.distance < score && score !== undefined || score == undefined && player.distance < player.record){
                    menu.menuState = 3;
                    player.record = player.distance;

                    player.distance = 0;
                    revive();

                }else{
                    player.record = player.distance;

                    player.distance = 0;
                    menu.menuState = 4;
                    getScore();

                    revive();

                }
    },30000)

    menu.menuState = 0;
    player.animationState = 4;
    player.dead = true;
    menu.pause = true;
    back1.groundX = (Math.floor(back1.groundX / 8)) * 8
    back2.groundX = (Math.floor(back2.groundX / 8)) * 8
    back1.hill1X = (Math.floor(back1.hill1X / 8)) * 8
    back2.hill1X = (Math.floor(back2.hill1X / 8)) * 8
    back1.hill2X = (Math.floor(back1.hill2X / 8)) * 8
    back2.hill2X = (Math.floor(back2.hill2X / 8)) * 8
    back1.hill3X = (Math.floor(back1.hill3X / 8)) * 8
    back2.hill3X = (Math.floor(back2.hill3X / 8)) * 8
    back1.cloudX = (Math.floor(back1.cloudX / 8)) * 8
    back2.cloudX = (Math.floor(back2.cloudX / 8)) * 8
    back1.cloudY = (Math.floor(back1.cloudY / 8)) * 8
    back2.cloudY = (Math.floor(back2.cloudY / 8)) * 8
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
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;

    particleArray = [];

    init()
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
        if (back1.groundX < -1920 + player.speed / fpsMultiplier) {
            back1.groundX = 1920;
            back2.groundX = 0;
        }
        if (back2.groundX < -1920 + player.speed / fpsMultiplier) {
            back2.groundX = 1920;
            back1.groundX = 0;
        }
        back1.groundX -= player.speed / fpsMultiplier;
        back2.groundX -= player.speed / fpsMultiplier;

        if (back1.hill1X < -1920 + player.speed / fpsMultiplier) {
            back1.hill1X = 1920;
            back2.hill1X = 0;

        }
        if (back2.hill1X < -1920 + player.speed / fpsMultiplier) {
            back1.hill1X = 0;
            back2.hill1X = 1920;
        }
        back1.hill1X -= (player.speed / fpsMultiplier) * 0.71;
        back2.hill1X -= (player.speed / fpsMultiplier) *0.71;

        if (back1.hill2X < -1920 + player.speed / fpsMultiplier) {
            back1.hill2X = 1920;
            back2.hill2X = 0;

        }
        if (back2.hill2X < -1920 + player.speed / fpsMultiplier) {
            back1.hill2X = 0;
            back2.hill2X = 1920;
        }
        back1.hill2X -= (player.speed / fpsMultiplier) * 0.51;
        back2.hill2X -= (player.speed / fpsMultiplier) *0.51;

        if (back1.hill3X < -1920 + player.speed / fpsMultiplier) {
            back1.hill3X = 1920;
            back2.hill3X = 0;

        }
        if (back2.hill3X < -1920 + player.speed / fpsMultiplier) {
            back1.hill3X = 0;
            back2.hill3X = 1920;
        }
        back1.hill3X -= (player.speed / fpsMultiplier) * 0.17;
        back2.hill3X -= (player.speed / fpsMultiplier) *0.17;

        if (back1.cloudX < -900 + player.speed / fpsMultiplier) {
            back1.cloudX = 1920 + Math.random()*300;
            back1.cloudY = Math.random() * 150;
            back1.cloudY = (Math.floor(back1.cloudY / 8)) * 8;
        }
        if (back2.cloudX < -900 + player.speed / fpsMultiplier) {
            back2.cloudX = 1920 + Math.random()*300;
            back2.cloudY = Math.random() * 150;
            back2.cloudY = (Math.floor(back2.cloudY / 8)) * 8;
        }
        back1.cloudX -= (player.speed / fpsMultiplier) * 0.2;
        back2.cloudX -= (player.speed / fpsMultiplier) *0.2;
    }
    if(menu.level === 1 && menu.levelState === 1){
        if (back1.cloudX < -900 + 3 / fpsMultiplier) {
            back1.cloudX = 1920 + Math.random()*300;
            back1.cloudY = Math.random() * 150;
            back1.cloudY = (Math.floor(back1.cloudY / 8)) * 8;
        }
        if (back2.cloudX < -900 + 3 / fpsMultiplier) {
            back2.cloudX = 1920 + Math.random()*300;
            back2.cloudY = Math.random() * 150;
            back2.cloudY = (Math.floor(back2.cloudY / 8)) * 8;
        }
        back1.cloudX -= (3 / fpsMultiplier) * 0.2;
        back2.cloudX -= (3 / fpsMultiplier) *0.2;
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
        if(menu.level === 0){
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
        if(menu.level === 1){
            var chosen = Math.floor(Math.random() * 4);
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
            else {
                chosen = Math.floor(Math.random() * 4);
            }
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
function showButton(x, y, w, h,text,textSize, type, index, others) {

    if(type === "click"){
        buttonArray[index] = false;
        if (button(x * 40, y * 40, w * 40, h * 40) === 0) {
            c.fillStyle = "red"
            showNiceButton(x * 40, y * 40, w * 40, h * 40)
            png_font.drawText(text, [x*40+24,y*40], "#403340", textSize*8, null,  false);
            return false;
        } else if (button(x * 40, y * 40, w * 40, h * 40) === 1) {
            c.fillStyle = "black"
            c.fillRect(x * 40, y * 40, w * 40, h * 40)
            return false;
        } else {
            c.fillStyle = "black"
            c.fillRect(x * 40, y * 40, w * 40, h * 40)
            mouse.click = false;

            return true;
        }
    }
    if(type === "select"){

            if (button(x * 40, y * 40, w * 40, h * 40) === 0) {
                if(buttonArray[index] === true){
                    c.fillStyle = "black"
                    c.fillRect(x * 40, y * 40, w * 40, h * 40)
                    png_font.drawText(text, [x*40+24,y*40], "#858485", textSize*8, null,  false);
                }else{
                    c.fillStyle = "red"
                    showNiceButton(x * 40, y * 40, w * 40, h * 40)
                    png_font.drawText(text, [x*40+24,y*40], "#403340", textSize*8, null,  false);
                }
            } else if (button(x * 40, y * 40, w * 40, h * 40) === 1) {
                c.fillStyle = "black"
                c.fillRect(x * 40, y * 40, w * 40, h * 40)
            } else {
                c.fillStyle = "black"
                c.fillRect(x * 40, y * 40, w * 40, h * 40)
                mouse.click = false;
                if(buttonArray[index] === true){
                    buttonArray[index] = false;
                    return;
                }else{
                    buttonArray[index] = true;
                    if(others !== undefined){
                        for(let i = 0; i<others.length; i++){
                            buttonArray[others[i]] = false;
                        }
                    }
                    return;
                }

            
        }
        return buttonArray[index];
    }
    if(type === "slider"){
        if(buttonArray[index] === undefined){
            buttonArray[index] = 1;
        };
        if (button(x * 40+16, y * 40, w * 40-48, h * 40) === 0) {
                showNiceButton(x * 40, y * 40, w * 40, h * 40)
                png_font.drawText(text, [x*40+24,y*40], "#403340", textSize*8, null,  false);
                c.fillStyle = "#403340";
                c.fillRect(buttonArray[index]*w+x*40+4,y*40,16,h*40)
            
        } else if (button(x * 40+16, y * 40, w * 40-48, h * 40) === 1) {
            showNiceButton(x * 40, y * 40, w * 40, h * 40)
            png_font.drawText(text, [x*40+24,y*40], "#403340", textSize*8, null,  false);
            c.fillStyle = "black";

            c.fillRect(buttonArray[index]*w+x*40+4,y*40,16,h*40)

        } else {
            let tmp = (((mouse.x/40)-x)/w)*40;
            buttonArray[index] = (Math.floor(tmp / 0.66)) * 0.66
            showNiceButton(x * 40, y * 40, w * 40, h * 40)
            c.fillStyle = "black";

            c.fillRect(buttonArray[index]*w+x*40+4,y*40,16,h*40)


        
    }
    return buttonArray[index]/37;
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
        createParticles(player.x + 96, player.y + 112, Math.floor(player.crouchCooldownValue / 12.5), 1, 6, "rgb(" + (255 - ((player.crouchCooldownValue / 85) * 255)) + ", " + (255 - ((player.crouchCooldownValue / 85) * 255)) + ", " + (255 - ((player.crouchCooldownValue / 85) * 255)) + ")", 1, 0, 0)
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
function sendScore(username, score){
    const http = new XMLHttpRequest();   
    const url=`https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/updaterunner?username=${username}&score=${score}`;
    http.open("GET", url);
    http.send();
};
function getScore(){
    const http = new XMLHttpRequest();   
    const url=`https://l2niipto9l.execute-api.eu-north-1.amazonaws.com/test/getrunnerscore`;
    http.open("GET", url);
    http.send();

    http.onreadystatechange=(e)=>{
        game.leaderboard = JSON.parse(http.responseText);
    };
};

//    document.cookie = `test=${true};Expires=Sun, 22 Oct 2030 08:00:00 UTC;`;
//    getCookie("test") === -1 ? false : getCookie("test");

})();
