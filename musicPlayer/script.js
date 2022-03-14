const audio = document.querySelector('.audio');
const title = document.querySelector('.title');
const album = document.querySelector('.img-container img');
const musicContainer = document.querySelector('.music-container');
const btnIcon = document.querySelector('.btn--play i');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const songs = ['ukulele', 'hey', 'summer'];

let current = 0;

const updateDom = function () {
  title.innerText = songs[current];
  audio.src = `../audio/${songs[current]}.mp3`;
  album.src = `../img/${songs[current]}.jpg`;
};
updateDom();

const playMusic = function (e) {
  if (audio.paused) {
    audio.play();
    btnIcon.className = 'fas fa-pause';
    musicContainer.classList.add('play');
  } else {
    audio.pause();
    btnIcon.className = 'fas fa-play';
    musicContainer.classList.remove('play');
  }
};

const nextPrevSong = function (next = false) {
  if (!next) {
    current--;
    if (current < 0) current = songs.length - 1;
  }
  if (next) {
    current++;
    if (current > songs.length - 1) current = 0;
  }
  updateDom();
  playMusic();
};

musicContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  if (btn.classList.contains('btn--play')) playMusic();
  if (btn.classList.contains('btn--prev')) nextPrevSong();
  if (btn.classList.contains('btn--next')) nextPrevSong(true);
});

audio.addEventListener('timeupdate', function (e) {
  const { currentTime, duration } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
});

progressContainer.addEventListener('click', function (e) {
  audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
});

window.addEventListener('keydown', function (e) {
  if (e.key === ' ') playMusic();
});

audio.addEventListener('ended', nextPrevSong.bind(null, true));
