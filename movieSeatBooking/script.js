const container = document.querySelector('.container');
const text = document.querySelector('.text');
const select = document.querySelector('.select');
const seats = container.getElementsByClassName('seat');
const selectedSeats = container.getElementsByClassName('selected');

const updateText = function () {
  text.children[0].innerText = selectedSeats.length;
  text.children[1].innerText = select.value * selectedSeats.length;
};

const populateUI = function () {
  const data = JSON.parse(localStorage.getItem('seats'));
  if (!data) return;
  console.log(data);
  data.idxs.forEach(i => seats[i].classList.add('selected'));
  select.selectedIndex = data.select;
  updateText();
};
populateUI();

const saveSeats = function () {
  const idxs = [...selectedSeats].map((s, idx) => [...seats].indexOf(s));
  localStorage.setItem(
    'seats',
    JSON.stringify({ idxs: idxs, select: select.selectedIndex })
  );
};

container.addEventListener('click', function (e) {
  const seat = e.target.closest('.seat:not(.occupied)');
  if (!seat) return;
  seat.classList.toggle('selected');
  updateText();
  saveSeats();
});

select.addEventListener('change', function () {
  updateText();
  saveSeats();
});
