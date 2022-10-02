function animateGame() {
    if (isBGmove) {
        if (
            hero.roadX >= minRoadX + heroDisplayX &&
            hero.roadX <= maxRoadX + heroDisplayX
        ) {
            roadX += droadX;
        } else if (hero.roadX < minRoadX + heroDisplayX) roadX = minRoadX;
        else if (hero.roadX > maxRoadX + heroDisplayX) roadX = maxRoadX;

        background.draw(0, innerWidth, innerHeight);
    }
    gameCtx.clearRect(0, 0, myGame.width, myGame.height);
    myGameObjs = [];
    // hero.roadX =
    //     hero.roadX < 0 ? 0 : hero.roadX > 4.8 * w ? 4.8 * w : hero.roadX;

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
        for (let j = 0; j < zombies.length; j++) {
            if (bullets[i].x >= zombies[j].x)
                if (bullets[i].x <= zombies[j].x + zombies[j].width)
                    if (
                        Math.abs(
                            bullets[i].footY -
                                (zombies[j].y + zombies[j].height)
                        ) < 50
                    ) {
                        bullets.splice(i, 1);
                        zombies.splice(j, 1);
                        break;
                    }
        }
    }
    hero.update();
    myGameObjs.push(hero);

    for (let i = 0; i < zombies.length; i++) {
        zombies[i].update();
        myGameObjs.push(zombies[i]);
    }

    for (let i = 0; i < towers.length; i++) {
        towers[i].update();
        myGameObjs.push(towers[i]);
    }

    //the following codes fix zombie and hero stack error
    myGameObjs.sort(function (a, b) {
        return a.y + a.height - (b.y + b.height);
    });
    for (let i = 0; i < myGameObjs.length; i++) {
        myGameObjs[i].draw();
    }

    if (zombies.length > 0) window.requestAnimationFrame(animateGame);
    else alert("congratulation! You won");
}
