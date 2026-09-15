//Yhna se actual Music Player start hoga Sabse pehle DOM elements select karaga
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const previousBtn =document.getElementById("previousBtn");
const nextBtn =document.getElementById("nextBtn");
const songTitle =document.getElementById("songTitle");
const artistName =document.getElementById("artistName");
const songImage =document.getElementById("songImage");
const progressBar =document.getElementById("progressBar");
const currentTime =document.getElementById("currentTime");
const duration =document.getElementById("duration");
const volumeBar =document.getElementById("volumeBar");
const playlist =document.getElementById("playlist");
//Songs Ka Data Ab songs ka array banayenge:
const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "songs/song1.mp3",
        image: "images/img1.jpg"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        src: "songs/song2.mp3",
        image: "images/img2.jpg"
    },
    {
        title: "Song Three",
        artist: "Artist Three",
        src: "songs/song3.mp3",
        image: "images/img3.jpg"
    }
];
//Yahan JavaScript mein objects + arrays ki practice ho rahi hai.
//Current Song
let currentSongIndex = 0;
//0 → Song One , 1 → Song Two , 2 → Song Three (JS ma array 0 sa start)
//Song Load Function
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    songImage.src = song.image;
    audio.src = song.src;
    audio.load();
}
//Ye function song ki:title,artist,image,audio file load karega
//Play Function
function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
}
//Pause Function
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}
//Play/Pause Button
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});
//Next Button
nextBtn.addEventListener("click", () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
});
//Agar last song ke baad Next press karoge:tu song 1,2,3,1
//Previous Button
previousBtn.addEventListener("click", () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
});
//Progress Bar=>Ab audio ke saath progress bar move karwayenge.
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progress =(audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTime.textContent =formatTime(audio.currentTime);
    }
});
//Time Format
function formatTime(time) {
    const minutes =Math.floor(time / 60);
    const seconds =Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
//Example:5 seconds becomes:0:05 and:75 seconds becomes:1:15
//Duration
audio.addEventListener("loadedmetadata", () => {
    duration.textContent =formatTime(audio.duration);
});
//Progress Bar Se Song Seek Karna
progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progressBar.value / 100) *
            audio.duration;
    }
});
//Ab user progress bar ko drag karega to song bhi aage/peeche jayega
//Volume Control
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});
//Range:0 = mute ,1 = full volume
//Autoplay / Next Song =>Jab song khatam ho:
audio.addEventListener("ended", () => {
    nextBtn.click();
});
//Song 1 finished=>Song 2 automatically=>Song 3 automatically=>Song 1
//Playlist Generate Karna
//Ab playlist JavaScript se automatically banayenge:
function createPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent =`${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlist.appendChild(li);
    });
}
//Active Song=>ak or fun
function updateActiveSong() {
    const items =playlist.querySelectorAll("li");
    items.forEach((item, index) => {
        item.classList.toggle(
            "active",
            index === currentSongIndex
        );
    });
}
//Ab loadSong() ko update karo:
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    songImage.src = song.image;
    audio.src = song.src;
    audio.load();
    updateActiveSong();
}
//Initial Setup
loadSong(currentSongIndex);
createPlaylist();
//Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }
    if (event.code === "ArrowRight") {
      nextBtn.click();
    }
    if (event.code === "ArrowLeft") {
        previousBtn.click();
    }
});
//Space       → Play/Pause
// Arrow Right → Next
// Arrow Left  → Previous