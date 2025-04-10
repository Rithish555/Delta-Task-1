const box = document.getElementById("mainbox")
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
    {id:7,left:370,top:230},
    {id:9,left:440,top:260},
    {id:7,left:440,top:340},
    {id:7,left:370,top:370},
    {id:9,left:300,top:340},
    {id:8,left:300,top:260},
    {id:1,left:130,top:270},
    {id:1,left:470,top:90},
    {id:1,left:470,top:510},
    {id:1,left:280,top:180},
    {id:1,left:520,top:280},
    {id:1,left:280,top:420},
]
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