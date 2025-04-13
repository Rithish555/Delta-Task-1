/*--------------------------------------------------------ELEMENTS SELECTORS------------------------------------------------------------------------------------ */


const box = document.getElementById("mainbox");
const gameTime = document.getElementById("totaltime");
const dots = document.querySelectorAll(".dots");
const redPlayerTime = document.getElementById("redplayertime");
const bluePlayerTime = document.getElementById("blueplayertime");
const turn = document.getElementById("turn");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const rp = document.getElementById("redpts");
const bp = document.getElementById("bluepts");
const pausename = document.getElementById("pausename");


/*--------------------------------------------------------------CONSTANTS-----------------------------------------------------------------------------------------------*/


let redTimer=15;
let blueTimer=15;
let totalTime = 600;
let count = 0;
let playtime;
let redpts=0;
let bluepts=0;
rp.textContent = `${redpts}`;
bp.textContent = `${bluepts}`;
const nodeEdges=[
    {id:1,width:248,left:30,top:186,deg:124},
    {id:2,width:240,left:255,top:70,deg:0},
    {id:3,width:248,left:470,top:186,deg:56},
    {id:4,width:248,left:470,top:430,deg:124},
    {id:5,width:248,left:252,top:550,deg:0},
    {id:6,width:248,left:34,top:430,deg:56},
    {id:7,width:166,left:134,top:221,deg:124},
    {id:8,width:165,left:293,top:140,deg:0},
    {id:9,width:166,left:445,top:220,deg:56},
    {id:10,width:162,left:445,top:395,deg:124},
    {id:11,width:166,left:292,top:480,deg:0},
    {id:12,width:164,left:138,top:395,deg:56},
    {id:13,width:78,left:250,top:262,deg:125},
    {id:14,width:66,left:342,top:220,deg:0},
    {id:15,width:78,left:420,top:262,deg:55},
    {id:16,width:78,left:420,top:355,deg:125},
    {id:17,width:66,left:342,top:400,deg:0},
    {id:18,width:78,left:250,top:358,deg:55},
    {id:19,width:62,left:98,top:310,deg:0},
    {id:20,width:42,left:475,top:104,deg:124},
    {id:21,width:44,left:470,top:515,deg:56},
    {id:22,width:58,left:270,top:178,deg:55},
    {id:23,width:50,left:505,top:310,deg:0},
    {id:24,width:58,left:270,top:438,deg:125},
]
const edgeNums = [
    {id:2,left:130,top:170},
    {id:1,left:371,top:50},
    {id:2,left:610,top:170},
    {id:3,left:610,top:420},
    {id:2,left:380,top:560},
    {id:2,left:130,top:440},
    {id:6,left:200,top:190},
    {id:6,left:370,top:110},
    {id:5,left:540,top:200},
    {id:6,left:550,top:380},
    {id:4,left:370,top:490},
    {id:6,left:190,top:390},
    {id:9,left:370,top:230},
    {id:7,left:440,top:260},
    {id:7,left:440,top:340},
    {id:9,left:370,top:370},
    {id:8,left:300,top:340},
    {id:7,left:300,top:260},
    {id:1,left:130,top:270},
    {id:1,left:470,top:90},
    {id:1,left:470,top:510},
    {id:1,left:280,top:180},
    {id:1,left:520,top:280},
    {id:1,left:280,top:420},
]
const connectingEdges = [[2,6,7],[1,3],[2,4,9],[3,5],[4,6,11],[1,5],[1,8,12],[7,9,14],[3,8,10],[9,11,16],[5,10,12],[7,11,18],[14,18],[8,13,15],[14,16],[10,15,17],[16,18],[12,13,17]];
const points = [2,1,2,3,2,2,6,6,5,6,4,6,7,9,7,7,9,8,1,1,1,1,1,1];
const edges = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7],[13,14],[14,15],[15,16],[16,17],[17,18],[18,13],[1,7],[3,9],[5,11],[8,14],[10,16],[12,18]];


/*--------------------------------------------------------------FUNCTIONS------------------------------------------------------------------------------------------------*/

nodeEdges.forEach(({width,left,top,deg})=>{
    let edgeDivs = document.createElement("div");
    edgeDivs.style.position=`absolute`;
    edgeDivs.style.width=`${width}px`;
    edgeDivs.style.left=`${left}px`;
    edgeDivs.style.top=`${top}px`;
    edgeDivs.style.transform=`rotate(${deg}deg)`;
    edgeDivs.style.backgroundColor=`aliceblue`;
    edgeDivs.style.height=`3px`;
    box.append(edgeDivs);
})
edgeNums.forEach(({id,left,top}) => {
    let numDivs = document.createElement("div");
    numDivs.textContent= `${id}`
    numDivs.style.position = `absolute`;
    numDivs.style.color = `aliceblue`;
    numDivs.style.fontSize = `larger`;
    numDivs.style.fontWeight = `900`;
    numDivs.style.left = `${left}px`;
    numDivs.style.top = `${top}px`;
    box.append(numDivs);
});
let totalTimeCounter = setInterval(()=>{
    if(totalTime==0){
        clearInterval(totalTimeCounter);
        gameOver();
    }
    gameTime.innerHTML=`${totalTime}`;
    totalTime-=1;
},1000);
function playerTimeCounter(){
    if(count%2==0){
        playtime = setInterval(()=>{
            if(redTimer ==0){ 
                randomMove();
                clearInterval(playtime);
                resetTimerRed();
            }
            redPlayerTime.textContent=`${redTimer}`;
            redTimer--;;
        },1000);
    }
    else{
        playtime = setInterval(()=>{
            if(blueTimer ==0){ 
                randomMove();
                clearInterval(playtime);
                resetTimerBlue();
            }
            bluePlayerTime.textContent=`${blueTimer}`;
            blueTimer--;
        },1000);
    }
}
function resetTimerRed(){
    redTimer = 15;
    blueTimer = 15;
    redPlayerTime.textContent=`${redTimer}`;
    clearInterval(playtime);
    playerTimeCounter();
}
function resetTimerBlue(){
    redTimer = 15;
    blueTimer = 15;
    bluePlayerTime.textContent=`${blueTimer}`;
    clearInterval(playtime);
    playerTimeCounter();
}
function changeTurn(){
    if(count % 2 ==0){
        turn.textContent = `Red`;
        turn.style.color = 'red';
    }
    else{
        turn.textContent = `Blue`;
        turn.style.color = 'rgb(24, 166, 255)';
    }
}
function randomMove(){
    let dotOk4 = false;
    if(count<6){
        if(count %2 == 0 ){
            for(let j=1;j<=6;j++){
                for(let nodes2 of dots){
                    if(nodes2.classList.contains(`${j}`) && !nodes2.classList.contains("red") && !nodes2.classList.contains("blue")){
                        nodes2.classList.add("red");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
            }
        }
        else{
            for(let j=1;j<=6;j++){
                for(let nodes1 of dots){
                    if(nodes1.classList.contains(`${j}`) && !nodes1.classList.contains("blue") && !nodes1.classList.contains("red")){
                        nodes1.classList.add("blue");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
                    
            }
        }
    }
    else if ( count>=6 && count<8){
        if(count %2 == 0){
            for(let j=7;j<=8;j++){
                for(let nodes2 of dots){
                    if(nodes2.classList.contains(`${j}`) && !nodes2.classList.contains("red") && !nodes2.classList.contains("blue")){
                        nodes2.classList.add("red");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
            }
        }
        else{
            for(let j=7;j<=8;j++){
                for(let nodes1 of dots){
                    if(nodes1.classList.contains(`${j}`) && !nodes1.classList.contains("blue") && !nodes1.classList.contains("red")){
                        nodes1.classList.add("blue");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
                    
            }

        }
    }
    else{
        count++;
        changeTurn();
    }
  
}
dots.forEach((dot)=>{
    dot.addEventListener("click",titanMovement)
})
function titanMovement(dot){
    let dotOk1 = false;
    let dotOk2 = false;
    if (count<6){
        for(let i=1 ;i<=6;i++){
            if(dot.target.classList.contains(`${i}`)){
                dotOk1 = true;
                break;    
            }}
        if(dotOk1 && !dot.target.classList.contains("red") && !dot.target.classList.contains("blue")){
            count++;
            changeTurn();
            if(count % 2 !=0){
                resetTimerRed();
                dot.target.classList.add('red');
            }
            else if (count%2 ==0){
                resetTimerBlue();
                dot.target.classList.add('blue');
            }
        }
    }
        
    if(count>=6 && count<8){
        for(let i=7 ;i<=12;i++){
            if(dot.target.classList.contains(`${i}`)){
                dotOk2 = true;
                break;    
            }}
        if(dotOk2 && !dot.target.classList.contains("red") && !dot.target.classList.contains("blue")){
            count++;
            changeTurn();
            if(count % 2 !=0){
                resetTimerRed();
                dot.target.classList.add('red');
            }
            else{
                resetTimerBlue();
                dot.target.classList.add('blue');
            }
        }
            
    }
    if(count>=8){
        let dotnum = Number(dot.target.classList[2]);
        for(let nums of connectingEdges[dotnum-1]){
            let stringNums = String(nums);
            let dotOk3 = false;
            for(let node of dots){
                if(count % 2 ==0 && node.classList.contains(`${stringNums}`) && node.classList.contains("red") && !dot.target.classList.contains("blue")){
                    count++;
                    changeTurn();
                    resetTimerRed();          
                    node.classList.remove("red");
                    dot.target.classList.add("red");
                    dotOk3 = true;
                    break;
                }
                else if(count % 2 !=0 && node.classList.contains(String(nums)) && node.classList.contains("blue") && !dot.target.classList.contains("red")){
                    count++;
                    changeTurn();
                    resetTimerBlue();
                    node.classList.remove("blue");
                    dot.target.classList.add('blue');
                    dotOk3 = true;
                    break;
                }
            }
            if(dotOk3){
                break;
            }
        }
        checkForGameOver();
    }
    updatePoints();
}
function gameOver(){
    document.body.innerHTML = '';
    let gameEndMsg = document.createElement("div");
    gameEndMsg.textContent = "Game Over!";
    gameEndMsg.style.fontSize = "50px";
    gameEndMsg.style.fontWeight = "900";
    gameEndMsg.style.marginTop = "80px";
    gameEndMsg.style.color = "aliceblue";
    gameEndMsg.style.textAlign = "center";
    document.body.append(gameEndMsg);

    let points = document.createElement("div");
    points.textContent = "Points";
    points.style.fontSize = "30px";
    points.style.fontWeight = "600";
    points.style.marginTop = "50px";
    points.style.color = "aliceblue";
    points.style.textAlign = "center";
    document.body.append(points);

    let redpoints = document.createElement("div");
    redpoints.textContent = `Red : ${redpts}`;
    redpoints.style.fontSize = "30px";
    redpoints.style.color = "red";
    redpoints.style.fontWeight = "600";
    redpoints.style.marginTop = "30px";
    redpoints.style.textAlign = "center";
    document.body.append(redpoints);

    let bluepoints = document.createElement("div");
    bluepoints.textContent = `Blue : ${bluepts}`;
    bluepoints.style.fontSize = "30px";
    bluepoints.style.color = "rgb(24, 166, 255)";
    bluepoints.style.fontWeight = "600";
    bluepoints.style.marginTop = "30px";
    bluepoints.style.textAlign = "center";
    document.body.append(bluepoints);
    
    let winner = document.createElement("div");
    winner.style.fontSize = "30px";
    winner.style.fontWeight = "600";
    winner.style.marginTop = "50px";
    winner.style.color = "aliceblue";
    winner.style.textAlign = "center";
    if(redpts>bluepts){
        winner.textContent = `Red Wins!!`;
        winner.style.color = "red";
    }
    else{
        winner.textContent = `Blue Wins!!`;
        winner.style.color = "rgb(24, 166, 255)";
    }
    document.body.append(winner);


}
function checkForGameOver(){
    let dotOk5 = false;
    for(let k=13;k<=18;k++){
        for(let node of dots){
            if(node.classList.contains(`${k}`)){
                if(!node.classList.contains("red") && !node.classList.contains("blue")){
                    dotOk5 = false;
                    break;
                }
                else{
                    dotOk5 = true;
                }
            }
        }
        if (!dotOk5){
            break;
        }
    }
    if(dotOk5){
        gameOver();
    }
}
function updatePoints(){
    let edgeCount=0;
    let redDotOk5 = false;
    let blueDotOk5 = false;
    let redtempCall = false;
    let bluetempCall = false;
    if(count %2 != 0){
        redpts =0;
        for(let edge of edges){
            redDotOk5 = true;
            for(let node of edge){
                for(let dot of dots){
                    if(dot.classList.contains(`${node}`)){
                        if( dot.classList.contains("red")){
                            redDotOk5 = redDotOk5 && true;
                            break;
                        }
                        else{
                            redDotOk5 = redDotOk5 && false;
                            break;
                        }
                        
                    }
                    
                }
            }
            if(redDotOk5){
                redpts = redpts + points[edgeCount];
                rp.textContent = `${redpts}`;
                redtempCall = true;
            }
            else{
                redtempCall = redtempCall || false;
            }
            edgeCount++;
        }
        if(!redtempCall){
            console.log("hello");
            rp.textContent = "0";
        }
    }


    else{
        bluepts = 0;
        for(let edge of edges){
            blueDotOk5 = true;
            for(let node of edge){
                for(let dot of dots){
                    if(dot.classList.contains(`${node}`)){
                        if( dot.classList.contains("blue")){
                            blueDotOk5 = blueDotOk5 && true;
                            break;
                        }
                        else{
                            blueDotOk5 = blueDotOk5 && false;
                            break;
                        }
                        
                    }
                    
                }
            }
            if(blueDotOk5){
                bluepts = bluepts + points[edgeCount];
                bp.textContent = `${bluepts}`;
                bluetempCall = true;
            }
            edgeCount++;
        }
        if(!bluetempCall){
            console.log("hello");
            bp.textContent = "0";
        }
    }
   

}
function resets(){
    count = 0;
    changeTurn();
    dots.forEach((dot)=>{
        if(dot.classList.contains("red")){
            dot.classList.remove("red");
        }
        else if(dot.classList.contains("blue")){
            dot.classList.remove("blue");
        }
    })
    clearInterval(totalTimeCounter);
    clearInterval(playtime);
    totalTime = 600;
    totalTimeCounter = setInterval(()=>{
        if(totalTime==0){
            clearInterval(totalTimeCounter);
            gameOver();
        }
        gameTime.innerHTML=`${totalTime}`;
        totalTime-=1;
    },1000);
    resetTimerBlue();
    resetTimerRed();

}
function paused(){
    if(pause.textContent =='⏸️'){
        pause.textContent = `▶️`;
        reset.removeEventListener("click",resets);
        pause.title="Play";
        pausename.textContent = "Play";
        clearInterval(playtime);
        clearInterval(totalTimeCounter);
        dots.forEach((dot)=>{
            dot.removeEventListener("click",titanMovement);
        })
    }
    else if(pause.textContent ==`▶️`){
        pause.textContent = `⏸️`;
        pause.title = "Pause";
        pausename.textContent = "Pause";
        reset.addEventListener("click",resets);
        totalTimeCounter = setInterval(()=>{
            if(totalTime==0){
                clearInterval(totalTimeCounter);
                gameOver();
            }
            gameTime.innerHTML=`${totalTime}`;
            totalTime-=1;
        },1000);
        playerTimeCounter();
        
        dots.forEach((dot)=>{
            dot.addEventListener("click",titanMovement)
        })
    }
}
reset.addEventListener("click", resets);
pause.addEventListener("click",paused);

