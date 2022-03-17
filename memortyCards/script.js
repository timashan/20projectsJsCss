const cardsData = localStorage.getItem('cards')
  ? JSON.parse(localStorage.getItem('cards'))
  : [];
const cardsContainer = document.querySelector('.cards');
const navigtion = document.querySelector('.navigation');
const totalCards = document.querySelector('.tot-cards');
const addContainer = document.querySelector('.add-container');
const btnAdd = document.querySelector('.btn--add');
const btnAddCard = document.querySelector('.btn--add-card');
const btnClose = document.querySelector('.btn--close');
const btnClear = document.querySelector('.btn--clear');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');

let current = 0;

const saveCards = () =>
  localStorage.setItem('cards', JSON.stringify(cardsData));

const addCards = function (data) {
  data.forEach((card, idx) => {
    const html = `
    <div class="card__inner">
      <div class="card--front"><p>${card.question}</p></div>
      <div class="card--back"><p>${card.answer}</p></div>
    </div>
    `;
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    if (idx === 0 && (data.length > 1 || cardsData.length === 1))
      cardEl.className = 'card active';
    cardEl.innerHTML = html;
    cardsContainer.appendChild(cardEl);
  });
};

const updateTotCards = () =>
  cardsData.length
    ? (totalCards.innerText = `${current + 1}/${
        [...cardsContainer.children].length
      }`)
    : '0/0';

const navigate = function (fwd = false) {
  const cardEls = [...cardsContainer.children];

  cardEls[current].classList.remove('active');
  if (fwd) {
    cardEls[current].classList.add('left');
    current++;
    if (current > cardEls.length - 1) current--;
  }
  if (!fwd) {
    current--;
    if (current < 0) current++;
  }
  cardEls[current].className = 'card active';
  updateTotCards();
};

const addCard = function () {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();
  if (!(question && answer)) return;

  (questionEl.value = '') || (answerEl.value = '');
  addContainer.classList.remove('show');
  const obj = { question, answer };
  cardsData.push(obj);
  addCards([obj]);
  saveCards();
  updateTotCards();
};
btnAddCard.addEventListener('click', addCard);
window.addEventListener('keydown', e => (e.key === 'Enter' ? addCard() : 0));

cardsContainer.addEventListener('click', function (e) {
  const card = e.target.closest('.card');
  if (!card) return;
  card.classList.toggle('show');
});

navigtion.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  if (btn.classList.contains('btn--right')) navigate(true);
  if (btn.classList.contains('btn--left')) navigate();
});

btnClear.addEventListener('click', () => {
  localStorage.removeItem('cards');
  location.reload();
});
btnAdd.addEventListener('click', () => {
  addContainer.classList.add('show');
  setTimeout(() => questionEl.focus(), 500);
});
btnClose.addEventListener('click', () => addContainer.classList.remove('show'));

const init = function () {
  addCards(cardsData);
  updateTotCards();
};
init();
