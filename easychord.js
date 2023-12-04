class chord {
    constructor(position, type, inv, firstpos, secondpos, thirdpos, fourthpos) {
        this.position = position;
        this.type = type; 
        this.inv = inv;
        this.firstpos = firstpos;
        this.secondpos = secondpos;
        this.thirdpos = thirdpos;
        this.fourthpos = fourthpos;
    }
}

const cs5 = new chord(1,"mat",0,0,0,1,0);
let stack = [[],[],[],[], [],[],[],[], [],[],[],[], [],[],[],[]];
let candidate= [new chord(1,"mat",0,0,0,1,0), new chord(5,"mat",0,0,0,1,0), new chord(2,"mit",0,0,0,0,0)];

function show02(){
    let mm = prompt("Do you like major or minor?");
    let tonal = prompt("What's the tonal note?");
    let option = document.getElementById("option");
    let Index = option.selectedIndex;

    window.alert(tonal + mm + "!");
    if (Index >= 0 && Index < candidate.length) {
        stack[0] = candidate[Index];
    }
    window.alert(stack[0].position)
}
let audioContext;

function loadSample(url, node) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      node.buffer = buffer;
    })
    .catch(error => {
      console.error('Error loading sample:', error);
    });
}

function initializeAudioContext() {
  // 사용자 동작 이후에 AudioContext를 초기화
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // 리버브 효과를 위한 ConvolverNode 초기화
  reverbNode = audioContext.createConvolver();
  const reverbUrl = '4a_hats_cloaks_visitors.wav'; // 리버브용 인퍼런스 파일 경로
  loadSample(reverbUrl, reverbNode);

  // 리버브 노드를 연결
  reverbNode.connect(audioContext.destination);
}

function playPianoNote(noteNumber) {
    if (!audioContext) {
        console.error('AudioContext is not initialized.');
        return;
      }
  const frequency = 440 * Math.pow(2, (noteNumber - 49) / 12); // 피아노 노트 번호를 주파수로 변환

  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // 사인파 형태의 소리
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);

  oscillator.connect(gainNode);
  gainNode.connect(reverbNode); // 리버브 노드에 연결

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 2); // 1초 동안 소리 재생
}

function playPianoNotes(noteNumbers) {
  noteNumbers.forEach(noteNumber => {
    playPianoNote(noteNumber);
  });
}

function chordtolist(chord) {
    let a=chord.position;
}
