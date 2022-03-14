const list = document.querySelector('.list');
const form = document.querySelector('.form');
const textEl = document.getElementById('text');
const amountEl = document.getElementById('amount');
const balanceEl = document.querySelector('.balance');
const incomeEl = document.querySelector('.income');
const expenseEl = document.querySelector('.expense');

let data = localStorage.getItem('transactions')
  ? JSON.parse(localStorage.getItem('transactions'))
  : [];

const saveTransactions = function () {
  localStorage.setItem('transactions', JSON.stringify(data));
};

const convertToCurrency = val =>
  '$' + val.toFixed(2).replace(/\d(?=(\d{3})\.)/g, '$&,');

const updateBalance = function () {
  const sum = data.reduce(
    (acc, item) => {
      const money = item.money;
      return {
        ...acc,
        balance: acc.balance + money,
        [money > 0 ? 'income' : 'expense']:
          money > 0 ? (acc.income += money) : (acc.expense += money),
      };
    },
    { balance: 0, income: 0, expense: 0 }
  );
  const sumVals = Object.values(sum).map(val => convertToCurrency(val));
  balanceEl.innerText = sumVals[0];
  incomeEl.innerText = sumVals[1];
  expenseEl.innerText = sumVals[2];
};

const addTransaction = function (transactions) {
  if (!Array.isArray(transactions)) {
    data.push(transactions);
    transactions = [transactions];
  }
  transactions.forEach(item => {
    const transactionEl = document.createElement('li');
    transactionEl.dataset.id = item.id;
    item.money > 0
      ? transactionEl.classList.add('plus')
      : transactionEl.classList.add('minus');
    const html = `
      <p>${item.text}</p>
      <span>${convertToCurrency(item.money)}</span>
      <button class="btn btn--delete">x</button>
    `;
    transactionEl.innerHTML = html;
    list.appendChild(transactionEl);
  });
  updateBalance();
};

if (data) addTransaction(data);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!textEl.value || !amountEl.value || +amountEl.value === 0) return;
  const obj = {
    id: Math.floor(Math.random() * 1000000),
    text: textEl.value,
    money: +amountEl.value,
  };
  addTransaction(obj);
  saveTransactions();
  textEl.value = '';
  amountEl.value = '';
});

list.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn--delete');
  if (!btn) return;
  const li = btn.parentElement;
  data.pop(data.find(item => item.id === li.dataset.id));
  saveTransactions();
  li.remove();
  updateBalance();
});
