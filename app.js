// DOM Variables
const pagetitle = document.querySelector("h1");
const player = document.querySelector(".player");
const playBtn = document.querySelector(".player__buttons--play");
const prevBtn = document.querySelector(".player__buttons--previous");
const nextBtn = document.querySelector(".player__buttons--next");
const shuffleBtn = document.querySelector(".player__buttons--shuffle");
const playerInfo = document.querySelector(".player__info");
const audioElement = document.querySelector(".player__audioSrc");
const timer = document.querySelector(".player__timer"); 
const artist = document.querySelector(".player__artist");
const title = document.querySelector(".player__title");
const cover = document.querySelector(".player__cover--foreground");
const songURL = document.querySelector(".soundcloud-logo");
const playerBarForeground = document.querySelector(".player__bar--foreground");
const playerBarBackground = document.querySelector(".player__bar--background");

// playlist
// const playlist = {
//   "0": {
//     songName: "Ceremony",
//     artist : "New Order",
//     source: "ceremony.mp3",
//     cover: "ceremony.jpg",
//     songURL: "https://soundcloud.com/sounds-like-paolo/ceremony-new-order-cover"
//   },
//   "1": {
//     songName: "Ever",
//     artist : "Team Sleep",
//     source: "ever.mp3",
//     cover: "ever.jpg",
//     songURL: "https://soundcloud.com/sounds-like-paolo/ever-team-sleep-cover"
//   },
//   "2": {
//     songName: "She\'s a Pet\'s Doctor",
//     artist : "7KM",
//     source: "she\'s_a_pet\'s_doctor.mp3",
//     cover: "7KM.jpeg",
//     songURL: "https://soundcloud.com/7km-1/03-shes-a-pets-doctor"
//   },
//   "3": {
//     songName: "11 Shades of Gray",
//     artist : "7KM",
//     source: "11_shades_of_gray.mp3",
//     cover: "7KM.jpeg",
//     songURL: "https://soundcloud.com/7km-1/01-11-shades-of-gray"
//   },
//   "4": {
//     songName: "Him Or Me",
//     artist : "7KM",
//     source: "him_or_me.mp3",
//     cover: "7KM.jpeg",
//     songURL: "https://soundcloud.com/7km-1/04-him-or-me"
//   },
//   "5": {
//     songName: "My Best Friend",
//     artist : "7KM",
//     source: "my_best_friend.mp3",
//     cover: "7KM.jpeg",
//     songURL: "https://soundcloud.com/7km-1/05-my-best-friend"
//   }
// }

const playlist = [
  {
    songName: "Ceremony",
    artist : "New Order",
    source: "ceremony.mp3",
    cover: "ceremony.jpg",
    songURL: "https://soundcloud.com/sounds-like-paolo/ceremony-new-order-cover"
  },
  {
    songName: "Ever",
    artist : "Team Sleep",
    source: "ever.mp3",
    cover: "ever.jpg",
    songURL: "https://soundcloud.com/sounds-like-paolo/ever-team-sleep-cover"
  },
  {
    songName: "She\'s a Pet\'s Doctor",
    artist : "7KM",
    source: "she\'s_a_pet\'s_doctor.mp3",
    cover: "7KM.jpeg",
    songURL: "https://soundcloud.com/7km-1/03-shes-a-pets-doctor"
  },
  {
    songName: "11 Shades of Gray",
    artist : "7KM",
    source: "11_shades_of_gray.mp3",
    cover: "7KM.jpeg",
    songURL: "https://soundcloud.com/7km-1/01-11-shades-of-gray"
  },
  {
    songName: "Him Or Me",
    artist : "7KM",
    source: "him_or_me.mp3",
    cover: "7KM.jpeg",
    songURL: "https://soundcloud.com/7km-1/04-him-or-me"
  },
  {
    songName: "My Best Friend",
    artist : "7KM",
    source: "my_best_friend.mp3",
    cover: "7KM.jpeg",
    songURL: "https://soundcloud.com/7km-1/05-my-best-friend"
  }
]


// Audio player functionality Variables
let currentSong = 0;
const playlistLength = playlist.length;


// FUNCTIONS //


// Function to load song and update song details
function loadSong(playlist, currentSong) {
  artist.textContent = `${playlist[currentSong].artist}`;
  title.textContent = `${playlist[currentSong].songName}`;
  audioElement.src = `assets/audio/${playlist[currentSong].source}`;
  cover.src = `assets/img/${playlist[currentSong].cover}`;
  songURL.href = `${playlist[currentSong].songURL}`;
}


// Run Load song
loadSong(playlist, currentSong);


// Function to play song
function playSong() {
  pagetitle.style.marginBottom = `${playerInfo.clientHeight + 70}px`;
  player.classList.add("play");
  playBtn.firstElementChild.src = "assets/img/pause.png";

  audioElement.play();
}


// Function to pause the song
function pauseSong() {
  pagetitle.style.marginBottom = "70px";
  player.classList.remove("play");
  playBtn.firstElementChild.src = "assets/img/play.png";

  audioElement.pause();
}


// Function to skip to the previous song
function prevSong() {
  if(currentSong > 0) {
    currentSong -= 1;
  } else {
    currentSong = playlistLength - 1;
  }

  loadSong(playlist, currentSong);
  playSong();
}


// Function to skip to the next song
function nextSong() {
  if(currentSong < playlistLength - 1) {
    currentSong += 1;
  } else {
    currentSong = 0;
  }

  loadSong(playlist, currentSong);
  playSong();
}


// Function to skip to random song - shuffle functionality
function skipToRandom() {
  // Generate random number between 0 and number of songs in the playlist
  let randomNumber = Math.floor(Math.random() * playlistLength); 

  if(currentSong === randomNumber) { // Avoids repeating same song twice
    skipToRandom();
  } else {
    currentSong = randomNumber; // currenSong is a new random song
    loadSong(playlist, currentSong);
    playSong();
  }

}


// Function to display countdown timer and update the progress bar.
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement; // Store in variables total length of 
                                                // track in seconds and time elapsed in seconds.  
  const progressPercent = (currentTime / duration) * 100; // Find percentage of progress in the track.
  playerBarForeground.style.width = `${progressPercent}%`; // Apply percentage as width style to progress bar.


  // Calculate and format total length of track
  const totMinutes = Math.floor(duration / 60); // Find minutes
  const displayTotMinutes = totMinutes < 10 ? "0" + totMinutes : totMinutes; // Pad to 2 digits
  const totSeconds = Math.floor(duration - totMinutes * 60); // Find seconds 
  const displayTotSeconds = totSeconds < 10 ? "0" + totSeconds : totSeconds; // Pad to 2 digits

  // Calculate and format Elapsed time
  const elapsedMinutes = Math.floor(currentTime / 60); // Find elapsed minutes.
  const displayElapsedMinutes = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes; // Pad to 2 digits.
  const elapsedSeconds = Math.floor(currentTime - elapsedMinutes * 60); // Find elapsed seconds.
  const displayElapsedSeconds = elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds; // Pad to 2 digits.

  // Display elapsed time and total length in timer
  timer.textContent = ` ${displayElapsedMinutes}:${displayElapsedSeconds} / ${displayTotMinutes}:${displayTotSeconds}`; // Display elapsed minutes & seconds and total length of track.
}


// function to make the progress bar clickable.
function setProgress(e) {
  const width = this.clientWidth; // Find total width of progress bar
  const clickX = e.offsetX; // Find width at clicked point
  const duration = audioElement.duration; // Get the song duration
  
  audioElement.currentTime = (clickX / width) * duration; // Set the audio current time to equal the width at the point where I have clicked / the total width * the song duraton.
}




// Set output loudness

audioElement.volume = 1;




// EVENT LISTENERS //

// Add event listener to play button to either play or pause the song
playBtn.addEventListener("click", function () {
  const isPlaying = player.classList.contains("play");
  if(isPlaying) {
    pauseSong();
  } else  {
    playSong();
  }
})


// Add event listener to previous button to skip to previous song
prevBtn.addEventListener("click", prevSong);


// Add event listener to next button to skip to next song
nextBtn.addEventListener("click", nextSong);


// Add event listener to the shuffle button to skip to a random song
shuffleBtn.addEventListener("click", skipToRandom);


// Add event listener to the audio element to update progress bar
audioElement.addEventListener("timeupdate", updateProgress);


// Add event listener to make progress bar clickable
playerBarBackground.addEventListener("click", setProgress);


// Add event listener to audio element to skip to next song when previous is ended, by calling nextSong()
audioElement.addEventListener("ended", nextSong);

