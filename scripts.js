//*=======================================
//* TODO
//*=======================================
//* refactor
//* incrimental range -10 +10 on every win
//* aria functionality

var randomNumber = Math.floor(Math.random() * 100)+1
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
var buttonChangeMin = document.querySelector('#button__change-min')
var buttonChangeMax = document.querySelector('#button__change-max')
var userNumber = parseInt(formInput.value);

formInput.addEventListener('keyup', formReset, false);
formInput.addEventListener('click', formReset, false);
buttonGuess.addEventListener('click', displayNum);
buttonClear.addEventListener('click', clear);
buttonReset.addEventListener('click', reset);
formInputMin.addEventListener('blur',changeRangeMin,false);
buttonChangeMin.addEventListener('click', newRandomNumber, false);
buttonChangeMax.addEventListener('click', newRandomNumber, false);
formInputMax.addEventListener('blur',changeRangeMax,false);
formInput.addEventListener('keyup', errorReset, false);
formInput.addEventListener('keypress', preventUnwantedKeys);


//Hide Advanced Features
hideAdvanced();

function hideAdvanced() {
  inputLabelMin.style.display = 'none';
  inputLabelMax.style.display = 'none';
  buttonChangeMin.style.display = 'none';
  buttonChangeMax.style.display = 'none';

}

//Button Disable

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
  if(bigText.innerText != '') {
    buttonReset.disabled = false;
  } else {
    buttonReset.disabled = true;
  }
}

//Prevent the E key

function preventUnwantedKeys(evt) {
  if (evt.keyCode != 8 && evt.keyCode != 45 && evt.keyCode != 0 && evt.keyCode < 48 || evt.keyCode > 57) {
    evt.preventDefault();
    pWarning.innerText = 'That is not a number';
  }
}

//Guess Button - Top text replace - Number insert

function displayNum() {
  event.preventDefault();
  checkNum();
  formReset();
}

//Cear Button

function clear() {
  event.preventDefault();
  formReset();
  formInput.value = '';
  formReset();
}

//Reset Button

function reset() {
  pGuess.innerHTML = 'Guess a number between1 and 100';
  bigText.innerHTML = '';
  pTooHighTooLow.innerHTML = '';
  buttonReset.setAttribute('disabled', true);
  hideAdvanced();
  formReset();
}

//CHANGE RANGE

function changeRangeMin() {
  minNumber=parseInt(this.value);
}


function changeRangeMax() {
  maxNumber=parseInt(this.value);
}

function newRandomNumber() {
  event.preventDefault();
  if (formInputMin.value.length > 0 && formInputMax.value.length > 0) {
    console.log('success!')
    randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
  } else {
    randomNumber = randomNumber;
  }
}

// User# === Random# 
function displayResult() {
  pGuess.innerHTML = 'Your last guess was';
  bigText.innerHTML = parseInt(formInput.value);
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
    showExtra();
    displayResult();
  } else{
    highLow();
  }
}

function showExtra() {
    buttonChangeMin.style.display = '';
    buttonChangeMax.style.display = '';
    pTooHighTooLow.innerHTML ='Boom!';
    inputLabelMin.style.display = '';
    inputLabelMax.style.display = '';
    pCongrats.innerHTML= 'Congrats! Pick your own range.';
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

function errorReset() {
  pWarning.innerHTML='';
}