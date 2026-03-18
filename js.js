const firebaseConfig = {
  apiKey: "AIzaSyC3NW4M8VCPKv-fohUcgepRDUyeynuR7TA",
  authDomain: "donttap-9acc7.firebaseapp.com",
  databaseURL: "https://donttap-9acc7-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "donttap-9acc7",
  storageBucket: "donttap-9acc7.firebasestorage.app",
  messagingSenderId: "612177563959",
  appId: "1:612177563959:web:b80c2c50638afdbbcacab2",
  measurementId: "G-NW1F402M3B"
};


var myPersonalBest = localStorage.getItem("donttap_best") || 0;

setTimeout(function() {
    var bestDiv = document.getElementById("best");
    if (bestDiv) {
        bestDiv.innerHTML = "HI-SCORE<br>" + myPersonalBest;
    }
}, 1000);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();


function fetchMyBestFromServer(name) {
    let searchName = name || localStorage.getItem("playerName");
    
    if (searchName && searchName !== "null" && searchName !== "") {
        console.log("Firebase'den skorun aranıyor: " + searchName);
        
        database.ref('leaderboard/' + searchName).once('value').then((snapshot) => {
            const data = snapshot.val();
            
            if (data && data.score !== undefined) {
                const bestDiv = document.getElementById("best");
                if (bestDiv) {
                    bestDiv.innerHTML = "HI-SCORE<br>" + data.score;
                    console.log("Skorun başarıyla çekildi: " + data.score);
                }
                

                if (typeof FreRec !== 'undefined') {
                    FreRec = [{record: data.score, date: data.date || ""}];
                }

                localStorage.setItem("my_best_score", data.score);
            } else {
                console.log("Bu isimle bir kayıt bulunamadı: " + searchName);
            }
        }).catch((err) => {
            console.error("Firebase Hatası:", err);
        });
    } else {
        console.log("Arama yapılacak isim bulunamadı (pName boş).");
    }
}

function FreList() {
    const list = document.getElementById("records");
    if (!list) return;

    database.ref('leaderboard').orderByChild('score').limitToLast(10).on('value', (snapshot) => {
        let html = "<b style='color:#f460ff'>TOP 10 REKOR</b><br>";
        let dataList = [];
        snapshot.forEach(child => {
            dataList.push({ name: child.key, score: child.val().score });
        });
        dataList.reverse().forEach((user, i) => {
            html += `<div style="margin-bottom:2px">${i+1}. ${user.name}: ${user.score}</div>`;
        });
        list.innerHTML = html;
    });
}

setTimeout(FreList, 1000);

function saveScoreToFirebase(playerName, finalScore) {
    if (!playerName || playerName === "null" || finalScore === undefined) return;

    const userScoreRef = database.ref('leaderboard/' + playerName);
    
    userScoreRef.once('value', (snapshot) => {
        const existingData = snapshot.val();
        if (!existingData || finalScore > existingData.score) {
            userScoreRef.set({
                score: finalScore,
                date: new Date().toLocaleDateString()
            });
        }
    });
}

function FreR() {
    today = new Date();
    
    if (sc > myPersonalBest) {
        myPersonalBest = sc;
        localStorage.setItem("donttap_best", sc);
        var bestDiv = document.getElementById("best");
        if (bestDiv) {
            bestDiv.innerHTML = "HI-SCORE<br>" + sc;
        }
    }

    let pName = localStorage.getItem("playerName") || prompt("Adın:");
    if (pName) {
        localStorage.setItem("playerName", pName);
        database.ref('leaderboard/' + pName).once('value', (snap) => {
            const oldData = snap.val();
            if (!oldData || sc > oldData.score) {
                database.ref('leaderboard/' + pName).set({
                    score: sc,
                    date: today.toLocaleDateString()
                });
            }
        });
    }
}




setTimeout(function(){

     var exdays = 1000;
     function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/donttap";
}

     function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}


const AudioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, type, duration) {
    const osc = AudioCtx.createOscillator();
    const gain = AudioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(AudioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, AudioCtx.currentTime + duration);
    osc.stop(AudioCtx.currentTime + duration);
}

const soundHit = () => playSound(600, 'sine', 0.1);    
const soundError = () => playSound(150, 'sawtooth', 0.3);
const soundRecord = () => playSound(800, 'square', 0.5);  

var PatRec=[];
var FreRec=[];
console.log(read_cookie("records"),read_cookie("recordsP"))
if (read_cookie("records") != null && read_cookie("records") != ""){FreRec=read_cookie("records");}
if (read_cookie("recordsP") != null && read_cookie("recordsP") != ""){PatRec=read_cookie("recordsP");}
var key;
var timerGO = null;
var Bonus = 0;
var TimeL = 0;
var sc=0,B5;
var Time = document.createElement("div");
var PressKey = document.createElement("div");
var Score = document.createElement("div");
var Errr=0;
var timerWent=true;
var cx,cy,CoX,CoY;
var horT,verT,doit=0,n=0;
var OtherTiles = [];
var good = 1;
var cXX,cYY;
var horiAr = [];
var vertAr = [];
var canvasB = document.createElement('canvas');
var canvas = document.createElement('canvas');
var context;
var ZoomI,wOLD,cXXo,cYYo;
var slider = document.createElement('input');
var div = document.createElement('div');
var zom = document.createElement('div');
var sqsizeD = Math.round(window.innerHeight*0.108);
var sqsize;
var zoomC = getCookie("Zoom");
var ZoomN = parseInt(zoomC, 10);
var button = document.createElement("BUTTON");
var Patt;
var PaC=getCookie("Patt");

//PatRec[0]=[1, "today"];
//console.log(PatRec[0][1]);




if (zoomC != "") {SetCzoom();zom.innerHTML="-"+ZoomN+"+";} else {
    sqsize = sqsizeD;
    var w = Math.round(sqsize*4);
    var x0 = Math.round(window.innerWidth/2-w/2);
     //var y0 = Math.round(sqsize*1.5);
       var x1 = w;
       var y1 = w;
    zom.innerHTML="-Zoom+";
}

function SetCzoom()
     {
    sqsize = Math.round(sqsizeD*ZoomN/100);
    w = Math.round(sqsize*4);
    x0 = Math.round(window.innerWidth/2-w/2);
   // y0 = sqsizeD*3-sqsize*(ZoomN-50)/160;
    x1 = w;
    y1 = w;

     }


    div.id = "basis";
    div.style.display = "block";
    div.style.position='absolute';
    div.style.cursor = "hand";
    div.style.width=w;
    div.style.height=Math.round(w*1.5);
    div.style.left=x0+"px";
    div.style.top=0+"px";
    div.style.backgroundColor='black';
    div.style.pointerEvents='none';
    document.body.appendChild(div);


zom.id = "zom";

    zom.style.display = "block";
    //zom.style.position='absolute';
    zom.style.cursor = "hand";
    zom.style.color="white";
    zom.style.width="200px";
    zom.style.pointerEvents='none';
    zom.style.textAlign ="center";
    document.body.appendChild(zom);


    slider.id = "slider";
    slider.type = 'range';
    slider.min = 10;
    slider.max = 200;
    slider.value = ZoomN || 100;
    slider.step = 2;
    document.body.appendChild(slider);
slider.addEventListener("input", Zoom);

button.innerHTML = "PATTERNS";
document.body.appendChild(button);
button.id = "switch";
button.style.display = "block";
button.style.position='absolute';

var patr = document.createElement("a");
//patr.innerHTML = "Patreon";
document.body.appendChild(patr);
//patr.id = "patr";
//patr.style.display = "block";
//patr.style.position='absolute';
//patr.style.top=420+"px";
//patr.style.color="darkblue";
//patr.style.left=20+"px";
//var linkText = document.createTextNode("Patreon support");
//var win = window.open('http://stackoverflow.com/', '_blank');
//linkText.id="patrLink";
//patr.appendChild(linkText);
//patr.title = "Patreon support";
//patr.href = "https://www.patreon.com/ultrachess";
patr.innerHTML = '<a id="patr" title="Patreon support" target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/ultrachess" style="display: block; position: absolute; top: 95%; left: 20px;">Patreon support</a>'

var recordsB = document.createElement("BUTTON");
recordsB.innerHTML = "RECORDS";
document.body.appendChild(recordsB);
recordsB.id = "records";
recordsB.style.display = "block";
recordsB.style.position='absolute';

var Rec=document.createElement("div");
var RecSh=1;
if (getCookie("rec")!="") {RecSh=getCookie("rec");}
if (RecSh==1) {Rec.style.display = "block";}else{Rec.style.display = "none";}
recordsB.addEventListener ("click", function() {
if (RecSh==1) {Rec.style.display = "none"; RecSh=0; setCookie("rec","0");}
else {Rec.style.display = "block"; RecSh=1;setCookie("rec","1");}
});

Rec.id = "listR";


Rec.style.position='absolute';
//Rec.style.padding=sqsize/8+'px';
//Score.style.left=Math.round(w/2.23)+"px";
Rec.style.top=35+"px";
Rec.style.left=0+"px";
Rec.style.zIndex=11;
Rec.style.width='200px';
Rec.style.pointerEvents='none';
Rec.style.color='white';
Rec.style.textAlign ="center";
//Rec.style.fontSize=Math.round(sqsize/1.8)+'px';
Rec.style.fontSize='20px';
//document.body.appendChild(Rec);
recordsB.appendChild(Rec);


   function PatList(){
Rec.innerHTML="PATTERNS:<br>";
for (var i=0;i<PatRec.length;i++){
Rec.innerHTML+=PatRec[i].record;
Rec.innerHTML+=" — ";
Rec.innerHTML+=PatRec[i].date;
Rec.innerHTML+="<br>";}}


button.addEventListener ("click", function() {
 horiAr = [];
 vertAr = [];
 hopX = [];
 hopY = [];
 
if (Patt == 0)
{
button.innerText = "Frenzy";
Patt = 1;
setCookie("Patt", "1");
canvas.removeEventListener("mousedown", ClickTile);
canvas.addEventListener("mousedown", ClickPattern);
RefrePP(1);
   // if (RecSh=="1"){
    PatList();

} else
{
button.innerText = "Patterns";
Patt = 0;
setCookie("Patt", "0");
canvas.removeEventListener("mousedown", ClickPattern);
canvas.addEventListener("mousedown", ClickTile);
Refresh(1);
PressKey.innerHTML="Press a key to start";
// if (RecSh=="1"){
FreList();
};
button.blur();
});

var PatAm=15;
var hopX=[],hopY=[];
var Pround=0;
var CPX,CPY;
var noErr=0;
function ClickPattern(event) {
cx = event.clientX;
cy = event.clientY;
if (PatAm>0 && Errr==0 && timerWenP==true) {calculatePat();}
};
function calculatePat(){
CPX = Math.floor((cx-x0)/sqsize);
CPY = Math.floor((cy-w/4)/sqsize);
noErr=1;
for (var i = 0; i < Pround; i++) {
if (CPX==hopX[i] && CPY==hopY[i])
    {
    Pround--;
    hopX.splice(i, 1);
    hopY.splice(i, 1);
    DrawBlackPat();
    noErr=0;
    break;
    }
}
if (noErr==1) {
Errr=1;
cXX = cx-x0;
cYY = cy-w/4;
CoX=CPX;
CoY=CPY;
DrawError();
wOLD = w;
cXXo =cXX;
cYYo =cYY;
}

if (Pround==0) {PatAm--;
                if (PatAm==0) {clearInterval(timerGP);PressKey.innerHTML="Press a key to start";
                              exactPat = performance.now()-exactPat;
                              Time.innerHTML=Math.round(exactPat)/1000;
                              FreP();
                              }else{
                Pround=4;drawPAT();PressKey.innerHTML=PatAm; }
               }
/*
 drawPAT();
 PatAm=15;
 PressKey.innerHTML=PatAm;
 Pround=4;*/
};

var FreTeP;
function FreP(){
today = new Date();
FreTeP = SubscriberP();
PatRec.push(FreTeP);
PatRec.sort((a, b) => (a.record > b.record) ? 1 : -1);
if (PatRec.length>10){PatRec.length=10;}
bake_cookie("recordsP", PatRec);
PatList();
}

function SubscriberP() {
  return {
    'record':   Math.round(exactPat)/1000,
    'date':    today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  };
};


function RefrePP(p) {
 good = 1;
 Errr=0;
 Score.innerHTML="&nbsp;";
 if (PatRec.length>0){
    Best.innerHTML="HI-SCORE<br>"+PatRec[0].record;}else{Best.innerHTML="HI-SCORE<br>-";}
 Time.innerHTML="0";
 clearInterval(timerGO);
 timerWent = true;
 var TimeL = 0;
 contextB.clearRect(0, 0, canvasB.width, canvasB.height);
 PressKey.innerHTML="Press a key to start";
    if (p==0){
 clearInterval(timerGP);
 timerWenP = false;
 TimeP = 0;
 TimerPAT();
 drawPAT();
 PatAm=15;
 PressKey.innerHTML=PatAm;
 Pround=4;
    }

};
var TimeP,timerWenP;
var timerGP=null;
var exactPat;
function TimerPAT() {
exactPat = performance.now();
timerWenP = true;
timerGP = setInterval(function() {
//if (PatAm<=0) {clearInterval(timerGP);}
TimeP = Math.round((TimeP+0.1)*10)/10;
  //  console.log(TimeP);
Time.innerHTML=TimeP;
if (Errr == 1)
{clearInterval(timerGP);
PressKey.innerHTML="Press a key to start";Time.innerHTML+='('+PatAm+' left)';}
}, 100);
};
function drawPAT() {
 hopX[0] = Math.floor(Math.random() * (4 - 1 + 1));
 hopY[0] = Math.floor(Math.random() * (4 - 1 + 1));
 hopX[1] = hopX[0];
 hopY[1] = hopY[0];
 while (hopX[1] == hopX[0] && hopY[1] == hopY[0]) {
 hopX[1] = Math.floor(Math.random() * (4 - 1 + 1));
 hopY[1] = Math.floor(Math.random() * (4 - 1 + 1));
}
 hopX[2] = hopX[0];
 hopY[2] = hopY[0];
 while ((hopX[2] == hopX[0] && hopY[2] == hopY[0]) || (hopX[2] == hopX[1] && hopY[2] == hopY[1])) {
 hopX[2] = Math.floor(Math.random() * (4 - 1 + 1));
 hopY[2] = Math.floor(Math.random() * (4 - 1 + 1));
}
 hopX[3] = Math.floor(Math.random() * (4 - 1 + 1));
 hopY[3] = Math.floor(Math.random() * (4 - 1 + 1));
 while ((hopX[3] == hopX[0] && hopY[3] == hopY[0]) || (hopX[3] == hopX[1] && hopY[3] == hopY[1])
       || (hopX[3] == hopX[2] && hopY[3] == hopY[2])) {
 hopX[3] = Math.floor(Math.random() * (4 - 1 + 1));
 hopY[3] = Math.floor(Math.random() * (4 - 1 + 1));
}
 DrawBlackPat();
};
function DrawBlackPat() {
contextB.clearRect(0, 0, canvasB.width, canvasB.height);
contextB.beginPath();
for (var i = 0; i < hopX.length; i++) {
contextB.rect(hopX[i]*sqsize,hopY[i]*sqsize,sqsize,sqsize);
}
contextB.fillStyle = 'white';
contextB.closePath();
contextB.fill();
};



document.documentElement.style.overflow = 'hidden';
function Zoom() {
   var sqsizeD = Math.round(window.innerHeight*0.108);
   ZoomI = slider.value;
   sqsize = Math.round(sqsizeD*ZoomI/100);
   w = Math.round(sqsize*4);
   x0 = Math.round(window.innerWidth/2-w/2);
   //y0 = Math.round(sqsizeD*3-sqsize*(ZoomI-50)/160);
   x1 = w;
   y1 = w;
context.clearRect(0, 0, canvas.width, canvas.height);
CanvasLines();
CanvasBlack();
div.style.width=w;
div.style.height=Math.round(w*1.5);
div.style.left=x0+"px";
div.style.top=0+"px";
  Score.style.top=sqsize/4+"px";
  Score.style.fontSize=Math.round(sqsize/1.4)+'px';
Time.style.padding=sqsize/8+'px';
Time.style.top=0+"px";
Time.style.fontSize=Math.round(sqsize/1.8)+'px';
    if (Errr==1)
    {
cXX = cXXo/wOLD*w;
cYY = cYYo/wOLD*w;
DrawError();
    }
PressKey.style.top=w*1.07+"px";
PressKey.style.fontSize=Math.round(sqsize/3)+'px';
setCookie("Zoom", slider.value);
        console.log(getCookie("Zoom"));
console.log(x0);
   if (x0<200){
       slider.style.transform ="rotate(90deg)";
       slider.style.marginTop=100+"px";
       slider.style.marginLeft=-80+"px";
       button.style.transform ="rotate(90deg)";
       button.style.marginTop=200+"px";
       button.style.marginLeft=-80+"px";
       zom.style.marginLeft=-75+"px";
       button.style.paddingRight=20+"px";
    }
zom.innerHTML="-"+slider.value+"+";
Best.style.left= "75%";
Best.style.top=sqsize/3.6+"px";
Best.style.fontSize=Math.round(sqsize/5)+'px';

};

window.addEventListener('resize', Zoom);


canvas.style.position='absolute';
canvas.style.zIndex=10;
document.body.appendChild(canvas);
context = canvas.getContext('2d');
//canvas.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
function CanvasLines() {
canvas.width = w;
canvas.height = w;
canvas.style.left=x0+"px";
canvas.style.top=w/4+"px";
context.lineWidth = 1;
context.strokeStyle = '#F0B3FF';
context.beginPath();
context.moveTo(0, 0);
context.lineTo(w, 0);
context.stroke();
context.moveTo(0, w/4-0.5);
context.lineTo(w, w/4-0.5);
context.stroke();
context.moveTo(0, w/2-0.5);
context.lineTo(w, w/2-0.5);
context.stroke();
context.moveTo(0, w/4*3-0.5);
context.lineTo(w, w/4*3-0.5);
context.stroke();
context.moveTo(0, w-0.5);
context.lineTo(w, w-0.5);
context.stroke();
context.moveTo(0+0.5, 0);
context.lineTo(0+0.5, w);
context.stroke();
context.moveTo(w/4-0.5,0);
context.lineTo(w/4-0.5,w);
context.stroke();
context.moveTo(w/2+0.5,0);
context.lineTo(w/2+0.5,w);
context.stroke();
context.moveTo(w/4*3-0.5,0);
context.lineTo(w/4*3-0.5,w);
context.stroke();
context.moveTo(w-0.5, 0);
context.lineTo(w-0.5,w);
context.stroke();
context.closePath();
}

CanvasLines();


//canvas.style.width=w+(0);
//canvas.style.height=w+(0);
canvasB.style.position='absolute';
canvasB.style.zIndex=9;
canvasB.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
document.body.appendChild(canvasB); //Append canvas to body element
var contextB = canvasB.getContext('2d');
canvasB.width = w;
canvasB.height = w;
canvasB.style.left=x0+"px";
canvasB.style.top=w/4+"px";

function CanvasBlack() {
canvasB.width = w;
canvasB.height = w;
canvasB.style.left=x0+"px";
canvasB.style.top=w/4+"px";
contextB.clearRect(0, 0, canvasB.width, canvasB.height);
if (Patt==0){DrawBlack();}else{DrawBlackPat();}
}

var p=0;
function Refresh(p) {
 Bonus = 0;
 contextB.clearRect(0, 0, canvasB.width, canvasB.height);
 sc=0;
 good = 1;
 Errr=0;
 Score.innerHTML="0";
 Time.innerHTML="30";
if (localStorage.getItem("my_best_score")) {
    Best.innerHTML = "HI-SCORE<br>" + localStorage.getItem("my_best_score");
} else if (FreRec.length > 0) {
    Best.innerHTML = "HI-SCORE<br>" + FreRec[0].record;
} else {
    Best.innerHTML = "HI-SCORE<br>-";
}
 clearInterval(timerGP);
   if (p==0){
 clearInterval(timerGO);
 timerWent = false;
 TimeL = 30;
 Timer();
horiAr[0] = Math.floor(Math.random() * 4);
vertAr[0] = Math.floor(Math.random() * 4);

horiAr[1] = horiAr[0];
vertAr[1] = vertAr[0];
while (horiAr[1] == horiAr[0] && vertAr[1] == vertAr[0]) {
    horiAr[1] = Math.floor(Math.random() * 4);
    vertAr[1] = Math.floor(Math.random() * 4);
}

horiAr[2] = horiAr[0];
vertAr[2] = vertAr[0];
while ((horiAr[2] == horiAr[0] && vertAr[2] == vertAr[0]) || (horiAr[2] == horiAr[1] && vertAr[2] == vertAr[1])) {
    horiAr[2] = Math.floor(Math.random() * 4);
    vertAr[2] = Math.floor(Math.random() * 4);
}

horiAr[3] = horiAr[0];
vertAr[3] = vertAr[0];
while ((horiAr[3] == horiAr[0] && vertAr[3] == vertAr[0]) || 
       (horiAr[3] == horiAr[1] && vertAr[3] == vertAr[1]) || 
       (horiAr[3] == horiAr[2] && vertAr[3] == vertAr[2])) {
    horiAr[3] = Math.floor(Math.random() * 4);
    vertAr[3] = Math.floor(Math.random() * 4);
}

horiAr[4] = horiAr[0];
vertAr[4] = vertAr[0];
while ((horiAr[4] == horiAr[0] && vertAr[4] == vertAr[0]) || 
       (horiAr[4] == horiAr[1] && vertAr[4] == vertAr[1]) || 
       (horiAr[4] == horiAr[2] && vertAr[4] == vertAr[2]) || 
       (horiAr[4] == horiAr[3] && vertAr[4] == vertAr[3])) {
    horiAr[4] = Math.floor(Math.random() * 4);
    vertAr[4] = Math.floor(Math.random() * 4);
}
DrawBlack();
PressKey.innerHTML="1";
    }
};
function DrawBlack(){
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  contextB.beginPath();
  contextB.rect(horiAr[0]*sqsize, vertAr[0]*sqsize, sqsize, sqsize);
  contextB.rect(horiAr[1]*sqsize, vertAr[1]*sqsize, sqsize, sqsize);
  contextB.rect(horiAr[2]*sqsize, vertAr[2]*sqsize, sqsize, sqsize);
  contextB.rect(horiAr[3]*sqsize, vertAr[3]*sqsize, sqsize, sqsize); // Yeni
  contextB.rect(horiAr[4]*sqsize, vertAr[4]*sqsize, sqsize, sqsize); // Yeni
  contextB.fillStyle = 'white';
  contextB.closePath();
  contextB.fill();
}

function DrawSquares() {
    CoX = Math.floor((cx - x0) / sqsize);
    CoY = Math.floor((cy - w / 4) / sqsize);
    var hitIndex = -1;
    

    for (var i = 0; i < horiAr.length; i++) {
        if (horiAr[i] == CoX && vertAr[i] == CoY) {
            hitIndex = i;
            break;
        }
    }

    if (hitIndex != -1) {
        soundHit();
        contextB.fillStyle = '#f460ff';
        contextB.fillRect(oldX * sqsize, oldY * sqsize, sqsize, sqsize);
        setTimeout(() => {
            DrawBlack();
        }, 50);
        var oldX = horiAr[hitIndex];
        var oldY = vertAr[hitIndex];
        var isUnique = false;

        while (!isUnique) {
            horiAr[hitIndex] = Math.floor(Math.random() * 4);
            vertAr[hitIndex] = Math.floor(Math.random() * 4);
            isUnique = true;

            if (horiAr[hitIndex] == oldX && vertAr[hitIndex] == oldY) {
                isUnique = false;
            }

            for (var j = 0; j < horiAr.length; j++) {
                if (hitIndex != j && horiAr[hitIndex] == horiAr[j] && vertAr[hitIndex] == vertAr[j]) {
                    isUnique = false;
                }
            }
        }

        contextB.clearRect(0, 0, canvasB.width, canvasB.height);
        contextB.beginPath();
        for (var k = 0; k < horiAr.length; k++) {
            contextB.rect(horiAr[k] * sqsize, vertAr[k] * sqsize, sqsize, sqsize);
        }
        contextB.fillStyle = 'white';
        contextB.fill();

        if (Bonus < 92) {
            Bonus = Bonus + 8;
        } else {
            Bonus = 100;
        }
        CalculateScore();
        
        good = 1;
    } else {
        Errr = 1;
        cXX = cx - x0;
        cYY = cy - w / 4;
        DrawError();
    }
    good = 0;
}
var today;
var FreTem,temp;
function FreR(){
today = new Date();
//var res1=[sc,today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()];
//console.log(FreRec.length);
//FreTem[0]=sc;
//FreTem[1]=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
FreTem = Subscriber();
FreRec.push(FreTem);
FreRec.sort((a, b) => (a.record < b.record) ? 1 : -1);
if (FreRec.length>10){FreRec.length=10;}
bake_cookie("records", FreRec);
FreList();
}


function Subscriber() {
  return {
    'record':   sc,
    'date':    today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  };
};

function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function read_cookie(name) {
 var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result = JSON.parse(result[1]));
 return result;
}


function DrawError() {
    div.style.transition = "none";
    div.style.transform = "translateX(10px)";
    setTimeout(() => { div.style.transform = "translateX(-10px)"; }, 50);
    setTimeout(() => { div.style.transform = "translateX(0)"; }, 100);
    soundError();
    document.body.style.backgroundColor = "#400"; 
    setTimeout(() => { document.body.style.backgroundColor = "black"; }, 100);
    contextB.beginPath();
    console.log(CoX, CoY);
    contextB.rect(CoX * sqsize, CoY * sqsize, sqsize, sqsize);
    contextB.fillStyle = '#AF1800';
    contextB.closePath();
    contextB.fill();
    contextB.lineWidth = 1;
    contextB.strokeStyle = '#0011DA';
    contextB.beginPath();
    contextB.moveTo(cXX - 5, cYY);
    contextB.lineTo(cXX + 5, cYY);
    contextB.moveTo(cXX, cYY - 5);
    contextB.lineTo(cXX, cYY + 5);
    contextB.stroke();
    contextB.closePath();

    clearInterval(timerGO);

    let pName = localStorage.getItem("playerName");

    if (!pName || pName === "null") {
        pName = prompt("İsim:", "Oyuncu");
        if (pName && pName !== "null") {
            localStorage.setItem("playerName", pName);
        }
    }

    if (pName && pName !== "null" && sc > 0) {
        const userRef = database.ref('leaderboard/' + pName);
        
        userRef.once('value', (snapshot) => {
            const data = snapshot.val();
            if (!data || sc > data.score) {
                userRef.set({
                    score: sc,
                    date: new Date().toLocaleDateString()
                });
                console.log("++++");
            }
        });
    }

    if (typeof PressKey !== 'undefined') {
        PressKey.innerHTML = "Press a key to start";
    }
}

canvas.addEventListener("mousedown", ClickTile);

function ClickTile(e) {
    if (e) {
        cx = e.clientX;
        cy = e.clientY;
    }

    if (TimeL > 0 && Errr == 0) {
        DrawSquares();
    }

    if (!timerWent) {
        Timer();
    }
    
};


//Score.innerHTML="&nbsp;"+"0";
Score.id = "score";
Score.innerHTML="0";
Score.style.position='center';
//Score.style.left=Math.round(w/2.23)+"px";
Score.style.top=sqsize/4+"px";
Score.style.zIndex=11;
Score.style.pointerEvents='none';
Score.style.color='purple';
Score.style.textAlign ="center";
Score.style.fontSize=Math.round(sqsize/1.4)+'px';
div.appendChild(Score);

var Best = document.createElement("div");
Best.id = "best";
let currentBest = localStorage.getItem("my_best_score") || localStorage.getItem("donttap_best") || "-";
Best.innerHTML = "HI-SCORE<br>" + currentBest;
Best.style.position='absolute';
Best.style.left= "75%";
//Score.style.left=Math.round(w/2.23)+"px";
Best.style.top=sqsize/3.6+"px";
Best.style.zIndex=11;
Best.style.marginTop="0px";
Best.style.pointerEvents='none';
Best.style.color='darkblue';
Best.style.textAlign ="center";
Best.style.fontSize=Math.round(sqsize/5)+'px';
div.appendChild(Best);


//Score.innerHTML="&nbsp;"+"0";
PressKey.id = "PressKey";
PressKey.innerHTML="Press a key to start";
PressKey.style.position='relative';
//Score.style.left=Math.round(w/2.23)+"px";
PressKey.style.top=w*1.07+"px";
PressKey.style.zIndex=11;
PressKey.style.pointerEvents='none';
//PressKey.style.color='blue';
PressKey.style.textAlign ="center";
PressKey.style.fontSize=Math.round(sqsize/3)+'px';
//PressKey.style.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
div.appendChild(PressKey);

//Score.innerHTML="&nbsp;"+"0";
Time.id = "time";
Time.innerHTML="30";
Time.style.position='absolute';
Time.style.padding=sqsize/8+'px';
//Score.style.left=Math.round(w/2.23)+"px";
Time.style.top=0+"px";
Time.style.zIndex=11;
Time.style.pointerEvents='none';
Time.style.color='white';
Time.style.textAlign ="left";
Time.style.fontSize=Math.round(sqsize/1.8)+'px';
div.appendChild(Time);

function CalculateScore() {
B5=Math.ceil(Bonus/20);
sc=sc+B5;
Score.innerHTML=sc;
PressKey.innerHTML=B5;

let myBest = localStorage.getItem("my_best_score") || 0;
    if (sc > myBest && sc > 0) {
        Score.style.color = "#00FF00";
        if (sc == parseInt(myBest) + 1) {
            soundRecord();
            div.animate([
                { transform: 'translate(1px, 1px) rotate(0deg)' },
                { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                { transform: 'translate(-3px, 0px) rotate(1deg)' },
                { transform: 'translate(0px, 0px) rotate(0deg)' }
            ], { duration: 100 });
        }
    }
};

     function Timer() {
timerWent=true;
timerGO = setInterval(function() {
TimeL = (TimeL-0.1).toFixed(1);
if (Bonus>3){
    Bonus=Math.round((Bonus-3)*10)/10;}else{Bonus=0.1;}
    PressKey.innerHTML=Math.ceil(Bonus/20);
    //console.log(Bonus,"3");
    //console.log(Bonus);
Time.innerHTML=TimeL;
if (TimeL <= 0)
{clearInterval(timerGO);Time.innerHTML="0";PressKey.innerHTML="Press a key to start";FreR();}
    //console.log(Errr,"Errr");
if (Errr == 1)
{clearInterval(timerGO);
FreR();
//console.log(FreRec);
PressKey.innerHTML="Press a key to start";}
}, 100);
     }



document.addEventListener("keydown", KeyPress);
function KeyPress(event) {
key = event.key;
if (Patt == 0){
Refresh(0);}else{RefrePP(0);}
};


if (PaC != "") {Patt=Math.abs(Number(PaC)-1);button.click();}else{Patt=0;}

        }, 50);



let pName = localStorage.getItem("playerName");

if (!pName || pName === "null") {
    pName = prompt("Adın:");
    if (pName) {
        localStorage.setItem("playerName", pName);
        fetchMyBestFromServer(pName);
    }
} else {
    fetchMyBestFromServer(pName);
}
window.onload = function() {
    let savedName = localStorage.getItem("playerName");
    if (savedName) {
        console.log("Sorgulanıyor: " + savedName);
        fetchMyBestFromServer(savedName);
    }
    setTimeout(FreList, 1000); 
};
