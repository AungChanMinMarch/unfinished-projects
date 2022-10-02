function createjoystick(canvas, centerX, centerY, internalRadius, doObj, autoReturnToCenter){
    ctx = canvas.getContext("2d");
    var pressed = 0; // Bool - 1=Yes - 0=No

    var maxmove = internalRadius*3/4;
    var externalRadius = internalRadius*2;
    // Used to save current position of stick
	var movedX=centerX;
    var movedY=centerY;

    myDoObj = new doObj();
    //adding events
    // Check if the device support the touch or not
	if("ontouchstart" in document.documentElement)
	{
		canvas.addEventListener("touchstart", onTouchStart, false);
		canvas.addEventListener("touchmove", onTouchMove, false);
		canvas.addEventListener("touchend", stopJoy, false);
	}
	else
	{
		canvas.addEventListener("mousedown", onMouseDown, false);
		canvas.addEventListener("mousemove", onMouseMove, false);
		canvas.addEventListener("mouseup", stopJoy, false);
	}
    function onMouseDown(event){
        if(Math.sqrt((event.pageX-centerX)**2 +(event.pageY-centerY)**2) <= internalRadius){
            pressed = 1;
            myDoObj.init();
        }
    }
    function onTouchStart(event){
        if(Math.sqrt((event.targetTouches[0].pageX-centerX)**2 +
        (event.targetTouches[0].pageY-centerY)**2) <= internalRadius){
            pressed = 1;
            myDoObj.init();
        }
    }
    function onMouseMove(event){
        if(pressed == 1){
            movedX = event.pageX;
            movedY = event.pageY;
            myDoObj.begin(centerX, centerY, movedX, movedY);
        }
    }
    function onTouchMove(event){
        if(pressed == 1){
            movedX = event.targetTouches[0].pageX;
            movedY = event.targetTouches[0].pageY;
            myDoObj.begin(centerX, centerY, movedX, movedY);
        }
    }
    function stopJoy(event){
        pressed = 0;
        myDoObj.stop();
        if(autoReturnToCenter)
		{
			movedX = centerX;
			movedY = centerY;
        }//add else here
    }
    function drawExternal()
	{
		ctx.beginPath();
		ctx.arc(centerX, centerY, externalRadius, 0, 2*Math.PI, false);
		// context.lineWidth = externalLineWidth;
		// context.strokeStyle = externalStrokeColor;
		ctx.stroke();
    }
    function drawInternal()
	{
		ctx.beginPath();
        if(centerX - movedX > maxmove) { movedX=centerX - maxmove; }
		if((movedX - centerX) >maxmove) { movedX = centerX + maxmove; }
		if(centerY - movedY > maxmove) { movedY = centerY - maxmove; }
		if((movedY - centerY) > maxmove) { movedY = centerY + maxmove; }
		ctx.arc(movedX, movedY, internalRadius, 0, 2*Math.PI, false);
		// create radial gradient
		var grd = ctx.createRadialGradient(movedX, movedY, 2, movedX, movedY, 200);
		// Light color
		grd.addColorStop(0, "grey");
		// Dark color
		grd.addColorStop(1, "black");
		ctx.fillStyle = grd;
		ctx.fill();
		// context.lineWidth = internalLineWidth;
		// context.strokeStyle = internalStrokeColor;
		ctx.stroke();
    }
    this.draw = function(){
        drawExternal();
        drawInternal();
    }
}