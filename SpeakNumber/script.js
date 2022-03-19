const msg = document.querySelector('.msg');

window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new window.speechRecognition();
recognition.start();

const number = Math.floor(Math.random() * 100) + 1;
console.log(number);

recognition.addEventListener('end', () => recognition.start());

recognition.addEventListener('result', function (e) {
  const result = e.results[0][0].transcript;

  msg.innerHTML = `
   <span>You said: </span>
   <span class="box">${result}</span>
  `;

  if (!Number.isFinite(+result)) {
    msg.innerHTML += `<span>That is not a valid number</span>`;
    return;
  }

  if (!(result > 0 && result <= 100)) {
    msg.innerHTML += `<span>Number must be between 1 and 100</span>`;
    return;
  }

  if (+result !== number) {
    msg.innerHTML += `<span>${
      number > result ? 'GO HIGHER' : 'GO LOWER'
    }</span>`;
    return;
  }

  document.body.innerHTML = `
  <p>Congrats! You have guessed the number!  </p>
  <p>It was ${number}</p>
  <button class="btn--play" onClick="location.reload()">Play Again</button>
  `;
});
