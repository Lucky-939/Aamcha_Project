let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelectorAll(".new");
let winMsgContainer = document.querySelector(".winMsgContainer");
let winMsg = document.querySelector(".winMsg");
let drawMsgContainer = document.querySelector(".drawMsgContainer");
let drawMsg = document.querySelector(".drawMsg");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO =true;
    enableBox();
    winMsgContainer.classList.add("hide");
    drawMsgContainer.classList.add("hide");
}
const enableBox =() => {
     for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
     }
}
const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    winMsg.innerText=`Congratulations ,Winner is ${winner}`;
    winMsgContainer.classList.remove("hide");
    disableBox();
}
const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner" ,pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
    let filledBox = 0;
for (let box of boxes) {
    if(box.innerText !=="") {
        filledBox++;
    }
}
if (filledBox === 9) {
    drawMsg.innerText=` It's a Draw!`;
    drawMsgContainer.classList.remove("hide");
}
}


boxes.forEach ( (box)=> {
    box.addEventListener("click", ()=> {
        if (turnO) {
            box.style.color ="#29335C";
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.style.color="#DB2B39"
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.forEach((btn) => {
    btn.addEventListener("click", resetGame);
});