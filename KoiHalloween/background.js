function addImage(x, y, canvasWidth, height, imgID, ismoved) {
    this.imgID = imgID;
    this.img = document.getElementById(this.imgID);
    this.x = x;
    this.y = y;
    this.canvasWidth = canvasWidth;
    this.width = (height * this.img.width) / this.img.height;
    this.height = height;
    this.sx = 0;
    this.dsx = 0;

    this.draw = function () {
        //let bg1w, bg2w;//background images' width;
        if (ismoved) this.sx = myGame.iX;

        let bg1w = this.width - (this.sx % this.canvasWidth);
        bg1wr = bg1w * (this.img.width / this.canvasWidth);
        bg2w = this.canvasWidth - bg1w;
        bg2wr = this.img.width - bg1wr;

        ctx = myGame.canvas.getContext("2d");
        ctx.drawImage(
            this.img,
            bg2wr,
            0,
            bg1wr,
            this.img.height,
            0,
            0,
            bg1w,
            this.height
        );
        ctx.drawImage(
            this.img,
            0,
            0,
            bg2wr,
            this.img.height,
            bg1w,
            0,
            bg2w,
            this.height
        );
    };
}
/*
    let bg1wr, bg2wr;
    
    
    //this.sx = (this.sx > w)? this.sx-w : (this.sx<-w)? this.sx+w :this.sx;
    if(this.sx == 0){
        ctx.drawImage(img,this.x,this.y, this.width, this.height);
        /*if (this.dsx >= 0){
            maxReach = (this.sx >=maxReach) ? this.sx : maxReach;
            if ((maxReach % w) == 0){addmonsters()}
        }
    }else{
        bg1w = (w-(this.sx % w));
        bg1wr = bg1w*(img.width/w);
        bg2w = w-bg1w ;
        bg2wr = img.width - bg1wr;
        ctx.drawImage(img, bg2wr, 0, bg1wr, img.height, 0,0, bg1w, this.height);
        ctx.drawImage(img, 0, 0, bg2wr, img.height, bg1w,0, bg2w, this.height);
    }*/
