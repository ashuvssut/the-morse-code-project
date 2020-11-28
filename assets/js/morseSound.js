const play = document.querySelector('#play');
const WPMControl = document.querySelector('#WPM-control');
let code = '';
let index = 2;

const ctx = new (window.AudioContext || window.webkitAudioContext)(); // refer https://youtu.be/WD-T_yKw8iA

//**************************************************//
//**********GENERATING MORSE CODE SOUND*************//
//**************************************************//

//generate audioBuffer out of the audio file fetched from the passed audioURL and then return the audioBuffer
async function getAudioBuffer(audioURL) { //refer :- https://youtu.be/3NgVlAscdcA
    const data = await fetch(audioURL);
    const arrayBuffer = await data.arrayBuffer(); //generate arrayBuffer (bunch of zeros n ones)
    return ctx.decodeAudioData(arrayBuffer); //arrayBuffer converted to audioBuffer. decodeAudioData() is async in nature. so it returns a promise (which if has the audioBuffer when promise is fulfilled fulfilled)
}
let dashAudio, dotAudio;    //variables declared to feed them with audioBuffers
getAudioBuffer('assets/audio/_1.ogg').then(audioBuffer => dashAudio = audioBuffer);    //JS async function getAudioBuffer is nothing but a promise
getAudioBuffer('assets/audio/_0.ogg').then(audioBuffer => dotAudio = audioBuffer);

//create those audioBufferSourceNode from those audioBuffers then connect audioBufferSourceNode to the audioDestinationNode. Then just play it!
let playSound;
function playback(audioBuffer) { //pass the audioBuffer that you want to play
    playSound = ctx.createBufferSource(); //create the fire-and-forget AudioBufferSourceNode
    playSound.buffer = audioBuffer; //assign our passed audioBuffer to AudioBufferSourceNode 
    playSound.playbackRate.value = WPMControl.value;
    playSound.connect(ctx.destination)  //connect to audioDestinationNode
    playSound.start(ctx.currentTime) // for usage of start() refer:- https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start

    playSound.onended = function () {
        if (index < code.length) {
            if(code[index] === '.'){
                playback(dotAudio);
            }
            else if(code[index] === '-'){
                playback(dashAudio);
            }
            index = index + 2;
        }
        else {
            index = 2;
        }
    };
}

// play.addEventListener('click', (event) => {yy
function handlePlayPress(obj){
    code = obj.querySelector('.answer').textContent;
    
    if(index !== 2){// This code block is written to prevent two or more than 2 'full code's from being played simultaneously, i.e, by this code block, no two codes can play simultaneously...previous code has to stop before the next code starts playing
        playSound.stop();//stop the current sound playback
        index = code.length + 1;//stop the current 'full code' sound playback
    }

    // code = document.querySelector('#input').value;

    //start the playing playback() recursively >>>(Recursions)
    //setTimeout is used to prevent immediate playback. 
    //So, playback will be occur after 300ms. So there is a break in between two 'full code' playback
    setTimeout(()=>{
        if(code[0] === '.'){
            playback(dotAudio);
        }
        else if(code[0] === '-'){
            playback(dashAudio);
        }
    },300);
}
//});r