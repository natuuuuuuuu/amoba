document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let moves = 0;
    let gameEnded = false;
    let soloGame = false;

    // Felteszi a kérdést a játékosnak, hogy szeretne-e egyedül játszani az AI ellen
    if (confirm("Szeretnél egyedül játszani az AI ellen?")) {
        soloGame = true;
        alert("Üdvözöllek az Amőba játékban az AI ellen!\n\nEbben a módban az 'X' leszel, és az AI az 'O'. A játékosok egymás után váltogatva fognak helyezni jeleket a táblán. A cél az, hogy egy játékos helyezzen el három saját jelzést egymás mellett egy sorban, oszlopban vagy átlósan a táblán. Ha ez sikerül valakinek, akkor az illető nyer. Ha minden mező megtelik, és senki sem ér el ilyen sorozatot, akkor a játék döntetlen lesz. Sok szerencsét!");
    } else {
        // Ha nem, megjeleníti a játék leírását
        alert("Üdvözöllek az Amőba játékban!\n\nA játékot két játékos játszhatja. Az első játékos az 'X' jelet fogja használni, majd egymás után váltogatva fognak helyezni jeleket a táblán. A cél az, hogy egy játékos helyezzen el három saját jelzést egymás mellett egy sorban, oszlopban vagy átlósan a táblán. Ha ez sikerül valakinek, akkor az illető nyer. Ha minden mező megtelik, és senki sem ér el ilyen sorozatot, akkor a játék döntetlen lesz. Sok szerencsét!");
    }

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
                    if (soloGame && currentPlayer === "O") {
                        setTimeout(performComputerMove, 500); // Késleltetett AI lépés
                    }
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

    function performComputerMove() {
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = "O";
        moves++;
        if (checkWinner()) {
            alert("Az AI nyert!");
            gameEnded = true;
        } else if (moves === 9) {
            alert("Döntetlen! Minden mező betelt.");
            gameEnded = true;
        } else {
            currentPlayer = "X";
        }
    }
});
