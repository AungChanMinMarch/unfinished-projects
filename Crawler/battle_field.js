var w = window.innerWidth;
var h = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("onclick", "shot(event)");
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");

var maxReach = 0;
//Start Library
function addImage(x, y, width, height, imgID){
        this.x = x;
		this.y = y;
		this.width = width;
        this.height = height;
        this.sx = 0;
        this.dsx = 0;
        this.imgID = imgID;
    this.draw = function() {
        let img = document.getElementById(this.imgID);
        let bg1w, bg2w;//background images' width
        this.dsx = (this.sx<=0 && this.dsx<0) ? 0 :this.dsx;//stop moving left while presssing
        this.sx += this.dsx;
        
        //this.sx = (this.sx > w)? this.sx-w : (this.sx<-w)? this.sx+w :this.sx;
        if(this.sx == 0){
            ctx.drawImage(img,this.x,this.y, this.width, this.height);
            /*if (this.dsx >= 0){
                maxReach = (this.sx >=maxReach) ? this.sx : maxReach;
                if ((maxReach % w) == 0){addmonsters()}
            }*/
        }else{
            bg1w = (this.sx > 0) ? (w-(this.sx % w)) :((-this.sx)%w);
            bg2w = w-bg1w ;
            ctx.drawImage(img, bg2w, 0, bg1w, this.height, 0,0, bg1w, this.height);
            ctx.drawImage(img, 0, 0, bg2w, this.height, bg1w,0, bg2w, this.height);
        }
    }
}
class bullet{
    constructor(x,y, targetX, targetY, radius){
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.radius = radius;
        //calculating annimate path
        this.hypotenuse = Math.sqrt((this.x-this.targetX)**2 + (this.y - this.targetY)**2);
        this.dx = 4*(this.targetX - this.x) / this.hypotenuse;
        this.dy = 4*(this.targetY - this.y) / this.hypotenuse;
    }
    draw(){
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.strokeStyle='blue';
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.fill();
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}
//end library

//Drawing gun man
var manWidth = (w+h)*0.318*0.3;//318 X 305 : image's dimension
var manHeight = (w+h)*0.305*0.3; //0.3 is to make to the image small
var manX = 0.1*w;
var manY = h*0.9-manHeight;
const gunMan = new addImage(manX, manY, manWidth, manHeight,  "oddMoveR");
//setting gun position
var gunX = manX + manWidth*0.5;
var gunY = manY + manHeight*0.5;
var i = 0;
//add background image
const myBackground = new addImage(0, 0, w, h, "background");

//adding monsters
function addmonsters(){
    console.log(i);
    i++;
    var isthere = (Math.floor(Math.random()*2)==0)?false : true;
    //var monsterX = w+Math
    
}
// //checking dead or alive monsters
// function isDead(){
//     for (let i = 0; i < bulletArray.length; i++) {
//         const element = bulletArray[i];
        
//     }
// }
var myKankrelat = new addImage(w-manWidth, h-manHeight, manWidth, manHeight, "kankrelat")
//Adding Score




//definging States
var busyShot = false;
var busyWalk = false;
var isPaused = false;


//Defining strengths
var atkSpeed = 300;
var Speed = 200;

//Events functions start here
function start(){
    let delayBox = document.getElementById("delay");
    delayBox.style.display = "none";

    document.body.appendChild(canvas);
   
    document.getElementById("control").style.display ="block";
    animate();
}
function quit(){
    alert("Bye bye");
}
var bulletArray = [];
function shot(event){
    if(!busyShot && !isPaused){
        //busyShot = true;
        busyWalk = true;
        bulletArray.push(new bullet(gunX, gunY, event.clientX, event.clientY, (w+h)*0.002));
        //setTimeout(() => { busyShot = false;}, atkSpeed);
        setTimeout(() => { busyWalk = false;}, Speed);
    }
}
function moveleft(){
    myBackground.dsx = (myBackground.sx > 0)? -w*0.005:0; //stop moving left at start
    busyWalk = true;
    busyShot = true;
    /*setTimeout(() => {
        background.dsx =0;
        }, 100);*/
}
function moveright(){
    myBackground.dsx = w*0.05;
    busyWalk = true;
    busyShot = true;
    //myScore.dscore =10;
    /*setTimeout(() => {
        background.dsx =0;
        }, 100);*/
}
function stop(){
    setTimeout(() => {
        busyWalk = false;
        busyShot = false;
        myBackground.dsx =0;
        }, Speed);
}
function openBackPack(){
    isPaused = !isPaused;
}
function animate(){
    if(!isPaused){
        ctx.clearRect(0,0,w,h);
        myBackground.draw(); // Walking
        gunMan.draw(); //Gunman
        myKankrelat.draw();
        //myScore.update();
        for (let i = 0; i < bulletArray.length; i++) {
            bulletArray[i].update();
        }
        //if (maxReach > 0.8*w && myBackground.sx )
    }
    requestAnimationFrame(animate);
}