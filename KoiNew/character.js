function character(x, y, dx, dy, height, imgContainerID) {
    /*coordinates in canvas*/
    this.x = x;
    this.roadX = x;
    this.y = y - height;

    this.dx = dx;
    this.dy = dy;

    this.imgs = document.getElementById(imgContainerID).children;
    this.height = height;
    this.width = (this.height * this.imgs[0].width) / this.imgs[0].height;

    this.no = 0; //first position

    // this.touchTower = function () {
    //     for (let i = 0; i < towers.length; i++) {
    //         touchLeft = this.roadX - towerX(towers[i], 0, 0.75, 0.2, 1, this.y);
    //         touchRight =
    //             towerX(towers[i], 0.8, 0.75, 1, 1, this.y) - this.roadX;
    //         touchTop = this.y - (towers[i].y + towers[i].height * 0.75);
    //         TouchBot = towers[i].y + towers[i].height - this.y;
    //         if (
    //             touchLeft >= 0 &&
    //             touchRight >= 0 &&
    //             touchTop >= 0 &&
    //             TouchBot >= 0
    //         ) {
    //             switch (Math.min(touchTop, touchRight, TouchBot, touchLeft)) {
    //                 case touchTop:
    //                     if (this.dy > 0) this.dy = 0;
    //                     return "verticalTouch";

    //                 case TouchBot:
    //                     if (this.dy < 0) this.dy = 0;
    //                     return "verticalTouch";

    //                 case touchLeft:
    //                     this.roadX = towers[i].roadX;
    //                     if (this.dx > 0) {
    //                         droadX = 0;
    //                         this.dx = 0;
    //                     }
    //                     return "horizontalTouch";
    //                 case touchRight:
    //                     this.roadX = towers[i].roadX + towers[i].width;
    //                     if (this.dx < 0) {
    //                         droadX = 0;
    //                         this.dx;
    //                     }
    //                     return "horizontalTouch";
    //             }
    //         }
    //     }
    // };
    this.update = function () {
        if (this.roadX <= 0) {
            this.roadX = 0;
            if (this.dx < 0) this.dx = 0;
        }
        if (this.roadX + this.width >= maxRoadWidth) {
            this.roadX = maxRoadWidth - hero.width;
            if (hero.dx > 0) hero.dx = 0;
        }
        this.roadX += this.dx;
        this.x = this.roadX - roadX;

        if (
            (this.y + this.height <= innerHeight * 0.53 && hero.dy < 0) ||
            (this.y + this.height >= innerHeight && hero.dy > 0)
        )
            this.dy = 0;
        this.y += this.dy;
        // switch (this.touchTower()) {
        //     case "verticalTouch":
        //         this.x = this.roadX - roadX;
        //         this.roadX += this.dx;
        //         break;
        //     case "horizontalTouch":
        //         this.y += this.dy;
        //         break;
        //     default:
        //         this.roadX += this.dx;
        //         this.x = this.roadX - roadX;
        //         this.y += this.dy;
        //         break;
        // }
    };
    this.draw = function () {
        if (this.x >= 0 && this.x < innerWidth) {
            myDrawImage2(
                gameCtx,
                this.imgs[this.no],
                this.x,
                this.y,
                this.height
            );
        }
    };
}
function zombie(x, y, dx, dy, height, imgContainerID) {
    this.x = x;
    this.roadX = x;
    this.y = y - height;
    this.dx = dx;
    this.dy = dy;
    this.height = height;

    this.imgs = document.getElementById(imgContainerID).children;
    this.width = (this.height * this.imgs[0].width) / this.imgs[0].height;
    this.no = 0; //first position

    this.update = function () {
        this.roadX += this.dx;
        this.x = this.roadX - roadX;
        this.y += this.dy;

        if (this.roadX <= 0 || this.roadX + this.width >= maxRoadWidth)
            this.dx = -this.dx;
        if (
            this.y + this.height >= innerHeight ||
            this.y + this.height <= innerHeight * 0.53
        )
            this.dy = -this.dy;
    };

    this.draw = function () {
        if (this.x >= 0 && this.x < innerWidth) {
            myDrawImage2(
                gameCtx,
                this.imgs[this.no],
                this.x,
                this.y,
                this.height
            );
        }
        // TODO else draw (sx sy...)
    };
}
function tower(x, y, dx, dy, height, imgID) {
    /*coordinates*/
    // this.x = x;
    this.roadX = x;
    this.y = y - height;
    /*speed*/
    this.dx = dx;
    this.dy = dy;

    this.img = document.getElementById(imgID);

    this.height = height;
    this.width = (this.height * this.img.width) / this.img.height;

    this.update = function () {
        this.x = this.roadX - roadX;
    };
    this.draw = function () {
        if (this.x >= 0 && this.x < innerWidth) {
            myDrawImage2(gameCtx, this.img, this.x, this.y, this.height);
        }
    };
}

function towerX(obj, c1, d1, c2, d2, y) {
    return (
        (((c2 - c1) * obj.width) / ((d2 - d1) * obj.height)) * //slope
            (y - (obj.y + d1 * obj.height)) +
        (obj.x + c1 * obj.width)
    );
}
