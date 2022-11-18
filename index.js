const audioContext = new window.AudioContext();
const audioElement = document.getElementById("audio");
const analyzer = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyzer);
analyzer.connect(audioContext.destination);
analyzer.fftSize = 1024;
const dataArray = new Uint8Array(analyzer.frequencyBinCount);


setInterval(() => {
    analyzer.getByteFrequencyData(dataArray);
    // console.log(dataArray);
}, 100);