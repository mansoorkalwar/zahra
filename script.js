/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loadingScreen")
            .classList.add("hide");

    }, 1500);

});


/* =====================================================
   OPEN SURPRISE
===================================================== */

const openButton =
    document.getElementById("openButton");

openButton.addEventListener("click", () => {

    document
        .getElementById("game")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =====================================================
   ARROW + HEART GAME
===================================================== */

const arrow =
    document.getElementById("arrow");

const heartWrapper =
    document.getElementById("heartWrapper");

const gameContainer =
    document.getElementById("gameContainer");

const explosion =
    document.getElementById("explosion");

const gameMessage =
    document.getElementById("gameMessage");


let dragging = false;

let arrowStartX = 40;

let arrowStartY = 0;


/* -----------------------------------------------------
   START DRAG
----------------------------------------------------- */

function startDragging(event) {

    event.preventDefault();

    dragging = true;

    arrow.classList.add("dragging");

}


/* Mouse */

arrow.addEventListener(
    "mousedown",
    startDragging
);


/* Touch */

arrow.addEventListener(
    "touchstart",
    startDragging,
    {
        passive: false
    }
);


/* -----------------------------------------------------
   MOVE ARROW
----------------------------------------------------- */

function moveArrow(event) {

    if (!dragging) return;

    event.preventDefault();

    const rect =
        gameContainer.getBoundingClientRect();

    const point =
        event.touches
            ? event.touches[0]
            : event;

    const mouseX =
        point.clientX - rect.left;

    const mouseY =
        point.clientY - rect.top;


    const startX = 40;

    const startY =
        rect.height - 70;


    let dx =
        mouseX - startX;

    let dy =
        mouseY - startY;


    let angle =
        Math.atan2(dy, dx)
        * 180 / Math.PI;


    /* Limit arrow movement */

    let distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (distance > 260) {

        dx =
            (dx / distance) * 260;

        dy =
            (dy / distance) * 260;

    }


    arrow.style.transform =
        `translate(${dx}px, ${dy}px)
         rotate(${angle}deg)`;


    /* -------------------------------------------------
       CHECK WHETHER AIMING AT HEART
    ------------------------------------------------- */

    const heartRect =
        heartWrapper.getBoundingClientRect();

    const arrowRect =
        arrow.getBoundingClientRect();


    const arrowTipX =
        arrowRect.right;

    const arrowTipY =
        arrowRect.top +
        arrowRect.height / 2;


    const hitDistance = 90;


    const heartCenterX =
        heartRect.left +
        heartRect.width / 2;

    const heartCenterY =
        heartRect.top +
        heartRect.height / 2;


    const differenceX =
        arrowTipX - heartCenterX;

    const differenceY =
        arrowTipY - heartCenterY;


    const distanceToHeart =
        Math.sqrt(
            differenceX ** 2 +
            differenceY ** 2
        );


    if (distanceToHeart < hitDistance) {

        gameMessage.innerHTML =
            "Release now... ♡";

        gameMessage.style.color =
            "#ff9fc7";

    } else {

        gameMessage.innerHTML =
            "Keep aiming at the heart";

        gameMessage.style.color =
            "#b998a9";
    }

}


/* Mouse move */

document.addEventListener(
    "mousemove",
    moveArrow
);


/* Touch move */

document.addEventListener(
    "touchmove",
    moveArrow,
    {
        passive: false
    }
);


/* -----------------------------------------------------
   RELEASE ARROW
----------------------------------------------------- */

function releaseArrow() {

    if (!dragging) return;

    dragging = false;

    arrow.classList.remove("dragging");


    const rect =
        gameContainer.getBoundingClientRect();


    const heartRect =
        heartWrapper.getBoundingClientRect();

    const arrowRect =
        arrow.getBoundingClientRect();


    const arrowTipX =
        arrowRect.right;

    const arrowTipY =
        arrowRect.top +
        arrowRect.height / 2;


    const heartCenterX =
        heartRect.left +
        heartRect.width / 2;

    const heartCenterY =
        heartRect.top +
        heartRect.height / 2;


    const dx =
        arrowTipX - heartCenterX;

    const dy =
        arrowTipY - heartCenterY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (distance < 120) {

        hitHeart();

    } else {

        resetArrow();

        gameMessage.innerHTML =
            "Almost! Try aiming at the heart ♡";

    }

}


/* Mouse release */

document.addEventListener(
    "mouseup",
    releaseArrow
);


/* Touch release */

document.addEventListener(
    "touchend",
    releaseArrow
);


/* =====================================================
   RESET ARROW
===================================================== */

function resetArrow() {

    arrow.style.transform =
        "translate(0,0) rotate(0deg)";

}


/* =====================================================
   HEART HIT
===================================================== */

let heartAlreadyHit = false;


function hitHeart() {

    if (heartAlreadyHit) return;

    heartAlreadyHit = true;


    gameMessage.innerHTML =
        "You found the surprise... ✨";


    heartWrapper.classList.add("broken");


    createHeartExplosion();


    setTimeout(() => {

        document
            .getElementById("letter")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 1800);

}


/* =====================================================
   HEART EXPLOSION
===================================================== */

function createHeartExplosion() {

    const rect =
        gameContainer.getBoundingClientRect();


    const centerX =
        rect.width / 2;

    const centerY =
        rect.height * .40;


    for (let i = 0; i < 80; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "explosion-piece";


        particle.style.left =
            centerX + "px";

        particle.style.top =
            centerY + "px";


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            70 +
            Math.random() * 260;


        const x =
            Math.cos(angle)
            * distance;


        const y =
            Math.sin(angle)
            * distance;


        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );


        explosion.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1600);

    }


    /* Create heart-shaped particles */

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position =
            "absolute";

        heart.style.left =
            centerX + "px";

        heart.style.top =
            centerY + "px";

        heart.style.color =
            "#ff9fc7";

        heart.style.fontSize =
            (10 + Math.random() * 20)
            + "px";

        heart.style.animation =
            "explode 1.8s forwards";


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            100 +
            Math.random() * 250;


        heart.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        heart.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        explosion.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 1800);

    }

}


/* =====================================================
   FALLING PETALS
===================================================== */

const petals =
    document.getElementById("petals");


function createPetal() {

    const petal =
        document.createElement("div");

    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.animationDuration =
        5 + Math.random() * 5 + "s";


    petal.style.opacity =
        .3 +
        Math.random() * .5;


    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    petals.appendChild(
        petal
    );


    setTimeout(() => {

        petal.remove();

    }, 10000);

}


setInterval(
    createPetal,
    650
);


/* =====================================================
   FIREFLIES
===================================================== */

const fireflies =
    document.querySelector(".fireflies");


for (let i = 0; i < 35; i++) {

    const firefly =
        document.createElement("span");


    firefly.style.position =
        "absolute";

    firefly.style.width =
        "3px";

    firefly.style.height =
        "3px";

    firefly.style.borderRadius =
        "50%";

    firefly.style.background =
        "#ffd9eb";

    firefly.style.boxShadow =
        "0 0 10px #ffb5d1";


    firefly.style.left =
        Math.random() * 100 + "%";

    firefly.style.top =
        Math.random() * 80 + "%";


    firefly.style.animation =
        `fireflyMove
         ${3 + Math.random() * 5}s
         ease-in-out infinite`;


    firefly.style.animationDelay =
        Math.random() * 4 + "s";


    fireflies.appendChild(
        firefly
    );

}


/* =====================================================
   FIREWORKS
===================================================== */

const celebrateButton =
    document.getElementById(
        "celebrateButton"
    );

const fireworks =
    document.getElementById(
        "fireworks"
    );


celebrateButton.addEventListener(
    "click",
    () => {

        for (let i = 0; i < 10; i++) {

            setTimeout(() => {

                createFirework();

            }, i * 350);

        }

    }
);


function createFirework() {

    const x =
        Math.random() * window.innerWidth;

    const y =
        120 +
        Math.random()
        * (window.innerHeight * .5);


    for (let i = 0; i < 35; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "firework";


        piece.style.left =
            x + "px";

        piece.style.top =
            y + "px";


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            60 +
            Math.random() * 170;


        piece.style.setProperty(
            "--fx",
            `${Math.cos(angle) * distance}px`
        );

        piece.style.setProperty(
            "--fy",
            `${Math.sin(angle) * distance}px`
        );


        fireworks.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 1500);

    }

}


/* =====================================================
   BIRTHDAY MUSIC
===================================================== */

const musicButton =
    document.getElementById("musicButton");

const birthdaySong =
    document.getElementById("birthdaySong");


musicButton.addEventListener("click", async () => {

    try {

        if (birthdaySong.paused) {

            await birthdaySong.play();

            musicButton.innerHTML = "❚❚";

            musicButton.classList.add("playing");

        } else {

            birthdaySong.pause();

            musicButton.innerHTML = "♫";

            musicButton.classList.remove("playing");

        }

    } catch (error) {

        console.log("Music could not be played:", error);

    }

});


/* Change button back when song finishes */

birthdaySong.addEventListener("ended", () => {

    musicButton.innerHTML = "♫";

    musicButton.classList.remove("playing");

});