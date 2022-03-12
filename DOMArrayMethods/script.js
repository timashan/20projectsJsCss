const main = document.querySelector('.main');
const aside = document.querySelector('.aside');
const btnAdd = document.querySelector('.btn--add');
const btnDouble = document.querySelector('.btn--double');

let users = [];

const formatMoney = money =>
  '$' + money.toString().replace(/\d(?=((\d{3})+(?!\d)))/g, '$&,');

const updateDOM = function (data = users) {
  if (Array.isArray(data))
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  else data = [data];

  data.forEach(user => {
    const userHtml = `<strong>${user.username}</strong> ${formatMoney(
      user.money
    )}`;
    const userEl = document.createElement('div');
    userEl.className = 'person';
    userEl.innerHTML = userHtml;
    main.appendChild(userEl);
  });
};

const fetchUser = async function () {
  try {
    const res = await fetch('https://randomuser.me/api');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const user = data.results[0];

    const money = Math.floor(Math.random() * 1000000);
    const obj = {
      username: `${user.name.first} ${user.name.last}`,
      money: money,
    };
    users.push(obj);
    updateDOM(obj);
  } catch (err) {
    console.error(err);
  }
};
fetchUser();
fetchUser();
fetchUser();

const double = function () {
  users = users.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
};

const filterMillionaires = function () {
  users = users.filter(user => user.money > 1000000);
  updateDOM();
};

const richest = function () {
  users = users.sort((a, b) => b.money - a.money);
  updateDOM();
};

const totalEl = document.createElement('h3');
const calWealth = function () {
  const sum = users.reduce((acc, item) => acc + item.money, 0);
  const html = `Total Wealth: <strong>${formatMoney(sum)}</strong>`;
  totalEl.innerHTML = html;
  main.append(totalEl);
};

aside.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  if (btn.classList.contains('btn--add')) fetchUser();
  if (btn.classList.contains('btn--double')) double();
  if (btn.classList.contains('btn--mil')) filterMillionaires();
  if (btn.classList.contains('btn--richest')) richest();
  if (btn.classList.contains('btn--cal-wealth')) calWealth();
});
