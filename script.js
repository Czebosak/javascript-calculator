//Variables
let a = 0;
let b = 0;
let lastOperator = "";
let isOperator = false;
let isDecimal = false;

/************************ 
Add Containers referances
*************************/
//Display
const displayContainer = document.getElementById('display');

//Clear
const clearContainer = document.getElementById('clear');

//Operators
const addContainer = document.getElementById('+');
const subtractContainer = document.getElementById('-');
const multiplyContainer = document.getElementById('*');
const divisionContainer = document.getElementById('/');
const equalContainer = document.getElementById('=');
const signContainer = document.getElementById('sign');
const decimalContainer = document.getElementById('decimal');

//Numbers
const numberContainers = new Array(10);
for(let i = 0; i < numberContainers.length; i++) {
    numberContainers[i] = document.getElementById(i);
    numberContainers[i].addEventListener('click', function() {
        displayContainer.value += i;
    });
}

/**************** 
Add Button Events
*****************/
//Clear
clearContainer.addEventListener('click', () => clear());

//Operators
addContainer.addEventListener('click', () => checkOperator("+"));
subtractContainer.addEventListener('click', () => checkOperator("-"));
multiplyContainer.addEventListener('click', () => checkOperator("*"));
divisionContainer.addEventListener('click', () => checkOperator("/"));
equalContainer.addEventListener('click', () => equalButton());
signContainer.addEventListener('click', () => signButton());
decimalContainer.addEventListener('click', () => decimalButton());

/******************
 KEYBOARD SHORTCUTS
 ******************/
document.addEventListener('keydown', function(event) {
    if (event.key == "=") {
        equalButton();
        return;
    }
    else if(event.key == "Enter") {
        equalButton();
        return;
    }
    else if(event.key == ".") {
        decimalButton();
        return;
    }
    else if(event.key == "Delete") {
        clear();
        return;
    }
    else if(["+","-","*","/"].includes(event.key)) {
        checkOperator(event.key);
        return;
    }
    else if(["0","1","2","3","4","5","6","7","8","9"].includes(event.key)) {
        displayContainer.value += event.key;
        return;
    }

});


//Clears the input at resets all variables
function clear() {
    displayContainer.value = "";
    isOperator = false;
    lastOperator = "";
    isDecimal = false;
}
function checkOperator(operator) {
    isDecimal = false; //Make possible to use decimal point on second operand

    //To make sure you cant input two operators next to each other
    if(["+", "-", "*", "/"].includes(displayContainer.value.slice(-1))) {
        alert("Error! Cannot have two operators next to each other");
        return;
    }

    //To make sure you dont use operator on an empty input
    if(displayContainer.value == "") {
        alert("Error! Empty input");
        return;
    }

    //If there already is an operator evaluate the previous expression
    if(!isOperator) {
        displayContainer.value += operator;
        lastOperator = operator;
        isOperator = true;

    }

    //Add first operator
    else {
        let temp = displayContainer.value.split(lastOperator);
        displayContainer.value = operate(temp[0], temp[1], lastOperator);
        displayContainer.value += operator;
        isOperator = true;
        lastOperator = operator;
    }
}   

//Evaluates expressions like a+b, a-b, a*b or a/b
function operate(a,b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if(operator == "+") {
        return(a + b);
    }
    else if(operator == "-") {
        return(a - b);
    }
    else if(operator == "*") {
        return(a * b);
    }
    else if(operator == "/") {
        if(b == 0) return "Cannot divide by Zero";
        if(a%b == 0) return (a / b);
        else return (a / b).toFixed(2);
    }
    
}

//Changes sign of a number
function signButton() {
    //If there already is an operator np. 12+
    if(isOperator) {
        let temp = displayContainer.value.split(lastOperator);

        //If the number is already negative ex. 12/-3
        if(temp[1].charAt(0) == "-") {
            temp[1] = temp[1].substr(1);
            displayContainer.value = temp.join(lastOperator);
        }
        else {

            temp[1] = "-" + temp[1];
            displayContainer.value = temp.join(lastOperator);
            if(displayContainer.value.includes("--")) {
                displayContainer.value = displayContainer.value.split("--").join("+");
                lastOperator = "+";
            }
        }

    }

    //If there's no operator in input 
    else {
        //Check if the number is already negative ex. -3
        if(displayContainer.value.charAt(0) == "-") {
            displayContainer.value = displayContainer.value.substr(1);
        }
        else {
            displayContainer.value = "-" + displayContainer.value;
        }
    }
}

//Evalutes expression if there is an operator
function equalButton() {
    if(isOperator) {
        let temp = displayContainer.value.split(lastOperator);
        displayContainer.value = operate(temp[0], temp[1], lastOperator);
        isOperator = false;
        lastOperator = "";
    }    
}

//Adds decimal point to the input
function decimalButton() {
    //If there already is an operator ex. 2*3
    if(isOperator) {
        //Prevent double decimal point ex. 0..3
        if(!isDecimal) {
            let temp = displayContainer.value.split(lastOperator);
            //If the second number is empty (or empty with negative sign) adds 0 before the decimal point
            if(temp[1] == "" || temp[1] == "-") {
                temp[1] = temp[1] + "0.";
                displayContainer.value = temp.join(lastOperator);
            }
            else {
                displayContainer.value += ".";
            }
            isDecimal = true;           
        }
    }

    //If its the first number in the input
    else {
        //Prevent double decimal point ex. 4..287
        if(!isDecimal) {
            //Adds 0 if the first number is empty (or empty with negative sign) ex. .3 --> 0.3
            if(displayContainer.value == "" || displayContainer.value == "-") displayContainer.value += "0";
            displayContainer.value += ".";
            isDecimal = true;
        }
    }
}