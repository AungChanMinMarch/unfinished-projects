class cardMatch {
    constructor(cards) {
        this.cardsArray = cards;
        this.totalTime = 60;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
        this.winsteak = document.getElementById("winsteak");
        this.minFlip = document.getElementById("min-flip");
        this.maxTime = document.getElementById("max-time");
        this.bestFlip = Infinity;
        this.bestTime = -Infinity;
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 150);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach((card) => {
            card.children[0].style.display = "flex";
            card.children[1].style.display = "none";
        });
    }
    canFlipCard(card) {
        return (
            !this.busy &&
            !this.matchedCards.includes(card) &&
            card !== this.cardToCheck
        );
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;

            card.children[0].style.display = "none";
            card.children[1].style.display = "flex";

            if (this.totalClicks % 2 == 0) {
                this.busy = true;
                this.checkForCardMatch(card);
            } else this.cardToCheck = card;
        }
    }
    checkForCardMatch(card) {
        if (card.getAttribute("name") === this.cardToCheck.getAttribute("name"))
            this.cardMatch(card, this.cardToCheck);
        else this.cardMisMatch(card, this.cardToCheck);
        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        setTimeout(() => {
            card1.children[1].style.display = "none";
            card2.children[1].style.display = "none";
        }, 150);
        this.timeRemaining += 1.5;
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if (this.matchedCards.length === this.cardsArray.length) this.victory();
        else this.busy = false;
    }
    cardMisMatch(card1, card2) {
        setTimeout(() => {
            this.timeRemaining -= 0.5;
            card1.children[0].style.display = "flex";
            card1.children[1].style.display = "none";
            card2.children[0].style.display = "flex";
            card2.children[1].style.display = "none";
            this.busy = false;
        }, 300);
    }
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining -= 0.15;
            this.timer.innerText = this.timeRemaining.toFixed(2);
            if (this.timeRemaining <= 0) this.gameOver();
        }, 150);
    }
    gameOver() {
        clearInterval(this.countDown);
        this.winsteak.innerText = 0;
        this.totaltime = 60;
        this.maxTime.innerText = " - ";
        this.minFlip.innerText = " - ";
        document.getElementById("game-over-text").style.display = "flex";
    }
    victory() {
        clearInterval(this.countDown);
        this.winsteak.innerText = parseInt(this.winsteak.innerText) + 1;

        this.bestTime =
            this.bestTime > this.timeRemaining
                ? this.bestTime
                : this.timeRemaining;
        this.maxTime.innerText = this.bestTime.toFixed(2);

        this.bestFlip =
            this.bestFlip < this.totalClicks ? this.bestFlip : this.totalClicks;
        this.minFlip.innerText = this.bestFlip;

        this.totalTime -= 5;
        document.getElementById("victory-text").style.display = "flex";
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new cardMatch(cards);

    overlays.forEach((overlay) => {
        overlay.addEventListener("click", () => {
            overlay.style.display = "none";
            game.startGame();
        });
    });
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}
