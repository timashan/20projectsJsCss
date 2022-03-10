const controls = document.querySelector('.controls');
const video = document.querySelector('.video');
const progress = document.querySelector('.progress');
const btnPlay = document.querySelector('.btn--play');
const btnLoop = document.querySelector('.btn--loop');
const timestamp = document.querySelector('.timestamp');
let loopStatus = false;

const playPause = function () {
  if (video.paused) {
    video.play();
    video.classList.remove('stop');
  } else {
    video.pause();
    video.classList.add('stop');
  }
};

const stop = function () {
  video.currentTime = 0;
  video.pause();
};

const loop = function () {
  if (!loopStatus) {
    video.loop = true;
    loopStatus = true;
    btnLoop.classList.add('toggled');
  } else {
    video.loop = false;
    loopStatus = false;
    btnLoop.classList.remove('toggled');
  }
};

const updateIcons = function () {
  if (video.paused) btnPlay.innerHTML = '<i class="fas fa-play"></i>';
  else btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
};

const updateProgressbar = function () {
  progress.value = (video.currentTime / video.duration) * progress.max;
  timestamp.innerText = `${Math.floor(video.currentTime / 60)
    .toString()
    .padStart(2, 0)}:${Math.floor(video.currentTime % 60)
    .toString()
    .padStart(2, 0)}`;
};

const seek = function () {
  video.currentTime = (progress.value / progress.max) * video.duration;
};

controls.addEventListener('click', function (e) {
  const target = e.target;
  if (target.closest('.btn--play')) playPause();
  if (target.closest('.btn--stop')) stop();
  if (target.closest('.btn--loop')) loop();
});

progress.addEventListener('input', seek);
video.addEventListener('click', playPause);
video.addEventListener('play', updateIcons);
video.addEventListener('pause', updateIcons);
video.addEventListener('timeupdate', updateProgressbar);
