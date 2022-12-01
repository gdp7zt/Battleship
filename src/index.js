const {Ship, Gameboard, Player} = require('./battleship.js');

function newGame(){
    let player1 = new Player('user');
    let player2 = new Player('computer');

    let userGameboard = new Gameboard('user');
    let computerGameboard = new Gameboard('computer');

    let form = document.querySelector('#shipGetter');
    form.classList.remove('hidden');
    let submitButton = document.querySelector('#shipButton');

    submitButton.addEventListener('click', () => {
        const field1 = document.querySelector('#ship1');
        const field2 = document.querySelector('#ship2');
        const field3 = document.querySelector('#ship3');
        const field4 = document.querySelector('#ship4');
        const field5 = document.querySelector('#ship5');
        if(field1.value.length !== 11 || field2.value.length !== 17 || field3.value.length !== 17 
           || field4.value.length !== 23 || field5.value.length !== 29){
            let error = document.querySelector('#shipError');
            error.classList.remove('hidden');
           }
        else{
            userGameboard.placeShip(2,JSON.parse("[" + field1.value + "]"));
            userGameboard.placeShip(3,JSON.parse("[" + field2.value + "]"));
            userGameboard.placeShip(3,JSON.parse("[" + field3.value + "]"));
            userGameboard.placeShip(4,JSON.parse("[" + field4.value + "]"));
            userGameboard.placeShip(5,JSON.parse("[" + field5.value + "]"));

            computerGameboard.placeShip(2, [[1,2],[1,3]]);
            computerGameboard.placeShip(3, [[4,2],[4,3],[4,4]]);
            computerGameboard.placeShip(3, [[6,7],[6,8],[6,9]]);
            computerGameboard.placeShip(4, [[8,2],[8,3],[8,4],[8,5]]);
            computerGameboard.placeShip(5, [[2,5],[3,5],[4,5],[5,5],[6,5]]);

            console.log(computerGameboard.board);
            console.log(userGameboard.board);

            form.classList.add('hidden');
            renderBoard(computerGameboard);
            renderBoard(userGameboard, player2, computerGameboard, player1);
        }
    })
}

function renderBoard(board, player, board2){
    if(board.name === 'computer'){
        const container = document.createElement('div');
        for (let i = 0; i < 10; i++){
            const row = document.createElement('div');
            for(let j  = 0; j < 10; j++){
                const box = document.createElement('div');
                box.setAttribute('data-x', i);
                box.setAttribute('data-y', j);
                row.appendChild(box);
            }
            container.appendChild(row);
        }
        const body = document.querySelector('body');
        body.appendChild(container);
    }
    else{
        const container = document.createElement('div');
        for (let i = 0; i < 10; i++){
            const row = document.createElement('div');
            for(let j  = 0; j < 10; j++){
                const box = document.createElement('div');
                box.setAttribute('data-x', i);
                box.setAttribute('data-y', j);
                box.addEventListener('click', () => {
                    takeAttack([i,j], board);
                    player.randomAttack(board2);
                    if(board.shipsSunk() || board2.shipsSunk()){
                        gameOver();
                    }
                }, {once: true});
                row.appendChild(box);
            }
            container.appendChild(row);
        }
        const body = document.querySelector('body');
        body.appendChild(container);
    }
}

function gameOver(){
    let containers = document.querySelectorAll('body > div > div > div');
    containers.forEach(element => {
        let newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        const body = document.querySelector('body');
        const div = document.createElement('div');
        div.innerText = 'You win!'
        body.appendChild(div);
    })
}

 function takeAttack(location, gameboard){
    let response = gameboard.receiveAttack(location);
    let box = document.querySelectorAll(`[data-x="${location[0]}"][data-y="${location[1]}"]`);
    box = box[1];
    if(response === 'miss') box.style.backgroundColor = 'red';
    else box.style.backgroundColor = 'black'; 
}


newGame();