const text = document.querySelector('.text');
const container = document.querySelector('.container');

const TIME = 7.5 * 1000;
const breatheTime = TIME * (2 / 5);
const holdTime = TIME * (1 / 5);

const BreatheAnim = function () {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => (text.innerText = 'Hold'), breatheTime);

  setTimeout(() => {
    text.innerText = 'Breathe Out!';
    container.className = 'container shrink';
  }, breatheTime + holdTime);
};
BreatheAnim();

setInterval(BreatheAnim, TIME);
