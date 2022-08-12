// Object having the properties of the app defined
let calculator = {
      displayValue: 0,
      firstInput : null,
      operator: null,
      secondInput: null,
      nextInput : false
}

// to overwrite the initial display value
function inputDigit (digit){
   const { displayValue, nextInput } = calculator;

   if (nextInput === true) {
      calculator.displayValue = digit;
      calculator.nextInput = false;
   } else {
      calculator.displayValue = displayValue == '0' ? digit : displayValue + digit
   }
} 

function inputDecimal(dot){
   if (calculator.nextInput === true){
      calculator.displayValue = "0.";
      calculator.nextInput = false;
      return
   }
   if (!calculator.displayValue.includes(dot)){
      calculator.displayValue += dot;
   }
}

function handleOperator(nextOperator) {
   const { firstInput, operator, displayValue } = calculator
   const inputValue = parseFloat(displayValue)
   if (operator && calculator.nextInput) {
      calculator.operator = nextOperator
      return;
   }
   
   if (firstInput == null && !isNaN(inputValue)) {
      calculator.firstInput = inputValue;
   } else if (operator){      
      const result = calculation(firstInput, operator, inputValue);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`
      calculator.firstInput = result;
   }
   
   calculator.nextInput = true;
   calculator.operator = nextOperator;
}

function calculation (firstInput, operator, secondInput) {
  
   if (operator === "+"){
       return firstInput + secondInput
   } 
   if (operator === "-"){
       return firstInput - secondInput
   }
   if (operator === "*"){
      return firstInput * secondInput
   }
   if (operator === "/"){
      return firstInput / secondInput
   }
   if (operator == "%"){
      return secondInput / 100
   }
   if (operator === "+/-"){
      if (firstInput < 0) {
         return -firstInput 
      }
      return firstInput
   }

   return secondInput;
}

function handlePercent (value) {
   const { firstInput, displayValue } = calculator
   const inputValue = parseFloat(displayValue);
      calculator.firstInput = inputValue;
      const result = calculation(firstInput, value, inputValue);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`
      calculator.firstInput = result;
      calculator.nextInput = true;
}

function handleSign () {
   const { displayValue } = calculator;
   const inputValue = parseFloat(displayValue);
   const result = inputValue * (-1)
   calculator.displayValue = `${parseFloat(result.toFixed(7))}`
   calculator.firstInput = result;
   calculator.nextInput = true;
}

function clearAll() {
   calculator.displayValue = "0";
   calculator.firstInput = null;
   calculator.operator = null;
   calculator.nextInput = false;
}

// function to display what is on the screen
function screenValue () {
   let displayScreen = document.getElementById('display');
   displayScreen.value = calculator.displayValue;
}

screenValue()

let keys = document.getElementsByClassName('buttons')[0];
// adding event listener to listen to the events triggered
keys.addEventListener('click', (event)=>{
  const { target } = event;
  const  { value } = target;
  if(!target.matches('button')){
   return;
  }

  switch (value) {
   case "+":
   case "-":
   case "*":
   case "/":
   case "=":
      handleOperator(value);
      break;
   case "%":
      handlePercent(value);
      break;
   case "+/-":
      handleSign()
      break
   case ".":
      inputDecimal(value);
      break;
   case "clear":
      clearAll();
      break;
   default:
      if(Number.isInteger(parseFloat(value))){
         inputDigit(value);
      }
  }
  screenValue()
})