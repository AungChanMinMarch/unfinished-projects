function animate() {
    if (!isPaused) {
        myGame.clear();

        myGameObjects = [];

        myGame.diX = myGame.iX < 0 && myGame.diX < 0 ? 0 : myGame.diX; //stop moving left while presssing
        myGame.diX =
            myGame.iX >= myGame.maxX && myGame.diX > 0 ? 0 : myGame.diX;
        myGame.iX += myGame.diX;

        mySky.draw();
        myMoon.draw();

        myBackground.draw();
        myJoyStick.draw();
        myHero.update();
        myGameObjects.push(myHero);
        for (let i = 0; i < bulletArray.length; i++) {
            bulletArray[i].update();
            myGameObjects.push(bulletArray[i]);
        }
        for (let i = 0; i < zombies.length; i++) {
            zombies[i].update();
            myGameObjects.push(zombies[i]);
        }
        //the following codes fix zombie and hero stack error
        //use two canvas, background and characters if the game is heavy
        myGameObjects.sort(function (a, b) {
            return a.y + a.height - (b.y + b.height);
        });
        for (let i = 0; i < myGameObjects.length; i++) {
            myGameObjects[i].draw();
        }
        requestAnimationFrame(animate);
    }
}
function step(timestamp) {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;

    // `Math.min()` is used here to make sure that the element stops at exactly 200px.
    element.style.transform =
        "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

    if (elapsed < 2000) {
        // Stop the animation after 2 seconds
        window.requestAnimationFrame(step);
    }
}
