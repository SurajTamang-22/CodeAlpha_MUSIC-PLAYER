const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const volume = document.getElementById("volume");
const search = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

let songs = [
    { name: "Song One", file: "assets/music/song1.mp3" },
    { name: "Song Two", file: "assets/music/song2.mp3" }
];

let currentSong = -1;

function loadSongs() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.name;
        li.addEventListener("click", () => playSong(index));
        playlist.appendChild(li);
    });
}

function playSong(index) {
    currentSong = index;
    audio.src = songs[index].file;
    audio.load();   // 🔥 IMPORTANT
    audio.play().catch(err => alert("Song not found or browser blocked it"));
}

function playPause() {
    if (audio.src === "") {
        playSong(0);
    } else {
        audio.paused ? audio.play() : audio.pause();
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
}

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
};

loadSongs();
