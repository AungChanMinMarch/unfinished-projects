function addCharacter(x, y, width, dx, dy, positionx, imgIDContainer) {
    this.name = imgIDContainer;
    this.imgIDs = document.getElementById(this.name).children;
    this.width = width;
    this.height = (this.width * this.imgIDs[0].height) / this.imgIDs[0].width;
    this.x = x;
    this.y = y;
    this.sx = x;
    this.sy = y;

    this.dx = dx;
    this.dy = dy;
    this.no = 0;
    this.canWalk = true;
    this.isMotionTrail = false;
    this.isWalking = false;
    this.update = function () {
        if (positionx(this.x)) {
            this.sx -= this.dx;
            this.x = this.sx - myGame.iX;
            footY = this.y + this.height;
            if (
                (footY < myGame.canvas.height * 0.5 && this.dy < 0) ||
                (footY > myGame.canvas.height * 0.95 && this.dy > 0)
            )
                this.dy = -this.dy;
        }
        this.y += this.dy;
    };
    this.draw = function () {
        if (this.x > 0 && this.x < myGame.canvas.width) {
            // this.y += this.dy;
            if (!this.isMotionTrail || !this.isWalking)
                drawHero(0, this, this.width, this.height);
            else motionTrail(10, 0.1, this, this.width, this.height, drawHero);
        }
    };

    this.stopWalking = function () {
        clearInterval(this.walking);
        this.canWalk = true;
        this.no = 0;
        this.isWalking = false;
    };
}
function zombiePositionX(x) {
    if (x > 0 && x <= myGame.maxX) return true;
    return false;
}
function heroPositionX(x) {
    return false;
}
