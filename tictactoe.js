let gameboard=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let gamevalue=2;
const createBoard=()=>{
    const increasecounter=()=>{
        gamevalue++;
    }
    const changeBoard=(row,column,value1) =>{
        if(gameboard[row][column]==0){
        gameboard[row][column]=value1;
        increasecounter();
        }
    }
    const printBoard=()=>{
        console.log(JSON.parse(JSON.stringify(gameboard)));
    }
    return{changeBoard,printBoard};

}
const Player=(name)=>{
    let playername=name;
    let playercount=0;
    const {changeBoard}=createBoard();
    return{changeBoard,playername,playercount};
}
const GameDisplay=()=>{
    const {printBoard}=createBoard();
    return{printBoard}
}
const Playround=()=>{
    const determinePlayer=(x,y)=>{
        if(gamevalue%2==0){
            player1.changeBoard(x,y,'X');
        }
        else{
            player2.changeBoard(x,y,'O');
        }    
    }
    return{determinePlayer}
}
const DetermineWinner=()=>{
    let winstatus=false;
    outer:for(let i=0;i<3;i++){
        let win='';
        inner:for(let j=0;j<3;j++){
            if(j>0 && gameboard[i][j]!==gameboard[i][j-1]){
                break inner;
            }
            win+=gameboard[i][j];
        }
        if(win=='XXX' || win=='OOO'){
            if(win=='XXX'){
                winstatus=true;
                return (player1.playername+' wins');
                
            }
            else{
                winstatus=true;
                return (player2.playername+' wins');
            }
        }

    }
    if(winstatus==false){
        outer1:for(let i=0;i<3;i++){
            let win='';
            inner1:for(let j=0;j<3;j++){
                if(j>0 && gameboard[j][i]!==gameboard[j-1][i]){
                    break inner1;
                }
                win+=gameboard[j][i];
            }
            console.log(win);
               if(win=='XXX' || win=='OOO'){
                if(win=='XXX'){
                    winstatus=true;
                    return (player1.playername+' wins');
                }
                else{
                    winstatus=true;
                    return (player2.playername+' wins');
                }
            }
        }
    
        }
    if(winstatus==false){
        let win=''+gameboard[0][2]+gameboard[1][1]+gameboard[2][0];
        let win2=''+gameboard[0][0]+gameboard[1][1]+gameboard[2][2];
        if(win=='XXX'|| win=='OOO'){
            if(win=='XXX'){
                winstatus=true;
                return (player1.playername+' wins');  
            }
            else{
                winstatus=true;
                return (player2.playername+' wins');  
            }
        }
        else if(win2=='XXX' || win2=='OOO'){
         if(win2=='XXX'){
            winstatus=true;
            return (player1.playername+' wins');  
        }
        else{
            winstatus=true;
            return (player2.playername+' wins');  
        }
    }}
    if(winstatus==false ){
        let gameover=true;
        outer2:for(let arr of gameboard){
                if(arr.includes(0)){
                    gameover=false;
                    break outer2;
                }    
        }
        if(gameover){
        return 'draw';
        }
    }}
let player1name='',player2name='';  
const currentgame=GameDisplay();
const play=Playround();
const buttons=document.querySelectorAll('.main>button');
const divDisplay=document.querySelector('.display');
const button=document.querySelector('dialog button');
const playdialog=document.querySelector('dialog');
button.addEventListener('click',()=>{
    const player1input=document.querySelector('#Player1');
    const player2input=document.querySelector('#Player2');
    player1.playername=player1input.value;
    player2.playername=player2input.value; 
    playdialog.close();
})
const player1=Player(player1name);
const player2=Player(player2name);  
buttons.forEach(button=>{
    button.addEventListener('click',function(){
        let data_key=button.getAttribute('data');
        const myArray=data_key.split("-");
        if(gamevalue%2==0){
            button.textContent='X';
            player1.playercount++;
            play.determinePlayer(...myArray)  
        }
        else{
            button.textContent='O';
            player2.playercount++;
            play.determinePlayer(...myArray)
        }
        if(player1.playercount>=3 || player2.playercount>=3){
            divDisplay.textContent=DetermineWinner();
        }
        
    })
});

