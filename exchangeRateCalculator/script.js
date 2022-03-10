const container = document.querySelector('.container');
const currencyOne = document.querySelector('.currency--1 select');
const amountOne = document.querySelector('.currency--1 input');
const currencyTwo = document.querySelector('.currency--2 select');
const amountTwo = document.querySelector('.currency--2 input');
const rate = document.querySelector('.rate');
const btnSwap = document.querySelector('.btn--swap');

const API = 'https://api.exchangerate-api.com/v4/latest/';

const calculate = function (e) {
  fetch(API + currencyOne.value)
    .then(res => {
      if (!res.ok)
        return res.json().then(err => {
          throw new Error(err.error_type);
        });
      return res.json();
    })
    .then(data => {
      const exRate = data.rates[currencyTwo.value];
      rate.innerText = `1 ${currencyOne.value} = ${exRate} ${currencyTwo.value}`;

      if (e?.target === amountTwo) {
        const val = (1 / exRate).toFixed(2) * amountTwo.value;
        amountOne.value = val.toFixed(3);
        return;
      }

      const val = exRate * amountOne.value;
      amountTwo.value = val.toFixed(3);
    })
    .catch(err => console.error(err));
};
calculate();

container.addEventListener('change', calculate);
btnSwap.addEventListener('click', function () {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
