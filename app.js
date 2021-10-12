const musicContainer = document.querySelector('.music-container');

const playBtn = document.querySelector('#play-btn');
const prevBtn = document.querySelector('#previous-btn');
const forwardBtn = document.querySelector('#forward-btn');
const audio = document.querySelector('#audio');
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
    source: 'assets/audio/ceremony.mp3',
    cover: 'assets/img/ceremony.jpg'
  },
  1: {
    songName: 'Ever',
    artist : 'Team Sleep',
    length: '3:45',
    source: 'assets/audio/ceremony.mp3',
    cover: 'assets/img/ever.jpg'
  }
}

// Current Song
let currentSong = 1;


// Update Song details
 function loadSong(playlist) {
  artist.innerText = `${playlist[currentSong].artist}`;
  title.textContent = `${playlist[currentSong].songName}`;
  songLength.innerText = `${playlist[currentSong].length}`;
  audio.src = `${playlist[currentSong].source}`;
  cover.src = `${playlist[currentSong].cover}`;
 }

 loadSong(playlist);