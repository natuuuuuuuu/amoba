document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let moves = 0;
    let gameEnded = false;

    // Játék céljának üzenete
   // Játék céljának üzenete
alert("Üdvözöllek az Amőba játékban!\n\nA játék két játékos által játszható. Az első játékos az 'X' jelzéssel kezd, majd váltakozva helyeznek el jelzéseket a mezőkben. A célod három saját jelölés egymás melletti elhelyezése sorban, oszlopban vagy átlósan. Aki először ér el ebben célban három saját jelzést, az nyer a játékban. Sok szerencsét!");



    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            if (cell.textContent === "" && !gameEnded) {
                cell.textContent = currentPlayer;
                moves++;
                if (checkWinner()) {
                    alert(currentPlayer + " nyert! Gratulálok!");
                    gameEnded = true;
                } else if (moves === 9) {
                    alert("Döntetlen! Minden mező betelt.");
                    gameEnded = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    function checkWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                return true;
            }
        }
        return false;
    }
});
