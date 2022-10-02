//Defining strengths
var atkSpeed = 300;
var Speed = 200;

var w, h;
var bulletArray = [];
var zombies = [];

var bullets = [];
var noOfBulletTrail = 3;
//definging States
var isPaused = false; //used in animate

//Events functions start here
function showCharacter() {
    document.getElementById("delay").style.display = "none";
    document.getElementById("characterList").style.display = "grid";
}
function quit() {
    alert("Bye bye");
}

function choose(element) {
    document.getElementById("characterList").style.display = "none";
    document.getElementsByClassName("control " + element)[0].style.display =
        "block";

    init();

    myGame = new createGame();

    mySky = new addImage(0, 0, w, h, "sky", true);
    myMoon = new addImage(w * 0.2, 0, w * 0.2, h * 0.2, "moon", false);
    myBackground = new addImage(0, 0, w, h, "background", true);

    myHero = new addCharacter(
        w * 0.45,
        h * 0.7,
        (w + h) * 0.04,
        w * 0.005,
        h * 0.01,
        heroPositionX,
        element
    );
    myJoyStick = new createjoystick(
        myGame.canvas,
        w * 0.1,
        h - w * 0.075,
        w * 0.025,
        move,
        true
    );

    for (let i = 0; i < 10; i++) {
        let x = Math.random() * (myGame.maxX - myHero.x * 2) + myHero.x * 2;
        let y = Math.random() * (myGame.maxY - myGame.minY) + myGame.minY;
        zombies.push(
            new addCharacter(
                x,
                y,
                myHero.width,
                w * 0.00025,
                h * 0.02,
                zombiePositionX,
                "zombie"
            )
        );
        drawWalking(zombies[i], [0, 1, 2], 300);
        // zombies[i].isWalking = true;
    }
    //add more states e.g. HP, movement speed,...
    window.addEventListener("resize", function () {
        init();
        myGame.canvas.width = w;
        myGame.canvas.height = h;
        //add more resizing
    });
    animate();
}

function init() {
    w = window.innerWidth;
    h = window.innerHeight;
}
function createGame() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;

    document.body.appendChild(this.canvas);

    this.iX = 0;
    this.diX = 0;
    this.maxX = w * 4;
    this.maxY = 0.95 * h;
    this.minY = 0.5 * h;

    this.context = this.canvas.getContext("2d");
    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
}

// function everyinterval(n) {
//     if ((myGame.frameNo / n) % 1 == 0) {return true;}
//     return false;
// }
// function remove(arr,element){
//     const i = arr.indexOf(element);
//     if (i > -1)
//         arr.splice(element, 1);
// }
//end library

//adding monsters

// function moveleft(){
//     myBackground.dsx = (myBackground.sx > 0)? -w*0.01:0; //stop moving left at start
//     mySky.dsx = myBackground.dsx;
//     busyWalk = true;
//     busyShot = true;
//     /*setTimeout(() => {
//         background.dsx =0;
//         }, 100);*/
// }
// function moveright(){
//     myBackground.dsx = w*0.01;
//     mySky.dsx = myBackground.dsx;
//     busyWalk = true;
//     busyShot = true;
//     myHero.drawWalking();
//     //myScore.dscore =10;
//     /*setTimeout(() => {
//         background.dsx =0;
//         }, 100);*/
// }
// function stop(){
//     setTimeout(() => {
//         busyWalk = false;
//         busyShot = false;
//         myBackground.dsx =0;
//         mySky.dsx = myBackground.dsx;
//         }, Speed);
//     myHero.stopWalking();
// }
