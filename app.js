// Variables
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play-btn');
const prevBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
const audioElement = document.querySelector('#audio');
const songLength = document.querySelector('#songLength');
const artist = document.querySelector('#artist');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

// playlist
const playlist = {
  0: {
    songName: 'Ceremony',
    artist : 'New order',
    length: '4:50',
    source: 'ceremony.mp3',
    cover: 'ceremony.jpg'
  },
  1: {
    songName: 'Ever',
    artist : 'Team Sleep',
    length: '3:45',
    source: 'ever.mp3',
    cover: 'ever.jpg'
  }
}

// Current Song
let currentSong = 1;

// Function to load song and update song details
function loadSong(playlist, currentSong) {
  artist.innerText = `${playlist[currentSong].artist}`;
  title.textContent = `${playlist[currentSong].songName}`;
  songLength.innerText = `${playlist[currentSong].length}`;
  audioElement.src = `assets/audio/${playlist[currentSong].source}`;
  cover.src = `assets/img/${playlist[currentSong].cover}`;
}

// Run Load song
loadSong(playlist, currentSong);

// Function to play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.firstElementChild.src = 'assets/img/pause.png';

  audioElement.play();
}

// Function to pause the song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.firstElementChild.src = 'assets/img/play.png';

  audioElement.pause();
}

// Function to skip to the previous song
function prevSong() {
  if(currentSong > 0) {
    currentSong -= 1;
    console.log(currentSong);
  } else {
    currentSong = Object.keys(playlist).length - 1;
  }

  loadSong(playlist, currentSong);
  playSong();
}

// Function to skip to the next song
function nextSong() {
  if(currentSong < Object.keys(playlist).length - 1) {
    currentSong += 1;
  } else {
    currentSong = 0;
  }

  loadSong(playlist, currentSong);
  playSong();
}

// Add event listener to play button
playBtn.addEventListener('click', function () {
  console.log(Object.keys(playlist).length);
  const isPlaying = musicContainer.classList.contains('play');
  if(isPlaying) {
    pauseSong();
  } else  {
    playSong();
  }
})

// Add event listener to previous button
prevBtn.addEventListener('click', function() {
  prevSong();
})

// Add event listener to next button
nextBtn.addEventListener('click', function() {
  nextSong();
});