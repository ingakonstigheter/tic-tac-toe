class Player {
    constructor(username, marker) {
        this.name = username;
        this.marker = marker;
    }
}

const gameboard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function getBoard() {
        return board;
    }

    function placeMarker(marker, row, column) {
        if (board[row][column] === "") {
            board[row][column] = marker;
        }
    }

    function isFullBoard() {
        let counter = 0;
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board.length; column++) {
                if (board[row][column] !== "") {
                    counter++;
                }
            }
        }
        return counter === board.length * board.length;
    }

    function clearBoard() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }

    return {
        getBoard,
        placeMarker,
        clearBoard,
        isFullBoard,
    };
})();

const gameController = (function () {
    let score = [0, 0];
    let players = ["", ""];
    let layerIndex = 0;

    function setPlayers(playerOne, playerTwo) {
        players[0] = playerOne;
        players[1] = playerTwo;
    }

    function getPlayers() {
        return players;
    }

    function getScore() {
        return score;
    }

    function newGame() {
        gameboard.clearBoard();
        resetScore();
        currentPlayerIndex = 0;
    }

    function playRound(row, column) {
        gameboard.placeMarker(players[playerIndex].marker, row, column);
        let gameOver = false;

        if (hasWinner() === true) {
            gameboard.clearBoard();
            score[currentPlayerIndex]++;
            gameOver = true
            return gameOver;
        } else if (gameboard.isFullBoard()) {
            gameboard.clearBoard();
            gameOver = true
            return gameOver;
        } else {
            if (currentPlayerIndex === 0) {
                currentPlayerIndex = 1;
            } else {
                currentPlayerIndex = 0;
            }
            return gameOver
        }
    }

    function resetScore() {
        score = [0, 0];
    }

    function hasWinner() {
        let board = gameboard.getBoard();
        let winner = false;

        for (let i = 0; i < 3; i++) {
            if (
                // horisontal win
                board[i][0] !== "" &&
                board[i][0] === board[i][1] &&
                board[i][0] === board[i][2]
            ) {
                winner = true;
            } else if (
                // vertical win
                board[0][i] !== "" &&
                board[0][i] === board[1][i] &&
                board[0][i] === board[2][i]
            ) {
                winner = true;
            }

        }
        // diagonal win (/)
        if (
            (board[0][0] !== "" &&
                board[0][0] === board[1][1] &&
                board[0][0] === board[2][2]) ||
            (board[0][2] !== "" &&
                board[0][2] === board[1][1] &&
                board[0][2] === board[2][0])
        ) {
            winner = true;
        }
        return winner;
    }

    return {
        setPlayers,
        getPlayers,
        getScore,
        newGame,
        playRound,
    };
})();

const displayController = (function () {
    let cells = document.querySelectorAll(".cell");
    let btnNewGame = document.querySelector(".new-game");
    let btnSave = document.querySelector(".new-players__save");
    let btnRestart = document.querySelector(".game__restart");
    let newPlayerForm = document.querySelector(".new-players");
    let newPlayers = document.querySelectorAll(".new-players__input");
    let game = document.querySelector(".game");
    const scoreDiv = document.querySelector(".game__score");

    btnNewGame.addEventListener("click", () => {
        newPlayerForm.classList.toggle("hidden");
        gameController.newGame();
        btnNewGame.classList.toggle("hidden");
    });

    btnSave.addEventListener("click", () => {
        let namePlayerOne = newPlayers[0].value;
        let namePlayerTwo = newPlayers[1].value;

        if (namePlayerOne === "") {
            namePlayerOne = "Player One";
        }
        if (namePlayerTwo === "") {
            namePlayerTwo = "Player Two";
        }
        let playerOne = new Player(namePlayerOne, "X");
        let playerTwo = new Player(namePlayerTwo, "O");

        gameController.setPlayers(playerOne, playerTwo);

        newPlayerForm.classList.toggle("hidden");
        game.classList.toggle("hidden");
        render();
    });

    btnRestart.addEventListener("click", () => {
        gameController.newGame();
        render();
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", placeMarker);
    });

    function placeMarker(event) {
        const cell = event.target;
        let position = getGridPositionFromIndex(cell.getAttribute("data-index"));
        gameController.playRound(position.row, position.column);
        render();
    }

    function render() {
        renderCells();
        renderScore();
    }

    function renderScore() {
        scoreDiv.firstChild.textContent =
            gameController.getPlayers()[0].name +
            ": " +
            gameController.getScore()[0];
        scoreDiv.lastChild.textContent =
            gameController.getPlayers()[1].name +
            ": " +
            gameController.getScore()[1];
    }

    function renderCells() {
        const board = gameboard.getBoard();

        cells.forEach((cell) => {
            let position = getGridPositionFromIndex(cell.getAttribute("data-index"));
            let value = board[position.row][position.column];
            cell.textContent = value;
            cell.disabled = value !== '';
        });
    }

    function getGridPositionFromIndex(index) {
        let row = Math.floor(index / 3);
        let column = index % 3;
        return { row, column };
    }
})();