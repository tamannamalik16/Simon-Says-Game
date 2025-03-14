let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");
let btns = ["yellow", "green", "red", "purple"];

let started = false;          // means the game is not started
let level = 0;                // and levels are at 0 in the start

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);

}

function levelUp() {
    userSeq = [];                          // when game levels up the userseq gets empty & user have to press all previous level buttons
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
};

function checkAns(idx) {
    // console.log("current level:", level);
    
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp , 1000);
        }
    } else {
        h3.innerHTML = `Game over! Your score was <b>${level}</b>. <br>press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}