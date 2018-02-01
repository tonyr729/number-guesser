var userNumber
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
var buttonIncrement = document.querySelector('#button__increment')
var buttonUserRange = document.querySelector('#button__user-range')
var guessText = document.querySelector('#p__guess')
var bigText = document.querySelector('#big__text')
var warningText = document.querySelector('#p__warning')
var tooHighTooLowText = document.querySelector('#p__high')
var congratsText = document.querySelector('#form__p-congrats')
var incrementMinText = document.querySelector('#p__increment-min')
var incrementMaxText = document.querySelector('#p__increment-max')



formInput.addEventListener('keyup', disableAll, false);
formInput.addEventListener('keyup', errorReset, false);
formInput.addEventListener('click', disableAll, false);
formInput.addEventListener('keypress', preventUnwantedKeys, false);
formInputMin.addEventListener('blur',changeRangeMin,false);
formInputMax.addEventListener('blur',changeRangeMax,false);
buttonGuess.addEventListener('click', gameStart);
buttonClear.addEventListener('click', clear);
buttonReset.addEventListener('click', reset);
buttonIncrement.addEventListener('click', incrementRange, false);
buttonUserRange.addEventListener('click', userRange, false);

hideAdvancedFeatures();

function hideAdvancedFeatures() {
  inputLabelMin.style.display = 'none';
  inputLabelMax.style.display = 'none';
  buttonUserRange.style.display = 'none';
  buttonIncrement.style.display = 'none';
  congratsText.innerText = '';
}

function disableAll() {
  if (formInput.value.length > 0) { 
    buttonClear.disabled = false;
    buttonReset.disabled = false;
    buttonGuess.disabled = false;
  } else { 
    buttonClear.disabled = true;
    buttonGuess.disabled = true;
    resetAll();
  }
}

function gameStart() {
  event.preventDefault();
  checkNumber();
  disableAll();
}

function checkNumber() {
  console.log(randomNumber);
  var userNumber = parseInt(formInput.value);
  if (userNumber > maxNumber || userNumber < minNumber) {
    warningText.textContent = '* That number is outside the designated range';
    formInput.value = '';
  } else if (randomNumber === userNumber) {
    randomNumber = Math.floor(Math.random() * 99)+1;
    displayResult();
    gameWin();
  } else {
    wrongNumber();
  }
}

function gameWin() {
  buttonIncrement.style.display = '';
  buttonUserRange.style.display = '';
  tooHighTooLowText.innerHTML ='Boom!';
  congratsText.innerHTML= 'You guessed it!';
}

function wrongNumber() {
  var userNumber = parseInt(formInput.value);
  if (randomNumber > userNumber) {
    tooHighTooLowText.innerHTML='That is too low';
    displayResult();
    formInput.value = '';
  } else if (randomNumber < userNumber) {
    tooHighTooLowText.innerHTML='That is too high';
    displayResult();
    formInput.value = '';
  }
}

function displayResult() {
  guessText.innerHTML = 'Your last guess was';
  bigText.innerHTML = parseInt(formInput.value);
  formInput.value = '';
}

function changeRangeMin() {
  minNumber = parseInt(this.value);
  newRandomNumber();
}

function changeRangeMax() {
  maxNumber = parseInt(this.value);
  newRandomNumber();
}

function newRandomNumber() {
  if (formInputMin.value.length > 0 && formInputMax.value.length > 0) {
    randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
    formInputMin.value = '';
    formInputMax.value = '';
    hideAdvancedFeatures();
    displayNewRange();
  }
}

function userRange() {
  event.preventDefault();
  inputLabelMin.style.display = '';
  inputLabelMax.style.display = '';
  incrementMinText.innerText = ' ';
  incrementMaxText.innerText = ' ';
} 

function incrementRange() {
  event.preventDefault();
  maxNumber = (maxNumber + 10);
  minNumber = (minNumber - 10);
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
  displayNewRange();
  hideAdvancedFeatures();
}

function displayNewRange() {
  incrementMinText.innerText = minNumber;
  incrementMaxText.innerText = maxNumber;
}

function preventUnwantedKeys(event) {
  if (event.keyCode != 8 && event.keyCode != 45 && event.keyCode != 0 && event.keyCode < 48 || event.keyCode > 57) {
    event.preventDefault();
    warningText.innerText = 'That is not a number';
  }
}

function clear() {
  event.preventDefault();
  disableAll();
  formInput.value = '';
  disableAll();
}

function reset() {
  guessText.innerHTML = 'Guess a number between1 and 100';
  bigText.innerHTML = '';
  tooHighTooLowText.innerHTML = '';
  buttonReset.setAttribute('disabled', true);
  hideAdvancedFeatures();
  disableAll();
}

function resetAll() {
  if (bigText.innerText != '') {
    buttonReset.disabled = false;
  } else {
    buttonReset.disabled = true;
  }
}

function errorReset() {
  warningText.innerHTML='';
}