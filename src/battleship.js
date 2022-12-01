

class Ship {

    constructor(length){
        this.length = length;
        this.hitLocation = [];
        this.sunk = false;
    }

    hit(spot){
        this.hitLocation.push(spot);
    }

    isSunk(){
        if(this.hitLocation.length === this.length){
            this.sunk = true;
            return true;
        }
        return false;
    }
}

class Gameboard {

    constructor(name){
        this.name = name;
        this.board = [];
        this.fillBoard();
        this.misses = [];
        this.allSunk = false;
    }

    fillBoard(){
        for(let i = 0; i < 10; i++){
            this.board.push([0,0,0,0,0,0,0,0,0,0]);
        }
    }

    placeShip(length, location){
        let newShip = new Ship(length);
        location.forEach(coord => {
            this.board[coord[0]][coord[1]] = [1, newShip];
        })
        return newShip;
    }

    receiveAttack(location){
        if(this.board[location[0]][location[1]] === 0){
            this.misses.push(location);
            return 'miss';
        }
        else if(this.board[location[0]][location[1]][0] === 1){
            let ship = this.board[location[0]][location[1]][1];
            this.board[location[0]][location[1]][0] = 2;
            ship.hit(location);
            return ship;
        }
    }

    shipsSunk(){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if(this.board[i][j][0] === 1){
                    let ship = this.board[i][j][1];
                    if(!ship.isSunk()) return false;
                }
            }
        }
        this.allSunk = true;
        return true;
    }
}

class Player {
    constructor(name){
        this.name = name;
    }

    attack(location, gameboard){
        if(this.offBoard(location)) return;
        let hit = gameboard.receiveAttack(location);
        return hit;
    }

    randomAttack(gameboard){
        let location = [];
        let ship = [];
        do{
            location = this.getLocation();
        } while(containsArray(gameboard.misses, location) || gameboard.board[location[0]][location[1]][0] === 2)
        takeAttack(location, gameboard);
    }

    getLocation(){
        let coord1 = Math.floor(Math.random() * 10)
        let coord2 = Math.floor(Math.random() * 10)
        return [coord1, coord2];
    }

    offBoard(location){
        if(location[0] > 9 || location[0] < 0 || location[1] > 9 || location[1] < 0){
            return true;
        }
        return false;
    }

    randomShip(board){
        
    }
}

function containsArray(misses,location){
    for(let i = 0; i < misses.length; i++){
        if(misses[i][0] === location[0] && misses[i][1] === location[1]) return true;
    }
    return false;
}

function takeAttack(location, gameboard){
    let response = gameboard.receiveAttack(location);
    let box = document.querySelectorAll(`[data-x="${location[0]}"][data-y="${location[1]}"]`);
    box = box[0];
    if(response === 'miss') box.style.backgroundColor = 'red';
    else box.style.backgroundColor = 'black'; 
}

module.exports = {Ship, Gameboard, Player};
