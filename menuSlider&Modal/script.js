const btnNav = document.querySelector('.btn--nav');
const btnOpen = document.querySelector('.btn--open');
const btnClose = document.querySelector('.btn--close');
const modalContainer = document.querySelector('.modal-container');

btnNav.addEventListener('click', function () {
  document.body.classList.toggle('show-nav');
});

btnOpen.addEventListener('click', function () {
  modalContainer.classList.add('show');
});

btnClose.addEventListener('click', function () {
  modalContainer.classList.remove('show');
});

modalContainer.addEventListener('click', function (e) {
  if (e.target === modalContainer) modalContainer.classList.remove('show');
});
