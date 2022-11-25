const map = (n, start1, stop1, start2, stop2) => {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
}

// const density = 'Ñ@#W$987654321?!abc;:+=-,._ ';
// const density = ' .:-i|=+%O#@'
// const density = ' .,-+~=;:/$&!]░░▒▒▓▓██';
const density = ' .,-+~=;:/$&!]░░▒▒▓▓██Ñ@#W$987654321?!abc;:+=-,._ ';
// const density = ' ░░▒▒▓▓██';
const ascii = document.getElementById("ascii");


const audioContext = new window.AudioContext();
const audioElement = document.getElementById("audio");
const analyzer = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyzer);
analyzer.connect(audioContext.destination);
analyzer.fftSize = 1024;
const dataArray = new Uint8Array(analyzer.frequencyBinCount);

document.querySelector('button').addEventListener('click', function() {
    audioContext.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });

setInterval(() => {
    ascii.innerHTML = '';
    analyzer.getByteFrequencyData(dataArray);
    
    let slicedArray = dataArray.slice(0, 2048);
    
    const newArr = [];
    slicedArray.map((el, i) => {
        const char =  Math.floor(map(slicedArray[i], 0, 483, 0, density.length));
        const elem = density.charAt(char);
        newArr.push(elem);
    });

    for (let i = 0; i < newArr.length; i++) {
      i % 40 == 0 ? ascii.innerHTML += '<br>' : ' ';
      ascii.innerHTML += newArr[i];
    }
}, 100);