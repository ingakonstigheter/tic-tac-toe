const gameboard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function updateBoard(player, row, column) {
        if (board[row][column] === "") {
            board[row][column] = player;
        }
    }

     function isFullBoard() {
        let counter = 0;
        for(let row = 0; row < board.length; row++) { 
            for(let column = 0; column < board.length; column++)
                if(board[row][column] !== '') {
                    counter++;
        }
        return counter === board.length * board.length;
        }
    }

    function getBoard() {
        return board;
    }

    function resetBoard() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    
    return {
        getBoard,
        updateBoard,
        resetBoard,
        isFullBoard
    };
})();

function player(name, marker) {

    function getName() {
        return name;
    }
    
    function getMarker() {
        return marker;
    }

    return { getName, getMarker };
}

const gameController = (function () {
    let score = [0, 0];
    let players = ['', ''];
    let playerTurn = 0;

    function setPlayer(player) {
        if(players[0] === '') {
            players[0] = {name: player.getName(), marker: player.getMarker()};
        } else {
            players[1] = {name: player.getName(), marker : player.getMarker()}        
        }
    }

    function playRound(row, column) {
        gameboard.updateBoard(players[playerTurn].marker, row, column);
        let winner = checkWinner();
        if (winner !== '') {
            return players[playerTurn].name + ' Won!'
        } else if (gameboard.isFullBoard()) {
            return 'It is a draw'
        } else {
            if (playerTurn === 0) {
                playerTurn = 1;
            } else {
                playerTurn = 0;
            }
        }
    }

    function newGame() {
        gameboard.resetBoard();
        resetScore();
    }

    function getPlayers() {
        return players;
    }

    function getScore() {
        return score;
    }
    
    function updateScore() {
        if (getWinner === playerOne.getMarker()) {
            score[0]++;
            return playerOne.getName + ' Won!'
        } else if (getWinner === playerTwo.getMarker()) {
            score[1]++;
            return playerTwo.getName + ' Won!'
        } else if(gameboard.isFullBoard()) {
            return 'no winner'
        }
    }

    function resetScore() {
        score = [0, 0];
    }

    function checkWinner() {
        let board = gameboard.getBoard();
        let winner = '';

        for (let i = 0; i < 3; i++) {
            if (
                // horisontal win
                board[i][0] !== "" &&
                board[i][0] === board[i][1] &&
                board[i][0] === board[i][2]
            ) {
                winner = board[i][0];
            } else if (
                // vertical win
                board[0][i] !== "" &&
                board[0][i] === board[1][i] &&
                board[0][i] === board[2][i]
            ) {
                winner = board[0][i];
            }
            // diagonal win (/)
            else if (
                (board[0][0] !== "" &&
                    board[0][0] === board[1][1] &&
                    board[0][0] === board[2][2]) ||
                (board[2][2] !== "" &&
                    board[2][2] === board[1][1] &&
                    board[2][2] === board[0][2])
            ) {
                winner = board[1][1];
            }
        }
        return winner;
    }

    return {getPlayers, setPlayer, getScore, updateScore, resetScore, checkWinner, newGame, playRound};
    
})();

const displayController = (function () {
    let squares = document.querySelectorAll('.square')
})();

let p1 = player('a', 'x');
let p2 = player('b', 'o');

gameController.setPlayer(p1);
gameController.setPlayer(p2);
