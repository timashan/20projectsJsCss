const year = document.querySelector('.year');
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const countdown = document.querySelector('.countdown');
const loader = document.querySelector('.loader');

let current = new Date();
const nextYear = new Date(`1 1 ${current.getFullYear() + 1} 00:00:00`);
year.innerText = current.getFullYear() + 1;

const format = val => `${Math.floor(val)}`.padStart(2, 0);

const updateTime = function () {
  current = Date.now();
  const difference = (nextYear - current) / 1000;
  days.innerText = format(difference / (60 * 60 * 24));
  hours.innerText = format((difference / (60 * 60)) % 24);
  minutes.innerText = format((difference / 60) % 60);
  seconds.innerText = format(difference % 60);
};

setInterval(updateTime, 1000);
setTimeout(() => {
  countdown.style.display = 'flex';
  loader.style.display = 'none';
}, 1000);
