const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

const endGameContainer = document.querySelector('.end-game-container');
const input = document.querySelector('.container input');
const word = document.querySelector('.word');
const scoreEl = document.querySelector('.score');
const timeEl = document.querySelector('.time');
const settingContainer = document.querySelector('.settings-container');
const btnSettings = document.querySelector('.btn--settings');
const difficultyEl = document.getElementById('difficulty');

input.focus();

let selected;
let score = 0;
let time = 10;
difficultyEl.value = localStorage.getItem('difficulty')
  ? localStorage.getItem('difficulty')
  : 3;

const runTimer = function () {
  timeEl.innerText = --time;
  if (time === 0) {
    clearInterval(interval);
    endGameContainer.style.display = 'flex';
    endGameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button class="btn btn--reload" onClick="location.reload()">Reload</button>
    `;
  }
};

const interval = setInterval(runTimer, 1000);

const createWord = function () {
  selected = words[Math.floor(Math.random() * words.length)];
  word.innerText = selected;
};
createWord();

input.addEventListener('input', function (e) {
  const value = this.value.toLowerCase();

  if (value !== selected) return;
  scoreEl.innerText = ++score;
  createWord();
  this.value = '';
  time += +difficultyEl.value;
  timeEl.innerText = time;
});

btnSettings.addEventListener('click', function () {
  settingContainer.classList.toggle('hide');
});

difficultyEl.addEventListener('change', function () {
  localStorage.setItem('difficulty', difficultyEl.value);
});
