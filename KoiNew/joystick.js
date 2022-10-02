/**
 * This is JSDoc Comment. DOC comment is the comment which is documenting what a function or method does.
 * @description This is my favourite way of drawing joystick.
 * @param {*canvas DOM object} canvas
 * @param {*} doObj - function which will do when joysick is used
 * @param {...Boolean} autoReturnToCenter (optional) Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)
 */
function createjoystick(
    canvas,
    ctx,
    centerX,
    centerY,
    internalRadius,
    doThis,
    stopThis,
    autoReturnToCenter
) {
    // Used to save current position of stick
    var movedX = centerX;
    var movedY = centerY;
    var maxmove = (internalRadius * 3) / 4;
    var externalRadius = internalRadius * 2;

    var autoReturnToCenter = "undefined" ? true : autoReturnToCenter;

    var pressed = false;

    function drawExternal() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, externalRadius, 0, 2 * Math.PI, false);
        // context.lineWidth = externalLineWidth;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000033";
        ctx.stroke();
    }
    function drawInternal() {
        ctx.beginPath();
        if (centerX - movedX > maxmove) {
            movedX = centerX - maxmove;
        }
        if (movedX - centerX > maxmove) {
            movedX = centerX + maxmove;
        }
        if (centerY - movedY > maxmove) {
            movedY = centerY - maxmove;
        }
        if (movedY - centerY > maxmove) {
            movedY = centerY + maxmove;
        }
        ctx.arc(movedX, movedY, internalRadius, 0, 2 * Math.PI, false);
        // create radial gradient
        var grd = ctx.createRadialGradient(
            movedX,
            movedY,
            0,
            movedX,
            movedY,
            internalRadius
        );
        // Light color
        grd.addColorStop(0, "#3333ff");
        // Dark color
        grd.addColorStop(1, "#000033");
        ctx.fillStyle = grd;
        ctx.fill();
        // context.lineWidth = internalLineWidth;
        // context.strokeStyle = internalStrokeColor;
        // ctx.stroke();
    }
    function draw() {
        // Delete canvas
        ctx.clearRect(0, 0, heroDisplayX, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();
    }

    /* Drawing for the first time*/
    draw();

    //adding events
    // Check if the device support the touch or not
    if ("ontouchstart" in document.documentElement) {
        canvas.addEventListener("touchstart", onTouchStart, false);
        canvas.addEventListener("touchmove", onTouchMove, false);
        canvas.addEventListener("touchend", stopJoy, false);
    } else {
        canvas.addEventListener("mousedown", onMouseDown, false);
        canvas.addEventListener("mousemove", onMouseMove, false);
        canvas.addEventListener("mouseup", stopJoy, false);
    }

    function onMouseDown(event) {
        if (
            Math.sqrt(
                (event.pageX - centerX) ** 2 + (event.pageY - centerY) ** 2
            ) <= externalRadius
        ) {
            pressed = true;
            onMouseMove(event);
        }
    }
    function onTouchStart(event) {
        if (
            Math.sqrt(
                (event.targetTouches[0].pageX - centerX) ** 2 +
                    (event.targetTouches[0].pageY - centerY) ** 2
            ) <= externalRadius
        ) {
            pressed = true;
            onTouchMove(event);
        }
    }
    function onMouseMove(event) {
        if (pressed) {
            isBGmove = true;
            movedX = event.pageX;
            movedY = event.pageY;
            draw();
            doThis(centerX, centerY, movedX, movedY);
        }
    }
    function onTouchMove(event) {
        if (pressed) {
            isBGmove = true;
            movedX = event.targetTouches[0].pageX;
            movedY = event.targetTouches[0].pageY;
            //   myDoObj.begin(centerX, centerY, movedX, movedY);
            draw();
            doThis(centerX, centerY, movedX, movedY);
        }
    }
    function stopJoy(event) {
        pressed = false;
        // myDoObj.stop();
        if (autoReturnToCenter) {
            movedX = centerX;
            movedY = centerY;
            draw();
        }
        isBGmove = false;
        stopThis();
        //add else here
    }
}
