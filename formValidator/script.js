const form = document.querySelector('.form');
const btnSubmit = document.querySelector('.btn--submit');
const inputs = document.querySelectorAll('.form-control input');
const errorELs = document.querySelectorAll('.form-control small');

const capitalize = text => {
  return text[0].toUpperCase() + text.slice(1);
};

const showSucceed = function (input) {
  input.parentElement.classList.remove('error');
  input.parentElement.classList.add('success');
};

const showError = function (input, text) {
  input.parentElement.classList.add('error');
  input.nextElementSibling.innerText = text;
};

const checkEmail = function (input) {
  const regex = /\S+@\S+\.\S+/;
  const ok = regex.test(input.value.toLowerCase().trim());
  if (ok) showSucceed(input);
  if (!ok) showError(input, `${capitalize(input.id)} is invalid`);
};

const checkEmpty = function () {
  inputs.forEach(input => {
    const ok = input.value.trim() !== '';
    if (ok) showSucceed(input);
    if (!ok) showError(input, `${capitalize(input.id)} is required`);
  });
};

const checkLength = function (input, min, max) {
  const length = input.value.length;
  if (length > max)
    showError(
      input,
      `${capitalize(input.id)} cannot be below ${max} characthers`
    );
  if (length < min)
    showError(
      input,
      `${capitalize(input.id)} must be at least ${min} characthers`
    );
};

const checkMatch = function (input1, input2) {
  const ok = input1.value === input2.value;
  if (!ok) showError(input2, 'Passwords do not match');
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkEmpty();
  checkEmail(inputs[1]);
  checkLength(inputs[0], 3, 15);
  checkLength(inputs[2], 6, 25);
  checkMatch(inputs[2], inputs[3]);
});
