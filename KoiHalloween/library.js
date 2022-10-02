function motionTrail(noOfTrail, transparency, obj, r, color, abc) {
    for (let i = noOfTrail; i > 0; i--) {
        ctx.save();
        ctx.globalAlpha = 1 - transparency * i;
        abc(i, obj, r, color);
        ctx.restore();
    }
}
function drawHero(i, obj, w, h) {
    ctx = myGame.canvas.getContext("2d");
    let img = obj.imgIDs[obj.no];
    if (myGame.diX < 0 && (obj.name == "bigSoldier" || obj.name == "eki")) {
        ctx.save();
        ctx.translate(obj.x - 15 * i + w, obj.y);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, w, h);
        ctx.restore();
    } else {
        ctx.drawImage(img, obj.x - 15 * i, obj.y, w, h);
    }
}
function drawBullet(i, obj, r, color) {
    ctx.beginPath();
    ctx.arc(obj.x - 15 * i, obj.y, r, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawWalking(obj, imgNos, speed) {
    let j = 0;
    return setInterval(() => {
        if (j >= imgNos.length) j = 0;
        obj.no = imgNos[j];
        // if(obj.no == null) console.log(imgNos.length)
        j++;
    }, speed);
}

function moveTopLeft(center, moved) {
    if (center - moved <= myGame.canvas.width / 100) return true;
    return false;
}
function moveBottomRight(center, moved) {
    if (center - moved >= -myGame.canvas.width / 100) return true;
    return false;
}

function move() {
    this.init = function () {
        myHero.isWalking = true;
    };
    this.begin = function (centerX, centerY, movedX, movedY) {
        if (moveTopLeft(centerX, movedX)) myGame.diX = myHero.dx;
        if (moveBottomRight(centerX, movedX)) myGame.diX = -myHero.dx;
        if (moveTopLeft(centerY, movedY)) myHero.dy = myHero.speedY;
        if (moveBottomRight(centerY, movedY)) myHero.dy = -myHero.speedY;
        if (myHero.isWalking) {
            heroWalking = drawWalking(myHero, [1, 2], 135);
            myHero.isWalking = false;
        }
    };
    this.stop = function () {
        myGame.diX = 0;
        myHero.dy = 0;
        clearInterval(heroWalking);
        myHero.no = 0;
    };
}
