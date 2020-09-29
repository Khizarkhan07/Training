(function () {

  var code = [], // Color sequence the player needs to guess
      guess = [], // Color sequence of player's guesses
      options = document.getElementsByClassName('option'),
      sockets = document.getElementsByClassName('socket'),
      inputRows = document.getElementsByClassName('guess'),
      hintContainer = document.getElementsByClassName('hint'),
      modalOverlay = document.getElementById('modalOverlay'),
      modalMessage = document.getElementById('modalMessage'),
      rowIncrement = 0,
      hintIncrement = 0,
      colorSelected = 'green',
      valueSelected = 1
      

  function gameSetup () {
    generateSecretCode(1, 7);
    console.log(code)
      for (var i = 0; i < options.length; i++){
        options[i].addEventListener('click', getValues, false);
      }

      for(var i =0 ; i< 4; i++){
        sockets[i].addEventListener('click', addGuess, false)
      }
    }
    

  function getValues () {
      let self = this;
      colorSelected = self.id;
      valueSelected= self.value;
  }
    
  function addGuess () {
    let self = this;
    self.className = self.className + ' peg ' + colorSelected; 
    self.removeEventListener('click', addGuess, false)
    guess.push(parseInt((valueSelected)));
    

    if (guess.length === 4) {
      if (compare())
        gameState('won');
      else  
        rowIncrement += 1;
        for(var i =rowIncrement*4 ; i< (rowIncrement*4)+4; i++){
            sockets[i].addEventListener('click', addGuess, false)
          }
    }
    if ( rowIncrement === inputRows.length && !compare() )
      gameState('lost');
  }

  function compare () {
    let isMatch = true;
    let codeCopy = code.slice(0);

    // First check if there are any pegs that are the right color in the right place
    for (var i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) {
        insertPeg('hit');
        codeCopy[i] = 0;
        guess[i] = -1;
      } else
        isMatch = false;
    }

    // Then check if there are any pegs that are the right color but NOT in the right place
    for (var j = 0; j < code.length; j++) {
      if (codeCopy.indexOf(guess[j]) !== -1) {
        insertPeg('almost');
        codeCopy[codeCopy.indexOf(guess[j])] = 0;
      }
    }

    hintIncrement += 1; // Set the next row of hints as available
    guess = [];         // Reset guess sequence

    return isMatch;
  }

  function insertPeg (type) {
    let sockets = hintContainer[hintIncrement].getElementsByClassName('js-hint-socket');
    sockets[0].className = 'socket ' + type;
  }

  

  function newGame () {
    guess = [];        
    clearBoard();
    rowIncrement = 0;  
    hintIncrement = 0; 
    hideModal();
    gameSetup();    
  }

  function hideModal () {
    modalOverlay.className = '';
  }

  function clearBoard () {
    // Clear the guess sockets
    for (var i = 0; i < inputRows.length; i++) {
      inputRows[i].innerHTML = '';
      for (var j = 0; j < 4; j++) {
        let socket = document.createElement('div');
        socket.className = 'socket';
        inputRows[i].appendChild(socket);
      }
    }

    // Clear the hint sockets
    for (var i = 0; i < hintContainer.length; i++) {
      let socketCollection = hintContainer[i].getElementsByClassName('socket');
      for (var j = 0; j < 4; j++) {
        socketCollection[j].className = 'js-hint-socket socket';
      }
    }

    document.getElementsByTagName('body')[0].className = '';
  }

  // Creates a color sequence that the player needs to guess
  function generateSecretCode (min, max) {
    for (var i = 0; i < 4; i++)
      code[i] = Math.floor(Math.random() * (max - min)) + min;
      
  }

  

  function gameOver () {
    for (var i = 0; i < options.length; i++)
      options[i].removeEventListener('click', getValues, false);

  }

  

  function gameState (state) {
    gameOver();
    document.getElementsByTagName('body')[0].className = state;
    modalOverlay.className = state;

    if (state === 'won') {
      modalMessage.innerHTML = '<h2>CONGRATULATIONS</h2> <button id="restartGame" class="large primary">Play again</button>';
      document.getElementById('restartGame').onclick = newGame;
    } else
      modalMessage.innerHTML = '<h2>Game Over</h2> <button id="restartGame" class="large primary">Restart</button>';
      document.getElementById('restartGame').onclick = newGame;
  }

  
  gameSetup(); // Run the game
}());

function showRules(){
    $("#instructions").css("display","block") 
    $("#rules-show-btn").css("display","none")
    $("#rules-hide-btn").css("display","block")
}
function hideRules (){
    $("#instructions").css("display","none") 
    $("#rules-show-btn").css("display","block")
    $("#rules-hide-btn").css("display","none")
}


