/**
 * This is JSDoc Comment. DOC comment is the comment which is documenting what a function or method does.
 * @description This is my favourite way of drawing joystick.
 * @param {*canvas DOM object} canvas
 * @param {*} doObj - function which will do when joysick is used
 * @param {*Boolean} autoReturnToCenter (optional) Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)
 */

function createjoystick(canvas, autoReturnToCenter) {
    var autoReturnToCenter = "undefined" ? true : autoReturnToCenter;
    ctx = canvas.getContext("2d");
    var pressed = false;
    var internalRadius = canvas.width / 4;

    var maxmove = (internalRadius * 3) / 4;
    var externalRadius = canvas.width * 0.49;
    // Used to save current position of stick

    var centerX = canvas.width * 0.5;
    var centerY = canvas.height * 0.5;
    var movedX = centerX;
    var movedY = centerY;

    function drawExternal() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, externalRadius, 0, 2 * Math.PI, false);
        // context.lineWidth = externalLineWidth;
        ctx.strokeStyle = "black";
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
            2,
            movedX,
            movedY,
            200
        );
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
    this.draw = function () {
        // Delete canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();
    };

    // myDoObj = new doObj();
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
        pressed = true;
    }
    function onTouchStart(event) {
        if (
            Math.sqrt(
                (event.targetTouches[0].pageX - centerX) ** 2 +
                    (event.targetTouches[0].pageY - centerY) ** 2
            ) <= internalRadius
        ) {
            pressed = 1;
            myDoObj.init();
        }
    }
    function onMouseMove(event) {
        if (pressed) {
            movedX = event.pageX;
            movedY = event.pageY;
            draw();
        }
    }
    function onTouchMove(event) {
        if (pressed == 1) {
            movedX = event.targetTouches[0].pageX;
            movedY = event.targetTouches[0].pageY;
            //   myDoObj.begin(centerX, centerY, movedX, movedY);
            draw();
        }
    }
    function stopJoy(event) {
        pressed = false;
        // myDoObj.stop();
        if (autoReturnToCenter) {
            movedX = centerX;
            movedY = centerY;
            draw();
            //canvas.unbind('mousemove');
        } //add else here
    }
}
