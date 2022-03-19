let richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const draggableList = document.querySelector('.draggable-list');
const btnCheck = document.querySelector('.btn--check');

const listItems = [];

const createItems = async function () {
  await fetch('https://forbes400.herokuapp.com/api/forbes400?limit=10')
    .then(res => res.json())
    .then(data => (richestPeople = data.map(item => item.personName)))
    .catch(err => console.error(err));

  const shuffled = richestPeople
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.item);

  shuffled.forEach((person, idx) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.dataset.id = idx;
    li.innerHTML = `
      <span class="number">${idx + 1}</span>
      <div class="draggable" draggable="true">
        <div class="person">${person}</div>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;
    listItems.push(li);
    draggableList.append(li);
  });
};
createItems();

let dragStartId;

const dragStart = function (e) {
  dragStartId = e.target.closest('.draggable-list li').dataset.id;
};
const dragOver = function (e) {
  e.preventDefault();
};
const dragEnter = function (e) {
  const el = e.target.closest('.draggable-list li');
  if (!el) return;
  el.classList.add('over');
};
const dragLeave = function (e) {
  const el = e.target.closest('.draggable-list li');
  console.log(e.target);
  if (!el) return;
  el.classList.remove('over');
};
const dragDrop = function (e) {
  e.target.closest('.draggable-list li').classList.remove('over');
  const dragEndId = e.target.closest('.draggable-list li').dataset.id;

  listItems[dragStartId].appendChild(
    listItems[dragEndId].querySelector('.draggable')
  );
  listItems[dragEndId].appendChild(
    listItems[dragStartId].querySelector('.draggable')
  );
};

draggableList.addEventListener('dragstart', dragStart);
draggableList.addEventListener('dragenter', dragEnter);
draggableList.addEventListener('dragleave', dragLeave);
draggableList.addEventListener('dragover', dragOver);
draggableList.addEventListener('drop', dragDrop);

btnCheck.addEventListener('click', function () {
  listItems.forEach((item, idx) => {
    const person = item.querySelector('.person');
    person.className = 'person wrong';
    if (person.innerText === richestPeople[idx])
      person.className = 'person right';
  });
});
