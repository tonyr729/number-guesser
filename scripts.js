




//TODO
// fix/delete main();
// refactor
// assign variables for legability
// CSS- idomatic property arrangment 
// variable math.random 
// incrimental range -10 +10 on every win













//Global Variables Non-repeat
var randomNumber = Math.floor(Math.random() * 99)+1
var minNumber = 1
var maxNumber = 100
var formInput = document.getElementById('form__input')
var formInputMin = document.getElementById('form__input-min')
var formInputMax = document.getElementById('form__input-max')

formInput.addEventListener('input',changeNum,false);
  function changeNum() {
    userNumber=formInput.value;
}

//Hide Advanced Features
hideAdvanced();

function hideAdvanced() {
  document.getElementById('input__label-min').style.display='none';
  document.getElementById('input__label-max').style.display='none';
  document.getElementById('hidden__img').style.display='none';
}

// main();

// function main(){
 //Assign Input to Variable to use in Boolean for restriction ----------------------------------------------------------! Works but not inside Boolean


  //CHANGE RANGE
  document.getElementById('form__input-min').addEventListener('blur',changeRangeMin,false);

  function changeRangeMin() {
    minNumber=this.value;
    // main();
  }
  document.getElementById('form__input-max').addEventListener('blur',changeRangeMax,false);

  function changeRangeMax() {
    maxNumber=this.value;
    // main();
  }
  //Variable Range---------------------------------------------------------------------------------------------------! Not working
  // formInput.addEventListener('focus', getRandomArbitrary, false);

  // function getRandomArbitrary() {
  //   console.log(formInputMin.length);
  //   console.log(formInputMax.length);
  //   if (formInputMin.value.length > 0 && formInputMax.value.length > 0){
  //     console.log('success!')
  //     randomNumber=Math.floor(Math.random() * (minNumber - maxNumber) + minNumber);
  //   } else {
  //     randomNumber=randomNumber;
  //   }
  // }
  

  //Prevent the E key
  formInput.addEventListener('keypress', function (evt) {
      if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
  });


  //Button Disable

  formInput.addEventListener('keyup', formReset, false);

  function formReset(){
    if(formInput.value.length > 0) { 
      document.getElementById('button__clear').disabled = false;
      document.getElementById('button__reset').disabled = false;
      document.getElementById('button__guess').disabled = false;
    } else { 
      document.getElementById('button__clear').disabled = true;
      document.getElementById('button__guess').disabled = true;
      resetAll();
    }
  }
  function resetAll(){
    if(userNumber.length >0) {
      document.getElementById('button__reset').disabled = false;
    } else {
      document.getElementById('button__reset').disabled = true;
    }
  }
  

  //Guess Button - Top text replace - Number insert
  document.getElementById('button__guess').addEventListener('click', display_num);

  function display_num() {
    event.preventDefault();
    checkNum();
    formReset();
  }

  //Cear Button-----------------------------------------------------------------------------------------------------! Clear Phase 3
  document.getElementById('button__clear').addEventListener('click', clear);

  function clear() {
    event.preventDefault();
    formReset();
    formInput.value= '';
    formReset();

  }

  //Reset Button----------------------------------------------------------------------------------------------------! Rest Phase 3
  document.getElementById('button__reset').addEventListener('click', reset);

  function reset() {
    document.getElementById('p__guess').innerHTML='Guess a number between1 and 100';
    document.getElementById('big__text').innerHTML='';
    document.getElementById('p__high').innerHTML='';
    document.getElementById('button__reset').setAttribute('disabled', true);
    hideAdvanced();
    formReset();
  }

 // User# === Random# 
  function displayResult() {
    document.getElementById('p__guess').innerHTML='Your last guess was';
    document.getElementById('big__text').innerHTML=parseInt(formInput.value);
    formInput.value = '';
  }
  function checkNum() {
      console.log('checkNum');
      console.log(randomNumber);
      var userNumber = parseInt(formInput.value);
      var outOfRangeMsg =document.getElementById('p__warning');
      if (userNumber > maxNumber || userNumber < minNumber) {
        outOfRangeMsg.textContent = '* That number is outside the designated range';
        formInput.value = '';
      } else if (randomNumber === userNumber) {
          randomNumber = Math.floor(Math.random() * 99)+1;
          document.getElementById('p__high').innerHTML='Boom!';
          document.getElementById('input__label-min').style.display= '';
          document.getElementById('input__label-max').style.display= '';
          document.getElementById('hidden__img').style.display= '';
          displayResult();
      } else{
          highLow();
        }
  }

  //Error Reset
  formInput.addEventListener('keyup', errorReset, false);

  function errorReset() {
    document.getElementById('p__warning').innerHTML='';
  }

  //Shows if the number was high or low
  function highLow() {
      console.log('highLow')
      var userNumber = parseInt(formInput.value);
      if (randomNumber > userNumber) {
        document.getElementById('p__high').innerHTML='That is too low';
        displayResult();
        formInput.value = '';
      } else if (randomNumber < userNumber) {
        document.getElementById('p__high').innerHTML='That is too high';
        displayResult();
        formInput.value = '';
      }
  }
// }