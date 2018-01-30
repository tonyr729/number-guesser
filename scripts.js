
//Global Variables Non-repeat
var randomNum = Math.floor(Math.random() * 99)+1;
var minNum = 1
var maxNum = 100

document.getElementById('form__input').addEventListener('input',changeNum,false);
  function changeNum() {
    userNum=this.value;
    main();
}
//Hide Advanced Features
hideAdvanced();

function hideAdvanced() {
  document.getElementById('input__label-min').style.display='none';
  document.getElementById('input__label-max').style.display='none';
  document.getElementById('hidden__img').style.display='none';
}

main();

function main() {



  //TODO

  //Assign Input to Variable to use in Boolean for restriction ----------------------------------------------------------! Works but not inside Boolean


  //CHANGE RANGE
  document.getElementById('form__input-min').addEventListener('blur',changeRangeMin,false);
  function changeRangeMin() {
    minNum=this.value;
    main();
  }
  document.getElementById('form__input-max').addEventListener('blur',changeRangeMax,false);
  function changeRangeMax() {
    maxNum=this.value;
    main();
  }


  //Prevent the E key
  document.getElementById('form__input').addEventListener('keypress', function (evt) {
      if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
      {
          evt.preventDefault();
      }
  });


  //Button Disable

  document.getElementById('form__input').addEventListener('keyup', emptyReset, false);
  function emptyReset(){
    if(this.value.length > 0) { 
      document.getElementById('button__clear').disabled = false;
      document.getElementById('button__reset').disabled = false; 
      document.getElementById('button__guess').disabled = false;
    } else { 
      document.getElementById('button__clear').disabled = true;
      document.getElementById('button__reset').disabled = true;
      document.getElementById('button__guess').disabled = true;
    }
  }
  document.getElementById('big__text').addEventListener('change', resetAll, false);
  function resetAll(){
    if(this.value.length > 0) { 
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
  }

  //Cear Button-----------------------------------------------------------------------------------------------------! Clear Phase 3
  document.getElementById('button__clear').addEventListener('click', clear);
  function clear() {
    event.preventDefault();
    document.getElementById('form__input').value= ' ';
    document.getElementById('button__clear').setAttribute('disabled', true);

  }

  //Reset Button----------------------------------------------------------------------------------------------------! Rest Phase 3
  document.getElementById('button__reset').addEventListener('click', reset);
  function reset() {
    document.getElementById('p__guess').innerHTML='Guess a number between1 and 100';
    document.getElementById('big__text').innerHTML='';
    document.getElementById('p__high').innerHTML='';
    document.getElementById('button__reset').setAttribute('disabled', true);
    hideAdvanced();
  }

 // User# === Random# 
  function displayResult() {
    document.getElementById('p__guess').innerHTML='Your last guess was';
    document.getElementById('big__text').innerHTML=parseInt(document.getElementById('form__input').value);
    document.getElementById('form__input').value = '';
  }
  function checkNum() {
      console.log('checkNum');
      console.log(randomNum);
      var userNum = parseInt(document.getElementById('form__input').value);
      var elMsg =document.getElementById('p__warning');
      if (userNum > maxNum || userNum < minNum) {
        elMsg.textContent = '* That number is outside the designated range';
        document.getElementById('form__input').value = '';
      } else if (randomNum === userNum) {
          document.getElementById('p__high').innerHTML='Boom!';
          document.getElementById('input__label-min').style.display= '';
          document.getElementById('input__label-max').style.display= '';
          document.getElementById('hidden__img').style.display= '';
          displayResult();
          randomNum = Math.floor(Math.random() * 99)+1;
      } else{
          highLow();
        }
  }

  //Error Reset
  document.getElementById('form__input').addEventListener('keyup', errorReset, false);
  function errorReset() {
    document.getElementById('p__warning').innerHTML='';
  }

  //Shows if the number was high or low
  function highLow() {
      console.log('highLow')
      var userNum = parseInt(document.getElementById('form__input').value);
      if (randomNum > userNum) {
        document.getElementById('p__high').innerHTML='That is too low';
        displayResult();
        document.getElementById('form__input').value = '';
      } else if (randomNum < userNum) {
        document.getElementById('p__high').innerHTML='That is too high';
        displayResult();
        document.getElementById('form__input').value = '';
      }
  }
    // document.getElementById('p__min').innerHTML=minNum;
    // document.getElementById('p__max').innerHTML=maxNum;
}