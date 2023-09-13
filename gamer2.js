const gamePlay=(()=>{
    let gameBoard=[[0,0,0],[0,0,0],[0,0,0]];
    let sign_player='X';
    let current_player=2;
    const resetBoard=()=>{
        gameBoard=[[0,0,0],[0,0,0],[0,0,0]];
        current_player=2;
        console.log(gameBoard);
    }
    const getBoard=()=>{
        let myBoard=gameBoard;
        return myBoard;
    }
    const changeBoard=(x,y)=>{
        if(gameBoard[x][y]==0){
        _switch_sign();
        gameBoard[x][y]=sign_player;
        if(sign_player=='X'){
            player1.playercount++;
        }
        else{
            player2.playercount++;
        }
        return sign_player;
    }
    else{
        return 'error';
    }
    }
    const determineWinner=()=>{
        for(let row = 0; row < 3; row++)
        {
            if (gameBoard[row][0] == gameBoard[row][1] &&
                gameBoard[row][1] == gameBoard[row][2])
            {
                if (gameBoard[row][0] == 'X')
                {
                    _endGame();
                    return (player1.playername+' wins');
                }
                    
                else if (gameBoard[row][0] == 'O')
                {
                    _endGame();
                    return (player2.playername+' wins');
                }
            }
        }
    
        // Checking for Columns for X or O victory.
        for(let col = 0; col < 3; col++)
        {
            if (gameBoard[0][col] == gameBoard[1][col] &&
                gameBoard[1][col] == gameBoard[2][col])
            {
                if (gameBoard[0][col] == 'X'){
                    _endGame();
                    return (player1.playername+' wins');
                }
    
                else if (gameBoard[0][col] == 'O'){
                    _endGame();
                    return (player2.playername+' wins');
                }
            }
        }
    
        // Checking for Diagonals for X or O victory.
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2])
        {
            if (gameBoard[0][0] == 'X')
            {
                _endGame();
                return (player1.playername+' wins');
            }
            else if (gameBoard[0][0] == 'O')
            {
                _endGame();
                return (player2.playername+' wins');
            }
        }
    
        if (gameBoard[0][2] == gameBoard[1][1] &&
            gameBoard[1][1] == gameBoard[2][0])
        {
            if (gameBoard[0][2] == 'X')
            {
                _endGame();
                return (player1.playername+' wins');
            }
                
            else if (gameBoard[0][2] == 'O')
            {
                _endGame();
                return (player2.playername+' wins');
            }
        }
            let gamedraw=1;
            for(let row of gameBoard){
                if(row.includes(0)){
                    gamedraw*=0;
                }
            }
            if(gamedraw==1){
                _endGame();
                return 'it is a draw';
            }
            else{
                return '...';
            }
        

    }
    const _switch_sign=()=>{
        if(current_player%2==0){
            sign_player='X';
        }
        else{
        sign_player='O'
        }
        current_player++;
    }
    const _endGame=()=>{
            buttons.forEach(button=>{
                button.disabled=true;
                clearTimeout(timeout);
            })
    }
    return{
    getBoard,
    resetBoard,
    changeBoard,
    determineWinner
}
})();
const player=(nameofplayer)=>{
    let playername=nameofplayer;
    let playercount=0;
    return{
        playername,
        playercount
    }
}
let timeout;
const player1=player('Dennis');
const player2=player('Reuben');
const buttons=document.querySelectorAll('.main button');
const display=document.querySelector('.display');
const dialog=document.querySelector('dialog');
dialog.showModal();
const player1name=document.querySelector('#name1');
const player2name=document.querySelector('#name2');
const pvp=document.querySelector('#pVp');
const pvai=document.querySelector('#pVai');
const confirmBtn=document.querySelector('#confirm');
const restartBtn=document.querySelector('.Restart');
let pvaistatus;
restartBtn.addEventListener('click',()=>{
    buttons.forEach(button=>{
        button.disabled=false;
        button.textContent='';
    })
    clearTimeout(timeout);
    gamePlay.resetBoard();
    display.textContent='';
    if(pvaistatus==false){
        buttons.forEach(button=>button.removeEventListener('click',PlayerVPlayer));
    }
    else if(pvaistatus==true){
        buttons.forEach(button=>button.removeEventListener('click',PlayerVaI));
    }
   
    dialog.showModal();
})
pvai.addEventListener('change',()=>{
    if(pvai.checked==true){
        player2name.disabled=true;
    }
})
pvp.addEventListener('change',()=>{
    if(pvp.checked==true){
        player2name.disabled=false;
    }
})
confirmBtn.addEventListener('click',()=>{
    player1.playername=player1name.value;
    if(pvp.checked==true){
        player2.playername=player2name.value;
        pvaistatus=false;

    }
    else{
        player2.playername='AI';
        pvaistatus=true;
    }
    if(pvaistatus==false){
        buttons.forEach(button=>button.addEventListener('click',PlayerVPlayer));
    }
    else{
        buttons.forEach(button=>button.addEventListener('click',PlayerVaI));
    }
    player1name.value='';
    player2name.value='';
   
})
function PlayerVPlayer(){
    let myCoordinates=this.getAttribute('data');
    let myArrayCoordinates=myCoordinates.split('-');
    this.textContent=gamePlay.changeBoard(...myArrayCoordinates);
    if(player1.playercount>2 || player2.playercount>2){
        display.textContent=gamePlay.determineWinner();
    }
    this.disabled=true;
}
function PlayerVaI(){
    let myCoordinates=this.getAttribute('data');
    let myArrayCoordinates=myCoordinates.split('-');
    this.textContent=gamePlay.changeBoard(...myArrayCoordinates);
    timeout=setTimeout(unbeatableAi,1000);
    if(player1.playercount>2 || player2.playercount>2){
        display.textContent=gamePlay.determineWinner();
    }
    this.disabled=true;  
}
//if you want to add easy mode
/*function RandomAI(){
    let AIstatus;
    let a,b;
    do{
        a = Math.floor(Math.random() * (3));
        b = Math.floor(Math.random() * (3));
        AIstatus=gamePlay.changeBoard(a,b);
    }while(AIstatus=='error');
    let index=a*3+b+1;
    index++;
    const gamecell=document.querySelector(`div button:nth-child(${index})`);
    gamecell.textContent=AIstatus;
    gamecell.disabled=true;
    if(player1.playercount>2 || player2.playercount>2){
        display.textContent=gamePlay.determineWinner();
    }
}*/
function unbeatableAi(){
    let secondboard=gamePlay.getBoard();
    let Boardgame=secondboard.map((item) => item.slice());
    Boardgame=Converttoflatboard(Boardgame);
    let myUnbeatablemove=minimax(Boardgame,aiPlayer);
    let AIstatus;
    let index=myUnbeatablemove.index;
    let my2Dindex=indexTo2D(index);
    AIstatus=gamePlay.changeBoard(my2Dindex[0],my2Dindex[1]);
    index++;
    const gamecell=document.querySelector(`div button:nth-child(${index})`);
    gamecell.textContent=AIstatus;
    gamecell.disabled=true;
    if(player1.playercount>2 || player2.playercount>2){
        display.textContent=gamePlay.determineWinner();
    }
}
function Converttoflatboard(array2D){
    let oneDArray = [].concat.apply([], array2D);
    let n=oneDArray.length;
    for(let i=0;i<n;i++){
        if(oneDArray[i]==0){
            oneDArray[i]=i;
        }
    }
    return oneDArray;


}
function indexTo2D(idx) {
    const row = Math.floor(idx /3);
    const col = idx %3;
    return [row, col];
  }

// human
let aiPlayer = "O";
// ai
let huPlayer = "X";


// keep track of function calls
let fc = 0;

// finding the ultimate play on the game that favors the computer
//let bestSpot = minimax(origBoard, aiPlayer);

//loging the results


// the main minimax function
function minimax(newBoard, player){
  
  //keep track of function calls;
  fc++;

  //available spots
  let availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-1000000+fc};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:1000000-fc};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  let moves = [];

  // loop through available spots
  for (let i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    let move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  let bestMove;
  if(player === aiPlayer){
    let bestScore = -Infinity;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    let bestScore =Infinity;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

  




