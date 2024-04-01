#! /usr/bin/env node
import inquirer from "inquirer";
let user = {
    name: "albaloshi",
    pin: 5580,
    balance: 100000,
};
const respo = await inquirer.prompt([
    {
        message: "Enter your pin code",
        name: "pin",
        type: "password",
    },
]);
//TODO retry on incorrect pin
if (Number(respo.pin) !== user.pin) {
    console.log("You have entered an incorrect pin");
}
else {
    const respo = await inquirer.prompt([
        {
            name: "selectedType",
            message: "please select an option",
            type: "list",
            choices: ["Withdraw", "Fast Cash", "Balance Inquiry"], // TODO add more options deposit and bil payment
        },
        //TODO amount should be multiple of 500
        {
            name: "amount",
            message: "Please Select Your Amount",
            type: "list",
            choices: ["500", "1000", "2000", "3000", "5000", "10000"],
            when(respo) {
                return respo.selectedType == "Fast Cash";
            },
        },
        {
            name: "amount",
            message: "Please Enter Your Amount",
            when(respo) {
                return respo.selectedType == "Withdraw";
            },
        },
    ]);
    if (respo.selectedType == "Balance Inquiry") {
        // console.log(`Your Balance Is : ${user.balance}`);
        if (respo.amount >= -1) {
            user.balance = user.balance - respo.amount;
            console.log(`Your New Balance Is : ${user.balance}`);
        }
        else {
            console.log("You have insufficient funds to withdraw from the ATM");
        }
    }
    else if (respo.selectedType == "Withdraw" || respo.selectedType == "Fast Cash") {
        if (respo.amount <= user.balance) { // Checking if user has enough balance
            user.balance = user.balance - respo.amount;
            console.log(`Your New Balance Is : ${user.balance}`);
        }
        else {
            console.log("You have insufficient funds to withdraw from the ATM");
        }
    }
}
