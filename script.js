const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");

    let currentPlayer = "X";
    let gameActive = true;
    let board = Array(9).fill("");

    let scores = {
      X: 0,
      O: 0,
      draw: 0
    };

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameActive || board[index] !== "") {
          return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.disabled = true;

        if (checkWinner()) {
          statusText.textContent =
            `🎉 Pemain ${currentPlayer} menang!`;

          scores[currentPlayer]++;
          updateScore();
          gameActive = false;
          disableBoard();
          return;
        }

        if (board.every(value => value !== "")) {
          statusText.textContent = "🤝 Permainan seri!";
          scores.draw++;
          updateScore();
          gameActive = false;
          return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent =
          `Giliran pemain ${currentPlayer}`;
      });
    });

    function checkWinner() {
      return winPatterns.some(pattern => {
        return pattern.every(index =>
          board[index] === currentPlayer
        );
      });
    }

    function disableBoard() {
      cells.forEach(cell => {
        cell.disabled = true;
      });
    }

    function updateScore() {
      document.getElementById("scoreX").textContent = scores.X;
      document.getElementById("scoreO").textContent = scores.O;
      document.getElementById("scoreDraw").textContent = scores.draw;
    }

    function resetGame() {
      board = Array(9).fill("");
      currentPlayer = "X";
      gameActive = true;

      cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
      });

      statusText.textContent = "Giliran pemain X";
    }

    function resetScore() {
      scores = { X: 0, O: 0, draw: 0 };
      updateScore();
      resetGame();
    }
