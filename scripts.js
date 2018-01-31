//*=======================================
//* TODO
//*=======================================
//* refactor
//* variable math.random 
//* incrimental range -10 +10 on every win
//* aria functionality



//Variable Range---------------------------------------------------------------------------------------------------! Not working
// formInput.addEventListener('focus', getRandomArbitrary, false);

// function getRandomArbitrary() {
//   console.log(formInputMin.length);
//   console.log(formInputMax.length);
//   if (formInputMin.value.length > 0 && formInputMax.value.length > 0) {
//     console.log('success!')
//     randomNumber=Math.floor(Math.random() * (minNumber - maxNumber) + minNumber);
//   } else {
//     randomNumber=randomNumber;
//   }
// }





//Global Variables Non-repeat
var randomNumber = Math.floor(Math.random() * 99)+1
var minNumber = 1
var maxNumber = 100
var formInput = document.querySelector('#form__input')
var formInputMin = document.querySelector('#form__input-min')
var formInputMax = document.querySelector('#form__input-max')
var inputLabelMin = document.querySelector('#input__label-min')
var inputLabelMax = document.querySelector('#input__label-max')
var buttonClear = document.querySelector('#button__clear')
var buttonReset = document.querySelector('#button__reset')
var buttonGuess = document.querySelector('#button__guess')
var pGuess = document.querySelector('#p__guess')
var bigText = document.querySelector('#big__text')
var pWarning = document.querySelector('#p__warning')
var pTooHighTooLow = document.querySelector('#p__high')
var pCongrats = document.querySelector('#form__p-congrats')

//Designates userNumber 
formInput.addEventListener('input',changeNum,false);
function changeNum() {
  userNumber=formInput.value;
}

//Hide Advanced Features
hideAdvanced();

function hideAdvanced() {
  inputLabelMin.style.display='none';
  inputLabelMax.style.display='none';
}

//Button Disable
formInput.addEventListener('keyup', formReset, false);
formInput.addEventListener('click', formReset, false);

function formReset() {
  if(formInput.value.length > 0) { 
    buttonClear.disabled = false;
    buttonReset.disabled = false;
    buttonGuess.disabled = false;
  } else { 
    buttonClear.disabled = true;
    buttonGuess.disabled = true;
    resetAll();
  }
}
function resetAll() {
  if(userNumber.length >0) {
    buttonReset.disabled = false;
  } else {
    buttonReset.disabled = true;
  }
}

//Prevent the E key
formInput.addEventListener('keypress', function (evt) {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

//Guess Button - Top text replace - Number insert
buttonGuess.addEventListener('click', display_num);

function display_num() {
  event.preventDefault();
  checkNum();
  formReset();
}

//Cear Button
buttonClear.addEventListener('click', clear);

function clear() {
  event.preventDefault();
  formReset();
  formInput.value= '';
  formReset();
}

//Reset Button
buttonReset.addEventListener('click', reset);

function reset() {
  pGuess.innerHTML='Guess a number between1 and 100';
  bigText.innerHTML='';
  pTooHighTooLow.innerHTML='';
  buttonReset.setAttribute('disabled', true);
  hideAdvanced();
  formReset();
}

//CHANGE RANGE
formInputMin.addEventListener('blur',changeRangeMin,false);

function changeRangeMin() {
  minNumber=this.value;
}

formInputMax.addEventListener('blur',changeRangeMax,false);

function changeRangeMax() {
  maxNumber=this.value;
}

// User# === Random# 
function displayResult() {
  pGuess.innerHTML='Your last guess was';
  bigText.innerHTML=parseInt(formInput.value);
  formInput.value = '';
}
function checkNum() {
  console.log(randomNumber);
  var userNumber = parseInt(formInput.value);
  var outOfRangeMsg =pWarning;
  if (userNumber > maxNumber || userNumber < minNumber) {
    outOfRangeMsg.textContent = '* That number is outside the designated range';
    formInput.value = '';
  } else if (randomNumber === userNumber) {
    randomNumber = Math.floor(Math.random() * 99)+1;
    pTooHighTooLow.innerHTML='Boom!';
    inputLabelMin.style.display= '';
    inputLabelMax.style.display= '';
    pCongrats.innerHTML= 'Congrats! Pick your own range.';
    displayResult();
  } else{
    highLow();
  }
}

//User guess too high/too low
function highLow() {
  var userNumber = parseInt(formInput.value);
  if (randomNumber > userNumber) {
    pTooHighTooLow.innerHTML='That is too low';
    displayResult();
    formInput.value = '';
  } else if (randomNumber < userNumber) {
    pTooHighTooLow.innerHTML='That is too high';
    displayResult();
    formInput.value = '';
  }
}

//Error Reset
formInput.addEventListener('keyup', errorReset, false);

function errorReset() {
  pWarning.innerHTML='';
}