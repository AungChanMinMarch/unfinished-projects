//definationso
//There are four canvases currently: sky(static background), background, game & UI
//NOTE To create these four canvases, this function is created
function createCanvas(zIndex) {
    var canvas = document.createElement("canvas");
    canvas.style.zIndex = zIndex.toString();
    return canvas;
}

// //NOTE To advoid sub-pixeling, these two functions are created
function myDrawImage2(ctx, img, x, y, h) {
    for (let i = 2; i < arguments.length; i++) {
        arguments[i] = Math.floor(arguments[i]);
    }
    var w = Math.floor(h * (img.width / img.height));
    ctx.drawImage(img, x, y, w, h);
}
function myDrawImage3(ctx, img, sx, sy, sw, sh, x, y, w, h) {
    for (let i = 2; i < arguments.length; i++) {
        arguments[i] = Math.floor(arguments[i]);
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

// /*Some Dimensions*/
// var w = window.innerWidth;
// var h = window.innerHeight;

/* game variables*/
var roadX = 0;
var droadX = 0;
var minRoadX = 0;
var maxRoadX = 6 * innerWidth;
var maxRoadWidth = 7 * innerWidth;

var heroDisplayX = 0.4 * innerWidth;

var bulletsLeft = 50;
/*monsters*/
var noOfZombies = 5;
var noOfTowers = 4;

/*characters*/
var hero;
var zombies = [];
var towers = [];
var witches = [];
var myGameObjs = [];
// /*Heroes states*/
// var skillIcons;
var heroWalking;
var heroIsWalking = false;
// var busyWalk = false;

// var isBGmove = false;

var heroMovementSpeed = w * 0.005;
// var verticalSpeed = w * 0.024 + h * 0.016; //need to fixed

// var bullets = [];
var noOfBulletTrail = 4;
/*Canvases*/
var mySky = createCanvas(-2);
var myBackground = createCanvas(-1);
var myGame = createCanvas(1);
var myUI = createCanvas(2);
var canvasArr = [mySky, myBackground, myGame, myUI];
/*context*/
var skyCtx = mySky.getContext("2d");
var bgCtx = myBackground.getContext("2d");
var gameCtx = myGame.getContext("2d");
var UIctx = myUI.getContext("2d");

// /* Images */
// var moon = new Image();
// moon.src = "background/moon.png";

// var background = new Image();
// background.src = "background/background.png";

// mySky.style.backgroundColor = "blue";

function showCharacter() {
    document.getElementById("delay").style.display = "none";
    document.getElementById("characterList").style.display = "grid";
    document.body.requestFullscreen();
}
function quit() {
    alert("bye");
}
function choose(element) {
    document.getElementById("characterList").style.display = "none";
    /*TODO delete document.getElementsByClassName("control " + element)[0].style.display =
        "block";*/
    for (let i = 0; i < canvasArr.length; i++) {
        document.body.appendChild(canvasArr[i]);
    }
    //TODO creating towers
    for (let i = 0; i < noOfTowers; i++) {
        x = 1.5 * innerWidth * (i + 1);
        y = 0.785 * innerHeight;
        towers.push(new tower(x, y, 0, 0, innerHeight * 0.5, "tower"));
    }
    //creating hero
    hero = new character(
        innerWidth / 2,
        innerHeight * 0.7,
        0,
        0,
        innerHeight / 5,
        element
    );
    skillIcons = eval(element + "(" + ")");
    document.body.appendChild(skillIcons);
    //creating zombies
    for (let i = 0; i < noOfZombies; i++) {
        x = Math.random() * maxRoadWidth;
        y = Math.random() * 0.5 * innerHeight + 0.5 * innerHeight;
        zombies.push(
            new zombie(
                x,
                y,
                -innerWidth / 2000,
                innerHeight / 1000,
                innerHeight / 5,
                "zombie"
            )
        );
    }
    setInterval(function () {
        for (let i = 0; i < zombies.length; i++) {
            zombies[i].no = zombies[i].no < 2 ? zombies[i].no + 1 : 0;
        }
    }, 200);
    // game canvas
    animateGame();
    //resizing all canvases,  drawGame =>  UI canvas & bg canvas
    initialize();
}

function initialize() {
    // Register an event listener to call the resizeCanvas() function
    // each time the window is resized.
    window.addEventListener("resize", drawGame);
    // Draw canvas border for the first time.
    drawGame();
}

function drawGame() {
    //Resizing
    w = window.innerWidth;
    h = window.innerHeight;
    canvasArr.forEach((canvas) => {
        canvas.width = w;
        canvas.height = h;
    });
    //TODO resize and reposition characters
    //TODO resize and reposition joystick

    // drawing moon
    skyCtx.clearRect(0, 0, mySky.width, mySky.height);
    myDrawImage2(skyCtx, moon, w * 0.15, 0, w * 0.1 + h * 0.05);
    // drawing building and road (for the first time)
    // moving building and road is drawn inside joystick
    background.draw(0, w, h);
    // Creating joysick
    createjoystick(
        myUI,
        UIctx,
        0.1 * w + 0.1 * h,
        0.9 * h - 0.1 * w,
        w * 0.024 + h * 0.016,
        move,
        stopAnimate,
        true
    );
}

// moving building and road
function move(centerX, centerY, movedX, movedY) {
    if (!busyWalk) {
        if (moveTopLeft(centerX, movedX)) {
            droadX = -heroMovementSpeed;
            hero.dx = -heroMovementSpeed;
        } else if (moveBotRight(centerX, movedX)) {
            droadX = heroMovementSpeed;
            hero.dx = heroMovementSpeed;
        } else {
            droadX = 0;
            hero.dx = 0;
        }

        if (moveTopLeft(centerY, movedY)) hero.dy = -innerHeight * 0.01;
        else if (moveBotRight(centerY, movedY)) hero.dy = innerHeight * 0.01;
        else hero.dy = 0;

        if (!heroIsWalking) {
            heroIsWalking = true;
            heroWalking = setInterval(function () {
                hero.no = hero.no < 2 ? hero.no + 1 : 0;
            }, 75);
        }
    }
}
function stopAnimate() {
    droadX = 0; //to prevent start moving on mouseDoen (except first time)
    hero.dx = 0;
    hero.dy = 0;
    clearInterval(heroWalking);
    hero.no = 0;
    heroIsWalking = false;
}
function moveTopLeft(center, moved) {
    if (center - moved > (w + h) / 100) return true;
    return false;
}
function moveBotRight(center, moved) {
    if (moved - center > (w + h) / 100) return true;
    return false;
}

// drawing moving building and road
background.draw = function (x, w, h) {
    var displayWidth = 0;
    var displayHeight = h;
    var displayX = x;
    bgCtx.clearRect(0, 0, myBackground.width, myBackground.height);
    do {
        var remainingWidth = w - displayX;
        var actualWidth;
        var actualHeight = this.height;

        // var actualX = displayX == 0 ? this.sx % this.width : 0;
        var actualX =
            displayX == 0
                ? ((roadX * this.height) / innerHeight) % this.width
                : 0;

        actualWidth =
            displayX == 0
                ? this.width - actualX
                : remainingWidth * (actualHeight / displayHeight);
        if (actualWidth > this.width) actualWidth = this.width;

        var displayWidth = actualWidth * (displayHeight / this.height);

        myDrawImage3(
            bgCtx,
            background,
            actualX,
            0,
            actualWidth,
            actualHeight,
            displayX,
            0,
            displayWidth,
            displayHeight
        );
        displayX += displayWidth;
    } while (displayX < w);
};
