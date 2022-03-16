const data = [
  {
    image: '../img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: '../img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: '../img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: '../img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: '../img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: '../img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: '../img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: '../img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: '../img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: '../img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: '../img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: '../img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

const main = document.querySelector('.main');
const textBox = document.querySelector('.text-box');
const langSelect = document.querySelector('.text-box select');
const textArea = document.querySelector('.text-box textarea');
const btnToggle = document.querySelector('.btn--toggle');
const btnClose = document.querySelector('.btn--close');
const btnSpeak = document.querySelector('.btn--speak');

let message = new SpeechSynthesisUtterance();
let voices;

const speak = function (text) {
  message.text = text;
  speechSynthesis.speak(message);
};

const createBoxes = function () {
  data.forEach(box => {
    const html = ` 
      <img src="${box.image}" alt=""/>
      <p>${box.text}</p>
      `;
    const boxEl = document.createElement('div');
    boxEl.className = 'box';
    boxEl.innerHTML = html;
    main.appendChild(boxEl);
  });
};
createBoxes();

speechSynthesis.addEventListener('voiceschanged', function () {
  voices = speechSynthesis.getVoices();
  voices.forEach(lang => {
    const option = document.createElement('option');
    option.innerText = lang.name;
    option.value = lang.name;
    langSelect.appendChild(option);
  });
});

main.addEventListener('click', function (e) {
  const box = e.target.closest('.box');
  if (!box) return;
  const text = box.innerText;
  speak(text);
  console.log(box);
  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'), 1000);
});

langSelect.addEventListener('change', function (e) {
  const voice = voices.find(voice => voice.name === this.value);
  console.log(voice);
  message.voice = voice;
});

btnSpeak.addEventListener('click', () => speak(textArea.value));
btnToggle.addEventListener('click', () => textBox.classList.add('show'));
btnClose.addEventListener('click', () => textBox.classList.remove('show'));
