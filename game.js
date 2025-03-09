let starter = document.querySelector('.starter');
let levels = document.querySelector('.levels');
let level = 0;
let boxes = document.querySelectorAll('.box');
let btn = ['pink', 'green', 'yellow', 'blue'];

//variables
let gameSequenceArr = [];
let userClicksArr = [];

let gameStarted = false; //current state of the game

for(let box of boxes) {
    box.classList.add('disabled');
}


document.addEventListener('keydown', startGame);

function startGame() {
    for(let box of boxes) {
        box.classList.remove('disabled');
    }
    if(!gameStarted) {
        gameStarted = true; //changed the state to started - true
        starter.innerText = '';
        ++level;
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
        for(let box of boxes) {
            box.classList.add('disabled');
        }
        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
        },500)
        levels.innerText = `GAME OVER! Your total score was ${level - 1}\nPress any key to restart the game.`;
        gameStarted = false;
        level = 0;
        userClicksArr = [];
        gameSequenceArr = [];
    }
}

function levelUp() {
    userClicksArr = [];
    ++level;
    levels.innerText = `Level ${level}`;
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
