// 🎮 Select DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// 📝 Game variables
let count = 0;        // move counter
let turn0 = true;     // true = O's turn, false = X's turn

// ✅ Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// 🔄 Reset game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // hide message area
    count = 0;
};

// 🚫 Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// ✅ Enable and clear all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// 🎉 Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations!, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// 😐 Show draw message
const showDraw = () => {
    msg.innerText = `Oops! Game is Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// 🎯 Box click event
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn0) {
            box.innerText = "O";   // O's turn
            turn0 = false;
        }
        else {
            box.innerText = "X";   // X's turn
            turn0 = true;
        }
        box.disabled = true; // prevent re-click
        count++;

        let isWinner = checkWinner(); // check winner
        if (!isWinner && count === 9) {
            showDraw(); // draw if no winner
        }
    });
});

// 🏆 Check winner
const checkWinner = () => {
    let isWinner = false;
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                disableBoxes();
                showWinner(pos1Val);
                return true; // winner found
            }
        }
    }
};

// 🔘 Reset & New Game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
