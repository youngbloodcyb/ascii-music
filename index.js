const map = (n, start1, stop1, start2, stop2) => {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
}

const density = 'Ñ@#W$987654321?!abc;:+=-,._ ';
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';
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
    analyzer.getByteFrequencyData(dataArray);
    // ascii.innerText = dataArray;
    let slicedArray = dataArray.slice(0, 484);
    const newArr = slicedArray.map((el, i) => {
        const char = Math.floor(map(slicedArray[i], 0, 483, 0, density.length));
        el = density.charAt(char);
    });
    console.log(newArr);
    // for (let i = 0; i < slicedArray.length; i++) {
    //     const char = Math.floor(map(slicedArray[i], 0, 484, 0, density.length))
    //     console.log(density.charAt(char));
    // }
}, 100);

// 484
// ---------------------------------------------------------- //

const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
      let nextChars = getCharacterForGrayScale(grayScale);
  
      if ((index + 1) % width === 0) {
        nextChars += "\n";
      }
  
      return asciiImage + nextChars;
    }, "");
  
    asciiImage.textContent = ascii;
  };