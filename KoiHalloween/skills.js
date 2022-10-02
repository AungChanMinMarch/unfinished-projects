function laserArrow(){
    bulletLeft = document.getElementById("bulletLeft");
    if(bulletLeft.innerHTML > 0){
        bulletLeft.innerHTML -= 1;
        bulletArray.push(new bullet(myHero.x + myHero.width*0.95, myHero.y + myHero.height*0.43, (w+h)*0.001, "yellow"));
    }else
        alert("Sorry you don't have any bulllets left")
}
// function shot(event){
//     if(!busyShot && !isPaused){
//         //busyShot = true;
//         busyWalk = true;
//         bulletArray.push(new bullet(gun.x, gun.y, event.clientX, event.clientY, (w+h)*0.002));
//         //setTimeout(() => { busyShot = false;}, atkSpeed);
//         setTimeout(() => { busyWalk = false;}, Speed);
//     }
// }
function bullet(x,y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    
    this.update = function(){
        this.x += 20;
        // this.draw();
        motionTrail(5, 0.1, this, this.radius,this.color, drawBullet)
    }
}

function speedUp(){
    myHero.isMotionTrail = !myHero.isMotionTrail;
    let w= myGame.canvas.width;
    let h = myGame.canvas.height;
    myHero.dx = (myHero.speedX == w*0.005) ? w*0.015 : w*0.005;
    myHero.dy = (myHero.speedY == h*0.01) ? h*0.025 : h*0.01;
}

function attack(){
    myHero.attack();
}