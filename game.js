let starter = document.querySelector('.starter');
let levels = document.querySelector('.levels');
let level = 0;
let boxes = document.querySelectorAll('.box');
let btn = ['pink', 'green', 'yellow', 'blue'];
let score = document.querySelector('#score-box');
let clickAudio = document.querySelector('.click');
let gameOverAudio = document.querySelector('.gameOver');
let playBtn = document.querySelector('#play-btn');

//detecting the device for relevant starter instruction
function starterText() {
    if("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        starter.innerText = 'Tap anywhere on the screen to start the game';
    }
    else {
        starter.innerText = 'Press any key to start the game';
    }
}

playBtn.addEventListener('click', () => {
    let curtain = document.querySelector('#curtain');
    curtain.style.transform = "translateY(-100%)";
    setTimeout(() => {
        curtain.classList.add("hide");
    },1000);
    console.log('button was clicked');
    starterText();
});

//variables
let gameSequenceArr = [];
let userClicksArr = [];

let gameStarted = false; //current state of the game

for(let box of boxes) {
    box.classList.add('disabled');
}


document.addEventListener('keydown', startGame);
document.addEventListener('touchstart', startGame); //for mobile devices

function startGame() {
    for(let box of boxes) {
        box.classList.remove('disabled');
    }
    if(!gameStarted) {
        gameStarted = true; //changed the state to started - true
        starter.innerText = '';
        ++level;
        score.innerText = "Score: " + (level - 1);
        levels.innerText = `Level ${level}`;
        let randomBtnIndex = Math.trunc(Math.random() * 4);
        setTimeout(() => {
            flashButton(boxes[randomBtnIndex]);
        },1000)
        gameSequenceArr.push(btn[randomBtnIndex]); 
    }           
};

function checkAnswer(index) {
    if(userClicksArr[index] === gameSequenceArr[index]) {
        if(userClicksArr.length == gameSequenceArr.length) {
            levelUp();
        }
    } 
    else {
        document.body.style.backgroundColor = 'red';
        gameOverAudio.play();
        for(let box of boxes) {
            box.classList.add('disabled');
        }
        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
        },1500)
        levels.innerText = `GAME OVER! Your total score was ${level - 1}`;
        gameStarted = false;
        level = 0;
        userClicksArr = [];
        gameSequenceArr = [];
        starterText();
        
    }
}

function levelUp() {
    userClicksArr = [];
    ++level;
    levels.innerText = `Level ${level}`;
    score.innerText = "Score: " + (level - 1);
    let randomBtnIndex = Math.trunc(Math.random() * 4);
    setTimeout(() => {
        flashButton(boxes[randomBtnIndex]);
    },1000);  
    gameSequenceArr.push(btn[randomBtnIndex]); //flashed the random box
}

for(let box of boxes) {
    box.addEventListener('click', buttonPress)
}

function buttonPress() {
    clickAudio.play();
    userflashButton(this);
    userClicksArr.push(this.classList[2]); //push the color of the box
    checkAnswer(userClicksArr.length - 1);
}

//function to flash a box
function flashButton(box) {
    box.classList.add("flash");
    setTimeout(() => {
    box.classList.remove("flash");
    }, 200);
};

function userflashButton(box) {
    box.classList.add("userflash");
    setTimeout(() => {
    box.classList.remove("userflash");
    }, 200);
};