// Variables
const player = document.querySelector('.player');
const playBtn = document.querySelector('.player__buttons--play');
const prevBtn = document.querySelector('.player__buttons--previous');
const nextBtn = document.querySelector('.player__buttons--next');
const audioElement = document.querySelector('.player__audioSrc');
const timer = document.querySelector('.player__timer'); 
const artist = document.querySelector('.player__artist');
const title = document.querySelector('.player__title');
const cover = document.querySelector('.player__cover--foreground');
const songURL = document.querySelector('.soundcloud-logo');
const playerBarForeground = document.querySelector('.player__bar--foreground');
const playerBarBackground = document.querySelector('.player__bar--background');

// playlist
const playlist = {
  0: {
    songName: 'Ceremony',
    artist : 'New Order',
    source: 'ceremony.mp3',
    cover: 'ceremony.jpg',
    songURL: 'https://soundcloud.com/sounds-like-paolo/ceremony-new-order-cover'
  },
  1: {
    songName: 'Ever',
    artist : 'Team Sleep',
    source: 'ever.mp3',
    cover: 'ever.jpg',
    songURL: 'https://soundcloud.com/sounds-like-paolo/ever-team-sleep-cover'
  }
}

// Current Song
let currentSong = 1;



// FUNCTIONS //


// Function to load song and update song details
function loadSong(playlist, currentSong) {
  artist.innerText = `${playlist[currentSong].artist}`;
  title.textContent = `${playlist[currentSong].songName}`;
  audioElement.src = `assets/audio/${playlist[currentSong].source}`;
  cover.src = `assets/img/${playlist[currentSong].cover}`;
  songURL.href = `${playlist[currentSong].songURL}`;
}

// Run Load song
loadSong(playlist, currentSong);

// Function to play song
function playSong() {
  player.classList.add('play');
  playBtn.firstElementChild.src = 'assets/img/pause.png';

  audioElement.play();
}

// Function to pause the song
function pauseSong() {
  player.classList.remove('play');
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

// Function to display countdown timer and update the progress bar.
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement; // Store in variables total length of 
                                                // track in seconds and time elapsed in seconds.  
  const progressPercent = (currentTime / duration) * 100; // Find percentage of progress in the track.
  playerBarForeground.style.width = `${progressPercent}%`; // Apply percentage as width style to progress bar.


  const minutes = Math.floor(audioElement.currentTime / 60); // Find elapsed minutes.
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes; // Pad to 2 digits.

  const seconds = Math.floor(audioElement.currentTime - minutes * 60); // Find elapsed seconds.
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds; // Pad to 2 digits.
  timer.innerText = `${displayMinutes}:${displaySeconds}`; // display minutes and seconds.
}

// function to make the progress bar clickable.

function setProgress(e) {
  const width = this.clientWidth; // Finds total width of progress bar
  const clickX = e.offsetX; // Finds width at clicked point
  const duration = audioElement.duration; // get the song duration
  
  audioElement.currentTime = (clickX / width) * duration; // set the audio current time to equal the width at the point where I have clicked / the total width * the song duraton.
}




// EVENT LISTENERS //

// Add event listener to play button to either play or pause the song
playBtn.addEventListener('click', function () {
  const isPlaying = player.classList.contains('play');
  if(isPlaying) {
    pauseSong();
  } else  {
    playSong();
  }
})

// Add event listener to previous button to skip to previous song
prevBtn.addEventListener('click', function() {
  prevSong();
})

// Add event listener to next button to skip to next song
nextBtn.addEventListener('click', function() {
  nextSong();
});

// Add event listener to the audio element to update progress bar
audioElement.addEventListener('timeupdate', updateProgress);

// Add event listener to make progress bar clickable
playerBarBackground.addEventListener('click', setProgress);

// Add event listener to audio element to skip to next song when previous is ended, by calling nextSong()
  audioElement.addEventListener('ended', nextSong);