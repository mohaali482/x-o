const box         = document.getElementById("item");
const playGround  = document.getElementById("playGround");
const object_x    = document.getElementById("Object-X");
const object_o    = document.getElementById("Object-O");
const winnerText  = document.getElementById("winner");
const winnerDiv   = document.getElementById("winner-logo");
const restartBtn  = document.getElementById("restart");
const winnerOLogo = document.getElementById("winner-o")
const winnerXLogo = document.getElementById("winner-x")
const winnerTag   = document.getElementById("winner-tag")
const restartNode = document.getElementById("restart-node")
let firstPlayer   = document.getElementById("first-player")

var moves_x = new Array();
var moves_o = new Array();
var total_moves = 0;

const playerRandomPlayer = Math.floor(Math.random()*10);

var turn = playerRandomPlayer%2==0 ? 'x' : 'o';

firstPlayer.appendChild( turn === 'x' ? winnerXLogo.cloneNode(true) : winnerOLogo.cloneNode(true));

const changeTurn = () => {
    turn = (turn == 'o')?'x':'o';
    firstPlayer.parentElement.replaceChild(firstPlayer.cloneNode(), firstPlayer)

    firstPlayer = document.getElementById('first-player')

    firstPlayer.appendChild( turn === 'x' ? 
    winnerXLogo.cloneNode(true) : 
    winnerOLogo.cloneNode(true));
}

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
    if (node.hasChildNodes()) {
        return false
    }
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

    try{
        node.parentElement.replaceChild(node.cloneNode(true), node)
    }catch(e){
    }
    total_moves++;

    return true;
}


const move = (row, column, node) => {
    if (!setMove(row, column, node)) {
        return
    }
    if (check()) {
        gameOver()
        return
    }else if(total_moves == 9){
        gameOver(false)
        return
    }
    changeTurn();
}

const eventHandler = (event, row, i)=>{
    event.preventDefault();
    move(row, i, event.target);
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

const gameOver = (winner=true) =>{
    winnerTag.classList.toggle('d-none');
    restartNode.classList.toggle('d-none');
    if (winner) {
        winnerText.innerText = "Winner";
        winnerDiv.appendChild((turn == 'o')?winnerOLogo.cloneNode():winnerXLogo.cloneNode(true))
        playGround.childNodes.forEach(el=>{
            playGround.replaceChild(el.cloneNode(true), el)
        })
    } else {
        winnerText.innerText = "Draw";
        playGround.childNodes.forEach(el=>{
            playGround.replaceChild(el.cloneNode(true), el)
        })
    }
}

const start = () =>{
    moves_o = [];
    moves_x = [];
    total_moves = 0;
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


const handleKeyUp = (event)=>{
    const key = parseInt(event.key);
    let row;
    let column;

    if (key >= 7) {
        row = 0;
        column = (key-7);
    } else if(key >= 4){
        row = 1;
        column = (key-4);
    }else if(key >= 1){
        row = 2;
        column = (key-1);
    }

    if (!(row == undefined) && !(column == undefined)) {
        const node = document.getElementById(`item-${row}-${column}`)
        move(row, column, node)
    }

}


populatePlayGround()


restartBtn.addEventListener('click', (event)=>{
    start()
});