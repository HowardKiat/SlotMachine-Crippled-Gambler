// Project Objectives
// 1. Deposit Money
// 2. Determining number of lines to bet on
// 3. Collect Bet Amount
// 4. Spinning the Slot Machine
// 5. Check if user Won
// 6. Give User the Winnings
// 7. Play Again Option

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 4,
    C: 5,
    D: 6
}

const SYMBOL_VALUES = {
    A: 10,
    B: 5,
    C: 2,
    D: 20
}



const deposit = () => {
    while (true){
    const depositAmount = prompt("Please Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0) {
            console.log("Invalid deposit amount, please try again");
            
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Please Enter a number to bet on (1-3): ");
            const numberOfLines = parseFloat(lines);
    
            if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >3) {
                console.log("Invalid number of lines");
                
            }else{
                return numberOfLines;
            }
        }

};

const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Please Enter total bet per line: ");
            const numberBet = parseFloat(bet);
    
            if(isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines) {
                console.log("Invalid Bet, try again");
                
            }else{
                return numberBet;
            }
        }

};

const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
        const reels = []
        for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                    const selectedSymbol = reelSymbols[randomIndex];
                    reels[i].push(selectedSymbol);
                    reelSymbols.splice(randomIndex, 1);
            }
        }
        return reels; 
        // console.log(symbols)
};

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++) {
        rows.push([]);
        for(let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != rows.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let symbolsMatch = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                symbolsMatch = false;
                break;
            }
        }

        if (symbolsMatch) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const game = () => {

let balance = deposit();
    // console.log(depositAmount);
    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        // console.log(reels);
        const rows = transpose(reels);
        // console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
            console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("Ops You Ran out of Money");
            break;
        }

        const playAgain = prompt("Do You Want To Play Again (y/n)");
        if (playAgain != "y")break
    }
};
game();