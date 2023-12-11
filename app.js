// Project Objectives
// 1. Deposit Money
// 2. Determining number of lines to bet on
// 3. Collect Bet Amount
// 4. Spinning the Slot Machine
// 5. Check if user Won
// 6. Give User the Winnings
// 7. Play Again Option

const prompt = require("prompt-sync")();
const deposit = () => {
    const depositAmount = prompt("Please Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid deposit amount, please try again");
        }
};
deposit();
