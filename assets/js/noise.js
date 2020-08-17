//refer https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#The_noise_%E2%80%94_random_noise_buffer_with_biquad_filter
const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // refer https://youtu.be/WD-T_yKw8iA

//**************************************************//
//**********GENERATING TELEGRAPHER NOISE************//
//**************************************************//

const bufferSize = audioCtx.sampleRate * 120; // set the time of the note
const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate); // create an empty buffer
const data = buffer.getChannelData(0); // get data

// fill the buffer with noise
for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; //range is [-1,1]
}

let allowPlayback, noise;
const noiseControl = document.querySelector('#noise-control');
function playNoise() {
    // create a buffer source for our created data
    noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const biFil = audioCtx.createBiquadFilter();
    biFil.type = 'bandpass';
    biFil.frequency.value = 1000;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = noiseControl.value;

    // connect our graph
    noise.connect(biFil).connect(gainNode).connect(audioCtx.destination);
    noise.start();
    noise.onended = function () {
        if(allowPlayback === true){
            playNoise();
        }
    };
}

const noiseSwitch = document.querySelector('#noise-switch');
function switchNoise(obj1) {
    if(noiseSwitch.dataset.state === 'off'){
        noiseSwitch.dataset.state = 'on';
        allowPlayback = true;
        playNoise();
    }
    else if(noiseSwitch.dataset.state === 'on'){
        noiseSwitch.dataset.state = 'off';
        allowPlayback = false;//prevent next playback
        noise.stop();//stop the current sound playback
    }
}

function restartNoise(obj2){
    if(noiseSwitch.dataset.state === 'on'){
        allowPlayback = false;//prevent next playback
        noise.stop(0);//stop the current sound playback
        noiseSwitch.dataset.state = 'off';
        setTimeout(() => switchNoise(null), 100);
    }
}