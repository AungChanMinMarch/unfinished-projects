class background{
    constructor(x, y, width, height){
        this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
    }
}
function background(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;   
    this.x = x;
    this.y = y;
    this.sx = 0;
    this.dsx = 0;
    this.maxHealth = 1000;
    this.score = 0;
    this.dscore =0;
    this.update = function() {
        switch(this.type){
            case "score":
                this.score += this
                ctx.font = "30px Arial";
                //ctx.fillText("Hello World",10,50);
                ctx.font = this.width + " " + this.height;
                //ctx.fillStyle = color;
                ctx.fillText("Score : "+ this., this.x, this.y);
                break;
            case "health":
                ctx.font = "30px Arial";
                //ctx.fillText("Hello World",10,50);
                //ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
                break;
            case "circle":
                break;
            case "image":
                let bg1w, bg2w;//background images' width
                this.sx += this.dsx;
                this.sx = (this.sx > w)? this.sx-w : (this.sx<-w)? this.sx+w :this.sx;
                
                if(this.sx == 0){
                    ctx.drawImage(bgImg,0,0)
                }else if (this.sx>0){
                    bg2w = this.sx %w;
                    bg1w = w-bg2w;
                }else{
                    bg1w = (-this.sx)%w;
                    bg2w = w - bg1w;
                }
                ctx.drawImage(bgImg, bg2w, 0, bg1w, h, 0,0, bg1w, h);
                ctx.drawImage(bgImg, 0, 0, bg2w, h, bg1w,0, bg2w, h);
                break;
            case "rect":
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
//creating canvas
var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.createElement("canvas");
canvas.setAttribute("onclick", "shot(event)");
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext("2d");

//add background image
var bgImg = document.getElementById("background");
let bg1w, bg2w;//background images' width
function updateBG(){
    sx += dsx;
    //this.sx = (this.sx > w)? this.sx-w : (this.sx<-w)? this.sx+w :this.sx;
    if(sx == 0){
        ctx.drawImage(bgImg,0,0)
    } else{
        if (sx>0){
            bg2w = sx %w;
            bg1w = w-bg2w;
        }else{
            bg1w = (-sx)%w;
            bg2w = w - bg1w;
        }
        ctx.drawImage(bgImg, bg2w, 0, bg1w, h, 0,0, bg1w, h);
        ctx.drawImage(bgImg, 0, 0, bg2w, h, bg1w,0, bg2w, h);
    }
    
}
                
                
                
                
//Start Functions

function start(){
    let delayBox = document.getElementById("delay");
    delayBox.style.display = "none";

    document.body.appendChild(canvas);
    
    document.getElementById("control").style.display ="block";
    
    animate();
}
function quit(){
    alert("Bye bye")
}
function shot(event){
    if(!busyShot){
        busyShot = true;
        busyWalk = true;
        var x = event.clientX;
        var y = event.clientY;
        bulletArray.push(new bullet(x,y,w*0.0025));
        setTimeout(() => { busyShot = false;}, atkSpeed);
        setTimeout(() => { busyWalk = false;}, Speed);
    }
}
function moveleft(){
    busyWalk = true;
    busyShot = true;
    background.dsx = -3;
    /*setTimeout(() => {
        background.dsx =0;
        }, 100);*/
}
function moveright(){
    background.dsx = 3;
    busyWalk = true;
    busyShot = true;
    myScore.dscore =10;
    /*setTimeout(() => {
        background.dsx =0;
        }, 100);*/
}
function stop(){
    myScore.dscore = 0;
    setTimeout(() => {
        busyWalk = false;
        busyShot = false;
        background.dsx =0;
        }, Speed);
}
function openBackPack(){
    isPaused = !isPaused;
}

//Animation
function animate(){
    if(!isPaused){
        ctx.clearRect(0,0,w,h);
        background.update(); // Walling
        gunMan.update(); //Gunman
        myScore.update();
        for (let i = 0; i < bulletArray.length; i++) {
            bulletArray[i].update();
        }
    }
    requestAnimationFrame(animate);
}