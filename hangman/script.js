const wordEl = document.querySelector('.word');
const wrongEl = document.querySelector('.wrong');
const notification = document.querySelector('.notification');
const figure = document.querySelector('.figure');
const figureBody = document.querySelectorAll('.figure .hide');
const messageContainer = document.querySelector('.message-container');
const btnPlay = document.querySelector('.btn--play');

const words = ['programming', 'application', 'computer'];
const correctLetters = [];
const wrongLetters = [];
let selectedWord;
const bodyParts = figureBody.length;
let playble = true;

const updateLetter = function () {
  wordEl.innerHTML = selectedWord
    .split('')
    .map(
      l => `<span class="letter">${correctLetters.includes(l) ? l : ''}</span>`
    )
    .join('');
};

const updateWrong = function () {
  wrongEl.innerHTML = `<p>Wrong</p>
  <span>${wrongLetters}</span>
  `;
};

const init = function () {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  updateLetter();
};
init();

window.addEventListener('keydown', function (e) {
  if (!(e.keyCode >= 65 && e.keyCode <= 90) || !playble) return;
  const key = e.key.toLowerCase();

  const isRepeat = [...correctLetters, ...wrongLetters].includes(key);
  if (isRepeat) {
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
    return;
  }

  const isValid = selectedWord.split('').includes(key);
  if (!isValid) {
    wrongLetters.push(key);
    const idx = wrongLetters.length - 1;
    figureBody[idx].classList.remove('hide');
    if (idx === bodyParts - 1) {
      playble = false;
      messageContainer.classList.add('show');
      return;
    }
    updateWrong();
    return;
  }
  correctLetters.push(key);
  updateLetter();
  if (selectedWord === wordEl.innerText.replaceAll('\n', '')) {
    playble = false;
    messageContainer.children[0].children[0].innerText =
      'Congratulations! You won! 😃';
    messageContainer.classList.add('show');
  }
});

btnPlay.addEventListener('click', function () {
  location.reload();
});
