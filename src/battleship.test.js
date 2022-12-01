const {Ship, Gameboard, Player} = require('./battleship.js');

test('testing hit function', () => {
    let temp = new Ship(3);
    temp.hit(3)
    expect(temp.hitLocation).toContain(3);
})

test('testing isSunk function to be false', () => {
    let temp = new Ship(3);
    expect(temp.sunk).toBeFalsy();
})

test('testing isSunk function to be true', () => {
    let temp = new Ship(3);
    temp.hit(3);
    temp.hit(6);
    temp.hit(1);
    temp.isSunk();
    expect(temp.sunk).toBeTruthy();
})

test('testing a placed ship', () => {
    let board = new Gameboard();
    board.placeShip(3, [[4, 6],[4,7],[4,8]]);

    expect(board.board[4][6][0]).toBe(1);
    expect(board.board[4][7][0]).toBe(1);
    expect(board.board[4][8][0]).toBe(1);
})

test('testing receiveAttack to hit', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    board.receiveAttack([4,6]);

    let ship = board.board[4][6][1]

    expect(ship.hitLocation.length).toBe(1);
})

test('testing receiveAttack to not hit', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    board.receiveAttack([2,6]);
    board.receiveAttack([4,6])

    expect(board.misses.length).toBe(1);
})

test('testing shipsSunk to be false', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    board.receiveAttack([2,6]);
    board.receiveAttack([4,6]);

    expect(board.shipsSunk()).toBeFalsy();
})

test('testing shipsSunk to be true', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    board.receiveAttack([2,6]);
    board.receiveAttack([4,6]);
    board.receiveAttack([4,7]);
    board.receiveAttack([4,8]);

    expect(board.shipsSunk()).toBeTruthy();
})

test('testing attack to be a ship', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    let player1 = new Player('player1');

    let ship = player1.attack([4,6], board);

    expect(ship.hitLocation.length).toBe(1);
})

test('testing attack to be a miss', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    let player1 = new Player('player1');

    let ship = player1.attack([3,6], board);

    expect(ship).toMatch('miss');
})

test('testing randomAttack', () => {
    let board = new Gameboard();

    board.placeShip(3, [[4, 6],[4,7],[4,8]]);
    let player1 = new Player('player1');

    let hit = player1.randomAttack(board);

    expect(hit).toMatch('miss');
})