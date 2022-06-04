const box         = document.getElementById("item");
const playGround  = document.getElementById("playGround");
const object_x    = document.getElementById("Object-X");
const object_o    = document.getElementById("Object-O");
const winnerText  = document.getElementById("winner");
const winnerDiv   = document.getElementById("winner-logo");
const restartBtn  = document.getElementById("restart");
const winnerOLogo = document.getElementById("winner_o")
const winnerXLogo = document.getElementById("winner_x")
const winnerTag   = document.getElementById("winner-tag")
const restartNode   = document.getElementById("restart-node")

var moves_x = new Array();
var moves_o = new Array();
var numberOfMoves = 0;

var turn = 'x';

const changeTurn = () => turn = (turn == 'o')?'x':'o';

const check = () => {
    var movesDone;
    if (turn === 'o'){
        movesDone = moves_o;
    }
    else{
        movesDone = moves_x;
    }

    
    if(movesDone.length >= 3){
        if(checkColumn(movesDone)){
            return true;
        }
        else if(checkRow(movesDone)){
            return true;
        }
        else if(checkDiagonal1(movesDone)){
            return true;
        }
        else if(checkDiagonal2(movesDone)){
            return true;
        }
        else{
            return false;
        }
    }

}


const checkRow = (arr)=>{
    const counter = {
        0:0,
        1:0,
        2:0,
    }

    arr.forEach(el=>{
        counter[el[0]]++;
    })

    for (const key in counter) {
        const element = counter[key];
        if (element >= 3){
            return true;
        }
    }
}

const checkColumn = (arr)=>{
    const counter = {
        0:0,
        1:0,
        2:0,
    };

    arr.forEach(el=>{
        counter[el[1]]++;
    })

    for (const key in counter) {
        const element = counter[key];
        if (element >= 3){
            return true;
        }
    }
}

const checkDiagonal1 = (arr)=>{
    var counter = 0;

    arr.forEach(el=>{
        if (el[0] === el[1]){
            counter+=1;
        }
    })

    if (counter == 3) {
        return true;
    }
}

const checkDiagonal2 = (arr)=>{
    var counter = 0;

    arr.forEach(el=>{
        var sum = 0;
        el.forEach(num=>{
            sum+=num;
        })
        if (sum == 2){
            counter+=1;
        }
    })

    if (counter == 3) {
        return true;
    }
}

const setMove = (row, column, node) =>{
    if (turn === 'o'){
        moves_o.push([row, column]);
        const cloneNodeO = object_o.cloneNode(true);
        cloneNodeO.setAttribute("id","");
        node.appendChild(cloneNodeO);
    }
    else{
        moves_x.push([row, column]);
        const cloneNodeX = object_x.cloneNode(true);
        cloneNodeX.setAttribute("id","");
        node.appendChild(cloneNodeX);
    }
}


const move = (row, column, node) => {
    setMove(row, column, node);
    if (check()) {
        win()
    }
    changeTurn();
}
const eventHandler = (event, row, i)=>{
    event.preventDefault();
    move(row, i, event.target);
    event.target.removeEventListener('click',eventHandler)
}

const populatePlayGround = ()=>{
    for(let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            const newNode = box.cloneNode();
            newNode.setAttribute("id", `item-${i}-${j}`);
            newNode.addEventListener('click',(event)=> {
                eventHandler(event, i, j)
            });
            playGround.appendChild(newNode);
        }
    }
}

const win = () =>{
    winnerTag.classList.toggle('d-none');
    restartNode.classList.toggle('d-none');
    winnerText.innerText = "Winner";
    winnerDiv.appendChild((turn == 'o')?winnerOLogo.cloneNode():winnerXLogo.cloneNode(true))
    playGround.childNodes.forEach(el=>{
        playGround.replaceChild(el.cloneNode(true), el)
    })
}

const restart = () =>{
    moves_o = [];
    moves_x = [];
    while (playGround.hasChildNodes()) {
        playGround.childNodes.forEach(el=>{
            playGround.removeChild(el)
        })
    }
    populatePlayGround()
    winnerText.innerText = "";
    winnerDiv.innerHTML="";
    winnerTag.classList.toggle('d-none');
    restartNode.classList.toggle('d-none');
}


populatePlayGround()


restartBtn.addEventListener('click', (event)=>{
    restart()
});