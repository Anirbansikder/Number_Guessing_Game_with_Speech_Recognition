const msgEl = document.getElementById('msg');
const container = document.getElementById('container');

var count = 0;

const randNum = Math.floor(Math.random() * 100) + 1;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function checkNumber(msg) {
    const num = +msg;
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div>This is not a valid Number </div>';
        return;
    }

    if(num>100 || num<1 ) {
        msgEl.innerHTML += `<div>Number Must be Between 1 and 100`;
        count++;
        return;
    }

    count++;
    if(num === randNum) {
        document.body.innerHTML = `
        <div class="container" id="container">
        <h1> Congratulations You Guessed The Correct Number !</h1>
        <br>
        <br>
        <h3> Yes , It Was ${num} !</h3>
        <br>
        <h3> Great , You took ${count} chance(s) to guess the correct answer !</h3>
        <button class = "play-again" id="play-again">Play Again</button>
        </div>
        `;
    } else if (num > randNum && num <= randNum +10){
        msgEl.innerHTML += '<div>You are close , Go bit Lower </div>';
    } else if(num>randNum){
        msgEl.innerHTML += '<div>Go Lower</div>';
    } else if(num<randNum && num >= randNum - 10){
        msgEl.innerHTML += '<div>You are close , Go bit Higher </div>';
    } else {
        msgEl.innerHTML += '<div>Go Higher</div>';
    }
}

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div class="temp">
    You Said :
    <span class="box">${msg}</span>
    </div>
    `;
}

recognition.addEventListener('result' , onSpeak);

recognition.addEventListener('end' , () => recognition.start());

document.body.addEventListener('click' , e =>{
    if(e.target.id == "play-again"){
        window.location.reload();
    }
});