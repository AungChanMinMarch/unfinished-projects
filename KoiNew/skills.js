var busySword = false;
function swordAttack() {
    if (!busySword) {
        busySword = true;
        var index = 0;
        swordAtkAnimateArr = [0, 3, 4];

        var attacking = setInterval(() => {
            hero.no = swordAtkAnimateArr[index];
            index++;
            if (index > swordAtkAnimateArr.length) {
                hero.no = 0;
                clearInterval(attacking);
                // hero.imgs = oldImgs;
                busyWalk = false;
                busySword = false;
                index = 0;
            }
        }, 100);
    }
}

function laserArrow(ctx) {
    var center = 0.05 * innerWidth;
    var r = 0.04 * innerWidth;
    if (bulletsLeft >= 0) {
        ctx.clearRect(0, 0, 2 * center, 2 * center);
        ctx.beginPath();
        ctx.arc(center, center, r, 0, 2 * Math.PI, false);
        var grd = ctx.createRadialGradient(
            center,
            center,
            0,
            center,
            center,
            r
        );
        // Light color
        grd.addColorStop(0, "red");
        // Dark color
        grd.addColorStop(1, "#330000");
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.font = "20px Arial";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeText(bulletsLeft, 0.01 * innerWidth, 0.09 * innerWidth);
        ctx.fillStyle = "white";
        ctx.fillText(bulletsLeft, 0.01 * innerWidth, 0.09 * innerWidth);
    }
}
function bullet(x, y, color) {
    this.x = x;
    this.y = y;
    this.footY = hero.y + hero.height;
    // this.radius = radius;

    this.img = document.createElement("canvas");
    var ctx = this.img.getContext("2d");
    ctx.fillStyle = color;
    for (let i = noOfBulletTrail; i > 0; i--) {
        ctx.save();

        ctx.globalAlpha = 1 - 0.15 * i;

        ctx.beginPath();
        ctx.arc(6 * noOfBulletTrail - 5 * i, 5, 3, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    this.draw = function () {
        this.x += 3;
        gameCtx.drawImage(this.img, this.x, this.y);
    };
}
function bigSoldier() {
    setInterval(function () {
        if (bulletsLeft < 50) {
            bulletsLeft++;
            laserArrow(ctx);
        }
    }, 5000);
    var c = createCanvas(3);
    var ctx = c.getContext("2d");

    c.width = 0.1 * innerWidth;
    c.height = 0.1 * innerWidth;
    c.style.right = 0.1 * innerWidth + "px";
    c.style.bottom = 0.1 * innerWidth + "px";

    laserArrow(ctx);

    c.addEventListener(
        "click",
        () => {
            bulletsLeft--;
            bullets.push(
                new bullet(
                    hero.x + 0.7 * hero.width,
                    hero.y + 0.37 * hero.height,
                    "yellow"
                )
            );
            laserArrow(ctx);
        },
        false
    );

    return c;
}
